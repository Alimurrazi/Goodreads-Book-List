import { Book } from '../dtos/book.dto';
import bookModel from '../models/book.model';

class BookDao {
  bookModel = new bookModel();

  async addBooks(listedBooks: Book[]) {
    await bookModel.insertMany(listedBooks);
    return 'Saved successfully';
  }

  async addBook(book: Book) {
    await new bookModel(book).save();
  }

  async updateBookOne(id: string, updateModel: Partial<Book>) {
    await bookModel.updateOne({ _id: id }, updateModel);
  }

  async getAllBooks() {
    return bookModel.find().exec();
  }

  async getBooks(limit = 50, page = 0) {
    return bookModel
      .find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getBooksByGenre(keyWord: string) {
    return bookModel.find({ genres: { $in: [keyWord] } }).exec();
  }

  async deleteAllBooks() {
    await bookModel.deleteMany().exec();
  }
}

export default new BookDao();
