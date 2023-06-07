import bookDao from '../daos/book.dao';
import { IBook } from '../dtos/book.dto';

class BooksService {
  async addBooks(resource: IBook[]) {
    return bookDao.addBooks(resource);
  }
  async deleteAllBooks() {
    return await bookDao.deleteAllBooks();
  }
  async getAllBooks() {
    return bookDao.getAllBooks();
  }
  async getBooksByGenre(keyword: string) {
    return bookDao.getBooksByGenre(keyword);
  }
  async getBookById(id: string) {
    return bookDao.getBookById(id);
  }
  async list(limit: number, page: number) {
    return bookDao.getBooks(limit, page);
  }
  async addBook(book: IBook) {
    return bookDao.addBook(book);
  }
  async updateBookOne(id: string, updateModel: Partial<IBook>) {
    return await bookDao.updateBookOne(id, updateModel);
  }
}

export default new BooksService();
