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
    const url = 'https://www.goodreads.com/shelf/show/bengali';
    const selectedElem = 'div.left';
    axios(url, {
      headers: {
        Cookie: req.body.authCookie,
      },
    }).then(async (response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);
      const listedBooks: Book[] = [];

      $(selectedElem).each(async (index, element) => {
        const bookName = $(element).children('a.bookTitle').text();
        const author = $(element).children('span.name').text();
        const ratingInfo = $(element).children('span.greyText').text();

        const book = {
          book: bookName,
          author: author,
          rating: ratingInfo,
        };

        console.log(bookName);
        listedBooks.push(book);
      });
      await res.status(200).send(listedBooks);
    });
  }
}
export default new ScraperController();
