import { Book } from '../dtos/book.dto';
import bookModel from '../models/book.model';
import shortid from 'shortid';

class BookDao {
  async addBooks(listedBooks: Book[]) {
    return await bookModel.insertMany(listedBooks);
  }

  async addBook(bookFields: Book) {
    const newBookModel = new bookModel({
      _id: shortid.generate(),
      ...bookFields,
    });
    return await newBookModel.save();
  }

  async updateBookOne(id: string, updateModel: Partial<Book>) {
    return await bookModel.updateOne({ _id: id }, updateModel);
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

  async getBooksByGenre(keyWord: string, limit: number, page: number) {
    return bookModel
      .find({ genres: { $in: [keyWord] } })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async deleteAllBooks() {
    return await bookModel.deleteMany().exec();
  }
}

export default new BookDao();
