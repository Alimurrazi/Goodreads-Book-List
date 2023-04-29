import { Book } from '../dtos/book.dto';
import bookModel from '../models/book.model';

class BookDao {
  bookModel = new bookModel();

  async addBooks(listedBooks: Book[]) {
    await bookModel.insertMany(listedBooks);
    return 'Saved successfully';
  }

  async getAllBooks() {
    return bookModel.find().exec;
  }

  async getBooks(limit = 50, page = 0) {
    return bookModel
      .find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async deleteAllBooks() {
    await bookModel.deleteMany();
  }
}

export default new BookDao();
