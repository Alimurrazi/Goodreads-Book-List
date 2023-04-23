import express from 'express';
import booksService from '../services/books.service';
import { Book } from '../dtos/book.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:books-controller');

class BooksController {
  async addBooks(resources: Book[]) {
    return await booksService.addBooks(resources);
  }
  async getAllBooks() {
    return await booksService.getAllBooks();
  }
  async listBooks(req: express.Request, res: express.Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const books = await booksService.list(limit, page);
    res.status(200).send(books);
  }
}
export default new BooksController();
