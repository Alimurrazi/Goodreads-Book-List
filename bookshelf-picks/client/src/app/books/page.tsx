"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function BooksPage() {
  useEffect(() => {
    redirect("/books/adventure");
  }, []);
}
