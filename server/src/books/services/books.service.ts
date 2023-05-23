import bookDao from '../daos/book.dao';
import { Book } from '../dtos/book.dto';

class BooksService {
  async addBooks(resource: Book[]) {
    return bookDao.addBooks(resource);
  }
  async deleteAllBooks() {
    return await bookDao.deleteAllBooks();
  }
  async getAllBooks() {
    return bookDao.getAllBooks();
  }
  async getBooksByGenre(keyword: string, limit: number, page: number) {
    return bookDao.getBooksByGenre(keyword, limit, page);
  }
  async list(limit: number, page: number) {
    return bookDao.getBooks(limit, page);
  }
  async addBook(book: Book) {
    return bookDao.addBook(book);
  }
  async updateBookOne(id: string, updateModel: Partial<Book>) {
    return await bookDao.updateBookOne(id, updateModel);
  }
}

export default new BooksService();
