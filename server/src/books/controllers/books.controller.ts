import express from 'express';
import booksService from '../services/books.service';
import { Book } from '../dtos/book.dto';
import debug from 'debug';
import _ from 'lodash';
const log: debug.IDebugger = debug('app:books-controller');

class BooksController {
  addBooks = async (resources: Book[]) => {
    return await booksService.addBooks(resources);
  };
  getAllBooks = async () => {
    return await booksService.getAllBooks();
  };
  getBooksByGenre = async (req: express.Request, res: express.Response) => {
    const genre = req.query.genre;
    if (genre) {
      const books = await booksService.getBooksByGenre(genre as string);
      res.status(200).send(books);
    } else {
      res.status(500).send('Genre parameter missing');
    }
  };
  deleteAllBooks = async () => {
    return await booksService.deleteAllBooks();
  };
  async listBooks(req: express.Request, res: express.Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const books = await booksService.list(limit, page);
    res.status(200).send(books);
  }
  async removeAndUpdateBooks(updatedBooks: Book[]): Promise<void> {
    try {
      await this.deleteAllBooks();
      await this.addBooks(updatedBooks);
    } catch (error) {
      log(error);
      throw error;
    }
  }

  compareAndUpdateBooks = async (updatedBooks: Book[]): Promise<void> => {
    try {
      const fetchedBooks = await this.getAllBooks();

      const promises = updatedBooks.map(async (updatedBook) => {
        const fetchedBook = fetchedBooks.find((fetchedBook) => fetchedBook.title == updatedBook.title);

        if (fetchedBook) {
          const updateModel: Partial<Book> = {
            description: fetchedBook.description,
            avgRating: updatedBook.avgRating,
            ratings: updatedBook.ratings,
            genres: fetchedBook.genres || [],
          };

          if (updatedBook.description) {
            updateModel.description = updatedBook.description;
          }

          if (updatedBook.genres.length > 0) {
            const index = fetchedBook.genres.findIndex((genre) => genre === updatedBook.genres[0]);
            if (index === -1) {
              if (updateModel.genres) {
                updateModel.genres.push(updatedBook.genres[0]);
              }
            }
          }

          await booksService.updateBookOne(fetchedBook._id, updateModel);
        } else {
          await booksService.addBook(updatedBook);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      log(error);
      throw error;
    }
  };
}
export default new BooksController();
