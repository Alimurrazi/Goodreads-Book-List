'use client';

import React, { useMemo, useState } from 'react';
import AppShell from '@/components/AppShell';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Empty,
  Flex,
  Input,
  List,
  MenuProps,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import {
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

type Status = 'read' | 'want' ;
type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  status: Status;
  favorite: boolean;
};

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description:
      'Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor.',
    cover:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800',
    status: 'read',
    favorite: true,
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    description:
      'A chilling dystopia about surveillance, control, and the erosion of truth.',
    cover:
      'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800',
    status: 'want',
    favorite: false,
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    description:
      'Tiny changes, remarkable results. A practical guide to building good habits.',
    cover:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800',
    status: 'read',
    favorite: false,
  },
];

const statusTag = (s: Status) =>
  s === 'read' ? <Tag color="green">Read</Tag> : <Tag color="gold">Want to read</Tag>;

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [onlyFav, setOnlyFav] = useState(false);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchesQ =
        !q ||
        b.title.toLowerCase().includes(q.toLowerCase()) ||
        b.author.toLowerCase().includes(q.toLowerCase());
      const matchesStatus = filterStatus === 'all' ? true : b.status === filterStatus;
      const matchesFav = onlyFav ? b.favorite : true;
      return matchesQ && matchesStatus && matchesFav;
    });
  }, [books, q, filterStatus, onlyFav]);

  const toggleFavorite = (id: string) =>
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, favorite: !b.favorite } : b))
    );

  const changeStatus = (id: string, status: Status) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));

  const cardMenu = (book: Book): MenuProps['items'] => [
    {
      key: 'read',
      label: 'Mark as Read',
      onClick: () => changeStatus(book.id, 'read'),
    },
    {
      key: 'want',
      label: 'Mark as Want to Read',
      onClick: () => changeStatus(book.id, 'want'),
    },
    { type: 'divider' },
    { key: 'details', label: <Link href={`/books/${book.id}`}>View details</Link> },
  ];

  return (
    <AppShell>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Top controls */}
        <Flex wrap="wrap" gap={12} align="center" justify="space-between">
          <Typography.Title level={3} style={{ margin: 0 }}>
            Books
          </Typography.Title>

          <Flex gap={12} align="center" wrap="wrap">
            <Input.Search
              allowClear
              placeholder="Search by title or author…"
              onSearch={setQ}
              onChange={(e) => setQ(e.target.value)}
              style={{ minWidth: 220 }}
            />
            <Select
              value={filterStatus}
              style={{ width: 180 }}
              onChange={(v) => setFilterStatus(v)}
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'read', label: 'Read' },
                { value: 'want', label: 'Want to read' },
              ]}
            />
            <Checkbox checked={onlyFav} onChange={(e) => setOnlyFav(e.target.checked)}>
              Favorites only
            </Checkbox>
          </Flex>
        </Flex>

        {/* Cards grid */}
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
          dataSource={filtered}
          locale={{ emptyText: <Empty description="No books found" /> }}
          renderItem={(b) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: 200,
                      backgroundImage: `url(${b.cover})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                }
                actions={[
                  <Button
                    key="fav"
                    type="text"
                    onClick={() => toggleFavorite(b.id)}
                    icon={b.favorite ? <HeartFilled /> : <HeartOutlined />}
                  >
                    {b.favorite ? 'Favorited' : 'Favorite'}
                  </Button>,
                  <Dropdown key="more" menu={{ items: cardMenu(b) }} trigger={['click']}>
                    <Button type="text" icon={<MoreOutlined />}>More</Button>
                  </Dropdown>,
                ]}
              >
                <Space direction="vertical" size={4} style={{ display: 'block' }}>
                  <Link href={`/books/${b.id}`}>
                    <Typography.Title level={5} style={{ marginBottom: 0 }}>
                      {b.title}
                    </Typography.Title>
                  </Link>
                  <Typography.Text type="secondary">{b.author}</Typography.Text>
                  <Typography.Paragraph ellipsis={{ rows: 3 }}>
                    {b.description}
                  </Typography.Paragraph>
                  <Space align="center">
                    {statusTag(b.status)}
                  </Space>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </Space>
    </AppShell>
  );
}
