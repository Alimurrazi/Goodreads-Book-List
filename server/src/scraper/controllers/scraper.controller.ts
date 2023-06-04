import express from 'express';
import cheerio from 'cheerio';
import debug from 'debug';
import { Book } from '../../books/dtos/book.dto';
import booksController from '../../books/controllers/books.controller';
import ScraperService from '../services/scraper.service';
import booksService from '../../books/services/books.service';
const log = debug('app:scraper-controller');
const baseUrl = 'https://www.goodreads.com';

class ScraperController {
  getListedBooksInfo = async (keyword: string, cookie: string) => {
    const listedBooks: Book[] = [];
    for (let i = 1; i <= 20; i++) {
      const selectedElem = 'div.left';
      const response = await ScraperService.getShelfPageContents(keyword, i, cookie);

      const html_data = response.data;
      const $ = cheerio.load(html_data);
      const fetchedBooks = $(selectedElem);
      fetchedBooks.each(async (index, element) => {
        if (fetchedBooks.length > 0) {
          const imgLink = $(element).children('a.leftAlignedImage').find('img').attr('src');
          let formatedImgUrl = imgLink;
          if (imgLink) {
            const firstPartConst = 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/';
            const [_, firstPart] = imgLink.split(firstPartConst);
            const [firstId, ...lastPart] = firstPart.split('/');
            const [secondId] = lastPart[0].split('.');
            formatedImgUrl = `${firstPartConst}${firstId}/${secondId}.jpg`;
          }

          let bookName = $(element).children('a.bookTitle').text();
          bookName = bookName.split(' (')[0];
          if (bookName !== '') {
            const detailsPageLink = $(element).children('a.bookTitle').attr('href');

            const parentAuthor = $(element).find('span')[1];
            const authorDiv = $(parentAuthor).children('div.authorName__container');
            const authorSpan = $(authorDiv).find('span')[0];
            const author = $(authorSpan).text();

            const ratingInfo = $(element).children('span.greyText').text();
            const avgRatingRegex = /avg rating (\d+\.\d+)/;
            const ratingsRegex = /(\d+(?:,\d+)*) ratings/;
            const publishedRegex = /published (\d+)/;

            const avgRatingMatch = ratingInfo.match(avgRatingRegex);
            const ratingsMatch = ratingInfo.match(ratingsRegex);
            const publishedMatch = ratingInfo.match(publishedRegex);
            const book = {
              title: bookName,
              author: author,
              avgRating: avgRatingMatch ? parseFloat(avgRatingMatch[1]) : -1,
              ratings: ratingsMatch ? parseInt(ratingsMatch[1].replace(/,/g, '')) : -1,
              firstPublished: publishedMatch ? parseInt(publishedMatch[1]) : -1,
              detailsLink: `${baseUrl}${detailsPageLink}`,
              img: formatedImgUrl ? formatedImgUrl : '',
              description: '',
              genres: [keyword],
            };
            listedBooks.push(book);
          }
        } else {
          log(`No book found in ${i} page`);
        }
      });
    }
    return listedBooks.slice(0, 20);
  };

  getSingleDetailsPageContent = async (id: string) => {
    const metadataElem = 'div.BookPageMetadataSection';
    try {
      const listedBook = await booksService.getBookById(id);
      let html_data = '';
      try {
        html_data = await ScraperService.getDetailsPageContents(listedBook.detailsLink);
      } catch (error) {
        log(error);
      }
      if (html_data) {
        const $ = cheerio.load(html_data);
        const fetchedMetaData = $(metadataElem);

        const descriptionLayout = $(fetchedMetaData).children('div.BookPageMetadataSection__description');
        const descriptionSpan = $(descriptionLayout).find('span.Formatted')[0];
        const descriptionContent = $(descriptionSpan).html();
        if (descriptionContent) {
          const description = descriptionContent.replace(/<i>(.*?)<\/i>/g, '');
          description.replace(/Alternate Cover Edition ISBN: \d+ \(ISBN13: <a href="(.*?)">(\d+)<\/a>\)/, '');
          listedBook.description = description;
        }
      }
    } catch (error) {
      log(error);
    }
  };

  syncContent = async (req: express.Request, res: express.Response) => {
    try {
      const listedBooks = await this.getListedBooksInfo(req.body.keyWord, req.body.authCookie);
      const metadataElem = 'div.BookPageMetadataSection';

      await Promise.all(
        listedBooks.map(async (listedBook) => {
          let html_data = '';
          try {
            html_data = await ScraperService.getDetailsPageContents(listedBook.detailsLink);
          } catch (error) {
            log(error);
          }
          if (html_data) {
            const $ = cheerio.load(html_data);
            const fetchedMetaData = $(metadataElem);

            const descriptionLayout = $(fetchedMetaData).children('div.BookPageMetadataSection__description');
            const descriptionSpan = $(descriptionLayout).find('span.Formatted')[0];
            const descriptionContent = $(descriptionSpan).html();
            if (descriptionContent) {
              const description = descriptionContent.replace(/<i>(.*?)<\/i>/g, '');
              description.replace(/Alternate Cover Edition ISBN: \d+ \(ISBN13: <a href="(.*?)">(\d+)<\/a>\)/, '');
              listedBook.description = description;
            }
          }
        }),
      );

      await booksController.compareAndUpdateBooks(listedBooks);
      await res.status(200).send('sync completed');
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };
}
export default new ScraperController();
