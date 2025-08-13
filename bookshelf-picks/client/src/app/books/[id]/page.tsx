'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import { Card, Descriptions, Typography, Space, Button } from 'antd';
import { useParams } from 'next/navigation';

const BOOKS: Record<string, any> = {
  '1': { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', summary: 'A hobbit goes on an adventure.' },
  '2': { title: '1984', author: 'George Orwell', genre: 'Dystopia', summary: 'A story of surveillance and control.' },
  '3': { title: 'Atomic Habits', author: 'James Clear', genre: 'Self-help', summary: 'Tiny changes, remarkable results.' },
};

export default function BookDetails() {
  const params = useParams<{ id: string }>();
  const book = BOOKS[params.id];

  if (!book) {
    return (
      <AppShell>
        <Card><Typography.Text>Book not found.</Typography.Text></Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Card title={book.title} extra={<Space><Button type="primary">Add to Favorites</Button></Space>}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
          <Descriptions.Item label="Genre">{book.genre}</Descriptions.Item>
          <Descriptions.Item label="Summary">{book.summary}</Descriptions.Item>
        </Descriptions>
      </Card>
    </AppShell>
  );
}
