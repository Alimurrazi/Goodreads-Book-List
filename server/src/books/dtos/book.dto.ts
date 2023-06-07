export interface IBook extends Document {
  _id: string;
  title: string;
  author: string;
  avgRating: number;
  ratings: number;
  firstPublished: number;
  img: string;
  detailsLink: string;
  description: string;
  genres: string[];
}
