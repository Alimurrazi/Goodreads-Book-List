import bookModel from '../models/book.model';

class BookDao {
  bookModel = new bookModel();
}

export default new BookDao();
