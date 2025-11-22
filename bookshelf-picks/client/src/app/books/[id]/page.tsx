"use client";

import React, { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { Card, Descriptions, Typography, Space, Button, Divider } from "antd";
import { useParams } from "next/navigation";
import { Book } from "@/types/book.type";
import BookService from "@/services/Book.service";
import { motion } from "framer-motion";

const BOOKS: Record<string, any> = {
  "1": {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    summary: "A hobbit goes on an adventure.",
  },
  "2": {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopia",
    summary: "A story of surveillance and control.",
  },
  "3": {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    summary: "Tiny changes, remarkable results.",
  },
};

export default function BookDetails() {
  const params = useParams<{ id: string }>();
  const bookId = params.id;
  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBook = async () => {
    try {
      setIsLoading(true);
      await BookService.getBookById(bookId).then((res) => {
        setBook(res.data);
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
    // const currentBook = await BookService.getBookById(bookId);
    // setBook(currentBook);
  }, [bookId]);

  if (!book) {
    return (
      <AppShell>
        <Card>
          <Typography.Text>Book not found.</Typography.Text>
        </Card>
      </AppShell>
    );
  }

  const handleStatusChange = (status: string) => {};

  return (
    <AppShell>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <img src={book.img} />
          <div className="flex flex-col ml-8 mt-12">
            <div className="font-bold">{book.title}</div>
            <div className="font-light mt-2">{book.author}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xl">{book.avgRating}</div>
          <div className="text-lg mt-2">{book.ratings} voted</div>
          <div className="text-xl mt-4">{book.description}</div>
        </div>
        <div className="flex flex-col">
          <Divider />
          <div className="flex flex-row w-full">
            <div className="w-1/3">First Published</div>
            <div className="w-2/3">{book.firstPublished}</div>
          </div>
          <Divider />
          <div className="flex flex-row w-full">
            <div className="w-1/3">Genres</div>
            <div className="w-2/3">{book.genres.join(", ")}</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
