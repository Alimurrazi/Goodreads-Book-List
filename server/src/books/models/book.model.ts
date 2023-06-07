import mongoose, { Schema } from 'mongoose';
import { IBook } from '../dtos/book.dto';
const bookSchema = new Schema(
  {
    _id: String,
    title: String,
    author: String,
    avgRating: Number,
    ratings: Number,
    firstPublished: Number,
    img: String,
    detailsLink: String,
    description: String,
    genres: [String],
  },
  { id: false },
);

export default mongoose.model<IBook>('Book', bookSchema);
