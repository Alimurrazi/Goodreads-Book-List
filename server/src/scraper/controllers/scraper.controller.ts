import axios from 'axios';
import express from 'express';
import cheerio from 'cheerio';

interface Book {
  book: string;
  author: string;
  rating: string;
}

class ScraperController {
  async syncContent(req: express.Request, res: express.Response) {
    const listedBooks: Book[] = [];
    let i = 1;
    let shouldContinue = true;
    //    const promises: Promise<any>[] = [];

    while (shouldContinue) {
      const url = `https://www.goodreads.com/shelf/show/bengali?page=${i}`;
      const selectedElem = 'div.left';
      await axios(url, {
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
              const bookName = $(element).children('a.bookTitle').text();
              const parentAuthor = $(element).find('span')[1];
              const authorDiv = $(parentAuthor).children('div.authorName__container');
              const authorSpan = $(authorDiv).find('span')[0];
              const author = $(authorSpan).text();
              const ratingInfo = $(element).children('span.greyText').text();

              const book = {
                book: bookName,
                author: author,
                rating: ratingInfo,
              };

              console.log(bookName);
              listedBooks.push(book);
            } else {
              shouldContinue = false;
            }
          });
          i++;
        })
        .catch((error) => {
          shouldContinue = false;
        });
      // promises.push(promise);
    }
    //   await Promise.all(promises);
    await res.status(200).send(listedBooks);
  }
}
export default new ScraperController();
