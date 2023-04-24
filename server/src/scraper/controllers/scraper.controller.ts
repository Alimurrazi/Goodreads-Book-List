import axios from 'axios';
import express from 'express';
import cheerio from 'cheerio';

import debug from 'debug';
import { Book } from '../../books/dtos/book.dto';
import { error } from 'winston';
import booksController from '../../books/controllers/books.controller';
const log = debug('app:scraper-controller');

class ScraperController {
  async syncContent(req: express.Request, res: express.Response) {
    const listedBooks: Book[] = [];
    const promises: Promise<void>[] = [];
    const detailsPromises: Promise<void>[] = [];
    const baseUrl = 'https://www.goodreads.com';

    //  for (let i = 1; i <= 25; i++) {
    for (let i = 1; i <= 2; i++) {
      const url = `https://www.goodreads.com/shelf/show/favourites?page=${i}`;
      //  const url = `https://www.goodreads.com/shelf/show/bengali?page=${i}`;
      const selectedElem = 'div.left';
      const promise = axios(url, {
        headers: {
          Cookie: req.body.authCookie,
        },
      })
        .then((response) => {
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
        })
        .catch((error) => {
          log(error);
        });
      promises.push(promise);
    }
    await Promise.all(promises);

    listedBooks.sort((a, b) => b.avgRating * b.ratings - a.avgRating * a.ratings);

    const metadataElem = 'div.BookPageMetadataSection';
    listedBooks.forEach((listedBook, index) => {
      const url = listedBook.detailsLink;
      const promise = axios(url)
        .then((response) => {
          const html_data = response.data;
          const $ = cheerio.load(html_data);
          const fetchedMetaData = $(metadataElem);

          const descriptionLayout = $(fetchedMetaData).children('div.BookPageMetadataSection__description');
          const descriptionSpan = $(descriptionLayout).find('span.Formatted')[0];
          const descriptionContent = $(descriptionSpan).html();
          if (descriptionContent) {
            const description = descriptionContent.replace(/<i>(.*?)<\/i>/g, '');
            listedBooks[index].description = description;
          }

          const genreListLayout = $(fetchedMetaData).children('div.BookPageMetadataSection__genres');
          const genreSpans = $(genreListLayout).find('span.Button__labelItem');
          for (let i = 0; i < genreSpans.length && i < 5; i++) {
            listedBooks[index].genres.push($(genreSpans[i]).text());
          }
        })
        .catch((error) => {
          log(error);
        });
      detailsPromises.push(promise);
    });
    await Promise.all(detailsPromises);

    await booksController.addBooks(listedBooks);

    await res.status(200).send(listedBooks);
  }
}
export default new ScraperController();
