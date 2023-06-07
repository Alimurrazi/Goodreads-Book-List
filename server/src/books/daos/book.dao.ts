import { IBook } from '../dtos/book.dto';
import bookModel from '../models/book.model';
import shortid from 'shortid';
import { Document } from 'mongoose';

class BookDao {
  async addBooks(listedBooks: IBook[]) {
    return await bookModel.insertMany(listedBooks);
  }

  async addBook(bookFields: Partial<IBook>) {
    const newBookModel = new bookModel({
      _id: shortid.generate(),
      ...bookFields,
    });
    return await newBookModel.save();
  }

  async updateBookOne(id: string, updateModel: Partial<IBook>) {
    return await bookModel.updateOne({ _id: id }, updateModel);
  }

  async getAllBooks(): Promise<IBook[]> {
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

  async getBookById(id: string): Promise<IBook | null> {
    const book = await bookModel.findOne({ _id: id }).exec();
    if (!book) {
      return null;
    }
    return book;
  }

  async deleteAllBooks() {
    return await bookModel.deleteMany().exec();
  }
}

export default new BookDao();
