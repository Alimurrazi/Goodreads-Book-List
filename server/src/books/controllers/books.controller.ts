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

  //  async compareAndUpdateBooks(updatedBooks: Book[]): Promise<void> {
  compareAndUpdateBooks = async (updatedBooks: Book[]): Promise<void> => {
    try {
      // const filter = { $or: [{ id: 1 }, { id: 2 }] };
      // const update1 = { $set: { description: 'work not hard' } };
      // const update2 = { $set: { description: 'work very hard' } };
      // const options = { multi: true };
      // const promises = [];

      // fetchedElements.forEach((element) => {
      //   const update = element.id === 1 ? update1 : update2;
      //   promises.push(MyModel.updateOne({ id: element.id }, update));
      // });

      const results = await Promise.all(promises);

      const fetchedBooks = this.getAllBooks();
      //      await this.deleteAllBooks();
      await this.addBooks(updatedBooks);
    } catch (error) {
      log(error);
      throw error;
    }
  };
}
export default new BooksController();
