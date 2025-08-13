import {
  ThunderboltFilled,
  BookFilled,
  CompassFilled,
  HighlightFilled,
} from "@ant-design/icons";

export type GenreKey = "thriller" | "novel" | "scifi" | "nonfiction";

export const GENRES: Record<
  GenreKey,
  { title: string; subtitle?: string; icon: React.ReactNode }
> = {
  thriller: {
    title: "Thriller",
    subtitle: "Pulse-pounding mysteries & suspense",
    icon: <ThunderboltFilled />,
  },
  novel: {
    title: "Novels",
    subtitle: "Timeless stories and characters",
    icon: <BookFilled />,
  },
  scifi: {
    title: "Science Fiction",
    subtitle: "Futures imagined, worlds discovered",
    icon: <CompassFilled />,
  },
  nonfiction: {
    title: "Non‑fiction",
    subtitle: "Ideas, history, and real lives",
    icon: <HighlightFilled />,
  },
};

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  status: "read" | "want";
  favorite: boolean;
};

export const SAMPLE_BOOKS: Record<GenreKey, Book[]> = {
  thriller: [
    {
      id: "t1",
      title: "Gone Girl",
      author: "Gillian Flynn",
      description:
        "A twisted, gripping psychological thriller about a missing wife.",
      cover:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200",
      status: "want",
      favorite: false,
    },
    {
      id: "t2",
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      description: "Investigative journalism meets dark family secrets.",
      cover:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200",
      status: "read",
      favorite: true,
    },
  ],
  novel: [
    {
      id: "n1",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      description:
        "A witty exploration of manners, marriage, and misunderstandings.",
      cover:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200",
      status: "read",
      favorite: true,
    },
  ],
  scifi: [
    {
      id: "s1",
      title: "Dune",
      author: "Frank Herbert",
      description:
        "Politics, prophecy, and power on the desert planet Arrakis.",
      cover:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200",
      status: "want",
      favorite: false,
    },
  ],
  nonfiction: [
    {
      id: "nf1",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      description: "A brief history of humankind—how we became who we are.",
      cover:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200",
      status: "read",
      favorite: false,
    },
  ],
};
