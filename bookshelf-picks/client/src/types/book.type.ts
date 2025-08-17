export type Book = {
  _id: string;
  status: "read" | "want";
  favorite: boolean;
  title: string;
  author: string;
  avgRating: number;
  ratings: number;
  firstPublished: number;
  img: string;
  description: string;
  genres: string[];
};
