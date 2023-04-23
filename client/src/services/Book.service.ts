import axios from 'axios';
import { IBook } from '../components/Book/types';

const BOOK_API_BASE_URL = 'http://localhost:5000/books?limit=50&page=0';

class BookService {
  getBooks() {
    return axios.get<IBook[]>(BOOK_API_BASE_URL);
  }
}

export default new BookService();
