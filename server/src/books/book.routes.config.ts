import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import BooksController from './controllers/books.controller';

export class BooksRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'BooksRoutes');
  }
  getName() {
    return this.name;
  }
  configureRoutes(): express.Application {
    //    this.app.route('/books').get(BooksController.listBooks);
    this.app.route('/books').get(BooksController.getBooksByGenre);
    return this.app;
  }
}
