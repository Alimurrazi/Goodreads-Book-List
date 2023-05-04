import bookDao from '../daos/book.dao';
import { Book } from '../dtos/book.dto';

class BooksService {
  async addBooks(resource: Book[]) {
    return bookDao.addBooks(resource);
  }
  async deleteAllBooks() {
    await bookDao.deleteAllBooks();
  }
  async getAllBooks() {
    return bookDao.getAllBooks();
  }
  async getBooksByGenre(keyword: string) {
    return bookDao.getBooksByGenre(keyword);
  }
  async list(limit: number, page: number) {
    return bookDao.getBooks(limit, page);
  }
}

export default new BooksService();