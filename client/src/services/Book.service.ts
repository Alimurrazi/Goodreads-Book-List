import axios from 'axios';
import { IBook } from '../components/Book/types';

const BOOK_API_BASE_URL = 'http://localhost:5000/books';

class BookService {
  getBooks(pageNumber: number) {
    const url = `${BOOK_API_BASE_URL}?limit=25&page=${pageNumber}`;
    return axios.get<IBook[]>(url);
  }
}

export default new BookService();
