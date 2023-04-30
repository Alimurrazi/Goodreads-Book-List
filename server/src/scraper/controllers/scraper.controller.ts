import express from 'express';
import cheerio from 'cheerio';
import debug from 'debug';
import { Book } from '../../books/dtos/book.dto';
import booksController from '../../books/controllers/books.controller';
import ScraperService from '../services/scraper.service';
const log = debug('app:scraper-controller');
const baseUrl = 'https://www.goodreads.com';

class ScraperController {
  getListedBooksInfo = async (cookie: string) => {
    const listedBooks: Book[] = [];
    //  for (let i = 1; i <= 25; i++) {
    for (let i = 1; i <= 1; i++) {
      const selectedElem = 'div.left';
      const response = await ScraperService.getFavouritePageContents(i, cookie);

      const html_data = response.data;
      const $ = cheerio.load(html_data);
      const fetchedBooks = $(selectedElem);
      fetchedBooks.each(async (index, element) => {
        if (fetchedBooks.length > 0) {
          const imgLink = $(element).children('a.leftAlignedImage').find('img').attr('src');

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
              img: imgLink ? imgLink : '',
              description: '',
              genres: [],
            };
            listedBooks.push(book);
          }
        } else {
          log(`No book found in ${i} page`);
        }
      });
    }
    listedBooks.sort((a, b) => b.avgRating * b.ratings - a.avgRating * a.ratings);
    return listedBooks;
  };

  syncContent = async (req: express.Request, res: express.Response) => {
    try {
      const listedBooks = await this.getListedBooksInfo(req.body.authCookie);
      const metadataElem = 'div.BookPageMetadataSection';
      const imgElem = 'div.BookPage__bookCover';

      await Promise.all(
        //        listedBooks.map(async (listedBook) => {
        listedBooks.slice(0, 5).map(async (listedBook) => {
          const html_data = await ScraperService.getDetailsPageContents(listedBook.detailsLink);

          const $ = cheerio.load(html_data);
          const fetchedMetaData = $(metadataElem);

          const imgContainer = $(imgElem);
          const imgLik = $(imgContainer).find('img.ResponsiveImage').attr('src');
          listedBook.img = imgLik ? imgLik : '';

          const descriptionLayout = $(fetchedMetaData).children('div.BookPageMetadataSection__description');
          const descriptionSpan = $(descriptionLayout).find('span.Formatted')[0];
          const descriptionContent = $(descriptionSpan).html();
          if (descriptionContent) {
            const description = descriptionContent.replace(/<i>(.*?)<\/i>/g, '');
            description.replace(/Alternate Cover Edition ISBN: \d+ \(ISBN13: <a href="(.*?)">(\d+)<\/a>\)/, '');
            listedBook.description = description;
          }

          const genreListLayout = $(fetchedMetaData).children('div.BookPageMetadataSection__genres');
          const genreSpans = $(genreListLayout).find('span.Button__labelItem');
          for (let i = 0; i < genreSpans.length && i < 5; i++) {
            listedBook.genres.push($(genreSpans[i]).text());
          }
        }),
      );

      await booksController.removeAndUpdateBooks(listedBooks);
      await res.status(200).send(listedBooks);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };
}
export default new ScraperController();
