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
      const page = req.query.page ? parseInt(req.query.page as string) : 0;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      let books = await booksService.getBooksByGenre(genre as string);
      books.sort((a, b) => {
        const aAvgRating = a.avgRating || 0;
        const aRatings = a.ratings || 0;
        const bAvgRating = b.avgRating || 0;
        const bRatings = b.ratings || 0;
        return bAvgRating * bRatings - aAvgRating * aRatings;
      });
      books = books.slice(limit * page, limit * page + limit);
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

  compareAndUpdateExistingBookBySync = async (fetchedBook: any, updatedBook: Partial<Book>) => {
    try {
      //  const fetchedBook = await booksService.getBookById(updatedBook.title);
      //  const updateModel = this.restructureUpdateModel(fetchedBook, updatedBook);
      // need to change any type
      if (fetchedBook && (fetchedBook as any)._id) {
        await booksService.updateBookOne((fetchedBook as any)._id, updatedBook);
      }
    } catch (error) {
      log(error);
    }
  };

  // Need to change fetchedBook type, need to update booksService.getBooksByTitle
  restructureUpdateModel = (fetchedBook: Partial<Book> | any, updatedBook: Book) => {
    let description = fetchedBook.description;
    if (fetchedBook.description?.length && updatedBook.description.length) {
      description =
        fetchedBook.description.length > updatedBook.description.length
          ? fetchedBook.description
          : updatedBook.description;
    }

    const updateModel: Partial<Book> = {
      description: description,
      avgRating: updatedBook.avgRating,
      ratings: updatedBook.ratings,
      genres: fetchedBook.genres || [],
      img: updatedBook.img,
    };
    if (updatedBook.description) {
      updateModel.description = updatedBook.description;
    }

    if (updatedBook.genres.length > 0 && fetchedBook.genres) {
      const index = fetchedBook.genres.findIndex((genre: string) => genre === updatedBook.genres[0]);
      if (index === -1) {
        if (updateModel.genres) {
          updateModel.genres.push(updatedBook.genres[0]);
        }
      }
    }
    return updateModel;
  };

  compareAndUpdateBooks = async (updatedBooks: Book[]): Promise<void[]> => {
    try {
      const fetchedBooks = await this.getAllBooks();

      const promises = updatedBooks.map(async (updatedBook) => {
        const fetchedBook = fetchedBooks.find((fetchedBook) => fetchedBook.title == updatedBook.title);

        if (fetchedBook) {
          const updateModel = this.restructureUpdateModel(fetchedBook, updatedBook);

          // let description = fetchedBook.description;
          // if (fetchedBook.description?.length && updatedBook.description.length) {
          //   description =
          //     fetchedBook.description.length > updatedBook.description.length
          //       ? fetchedBook.description
          //       : updatedBook.description;
          // }

          // const updateModel: Partial<Book> = {
          //   description: description,
          //   avgRating: updatedBook.avgRating,
          //   ratings: updatedBook.ratings,
          //   genres: fetchedBook.genres || [],
          //   img: updatedBook.img,
          // };
          // if (updatedBook.description) {
          //   updateModel.description = updatedBook.description;
          // }

          // if (updatedBook.genres.length > 0) {
          //   const index = fetchedBook.genres.findIndex((genre) => genre === updatedBook.genres[0]);
          //   if (index === -1) {
          //     if (updateModel.genres) {
          //       updateModel.genres.push(updatedBook.genres[0]);
          //     }
          //   }
          // }

          try {
            await booksService.updateBookOne(fetchedBook._id, updateModel);
          } catch (error) {
            log(error);
          }
        } else {
          try {
            await booksService.addBook(updatedBook);
          } catch (error) {
            log(error);
          }
        }
      });

      return await Promise.all(promises);
    } catch (error) {
      log(error);
      throw error;
    }
  };
}
export default new BooksController();
