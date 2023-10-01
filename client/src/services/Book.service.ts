import axios from 'axios';
import { IBook } from '../components/Book/types';

const BOOK_API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_BOOK_API_BASE_URL_LOCAL
    : process.env.REACT_APP_BOOK_API_BASE_URL_PROD;

class BookService {
  getBooks(pageNumber: number) {
    const url = `${BOOK_API_BASE_URL}?limit=25&page=${pageNumber}`;
    return axios.get<IBook[]>(url);
  }

  getBooksByGenre(genre: string, pageNumber: number) {
    const url = `${BOOK_API_BASE_URL}?genre=${genre}&page=${pageNumber}`;
    return axios.get<IBook[]>(url);
  }
}

export default new BookService();
