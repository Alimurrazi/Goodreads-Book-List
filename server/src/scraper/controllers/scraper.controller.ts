import axios from 'axios';
import express from 'express';
import cheerio from 'cheerio';

import debug from 'debug';
import { Book } from '../dtos/book.dto';
const log = debug('app:scraper-controller');

class ScraperController {
  async syncContent(req: express.Request, res: express.Response) {
    const listedBooks: Book[] = [];
    const promises: Promise<void>[] = [];

    for (let i = 1; i <= 20; i++) {
      const url = `https://www.goodreads.com/shelf/show/favourites?page=${i}`;
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
              const elementText = $(element).text();
              const regex = /\(shelved (\d+) times/;
              const match = elementText.match(regex);
              const totalShelved = match ? parseInt(match[1]) : 0;

              const imgLink = $(element).children('a.leftAlignedImage').find('img').attr('src');

              const bookName = $(element).children('a.bookTitle').text();

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
                book: bookName,
                author: author,
                avgRating: avgRatingMatch ? parseFloat(avgRatingMatch[1]) : -1,
                ratings: ratingsMatch ? parseInt(ratingsMatch[1].replace(/,/g, '')) : -1,
                firstPublished: publishedMatch ? parseInt(publishedMatch[1]) : -1,
                totalShelved: totalShelved,
                img: imgLink ? imgLink : '',
              };
              listedBooks.push(book);
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
    await res.status(200).send(listedBooks);
  }
}
export default new ScraperController();
