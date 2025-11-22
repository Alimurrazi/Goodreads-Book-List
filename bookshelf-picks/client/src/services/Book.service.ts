import { Book } from "@/types/book.type";
import axios from "axios";

const BOOK_API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BOOK_API_BASE_URL_LOCAL
    : process.env.NEXT_PUBLIC_BOOK_API_BASE_URL_PROD;

class BookService {
  getBooksByGenre(genre: string, pageNumber: number) {
    const url = `${BOOK_API_BASE_URL}?genre=${genre}&page=${pageNumber}`;
    return axios.get<Book[]>(url);
  }
  getBookById(id: string) {
    const url = `${BOOK_API_BASE_URL}/${id}`;
    return axios.get<Book>(url);
  }
}

export default new BookService();
