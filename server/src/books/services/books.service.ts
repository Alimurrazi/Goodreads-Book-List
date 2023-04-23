import bookDao from '../daos/book.dao';
import { Book } from '../dtos/book.dto';

class BooksService {
  async addBooks(resource: Book[]) {
    return bookDao.addBooks(resource);
  }
  async getAllBooks() {
    return bookDao.getAllBooks();
  }
  async list(limit: number, page: number) {
    return bookDao.getBooks(limit, page);
  }
}

export default new BooksService();
