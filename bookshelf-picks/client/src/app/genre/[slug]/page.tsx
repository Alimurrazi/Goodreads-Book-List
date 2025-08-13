'use client';

import React, { useMemo, useState } from 'react';
import AppShell from '@/components/AppShell';
import GenreHeader from '@/components/GenreHeader';
import QuoteSidebar from '@/components/QuoteSidebar';
import { useParams } from 'next/navigation';
import { Card, Checkbox, Dropdown, Empty, Flex, Input, List, MenuProps, Select, Space, Tag, Typography } from 'antd';
import { HeartFilled, HeartOutlined, MoreOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { GENRES, SAMPLE_BOOKS, type GenreKey, type Book } from '../../data/genres';
import { motion } from 'framer-motion';

const statusTag = (s: Book['status']) => (s === 'read' ? <Tag color="green">Read</Tag> : <Tag color="gold">Want to read</Tag>);

export default function GenrePage() {
  const { slug } = useParams<{ slug: GenreKey }>();
  const meta = GENRES[slug];
  const [books, setBooks] = useState<Book[]>(SAMPLE_BOOKS[slug] || []);
  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState<Book['status'] | 'all'>('all');
  const [onlyFav, setOnlyFav] = useState(false);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchesQ = !q || b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase());
      const matchesStatus = filterStatus === 'all' ? true : b.status === filterStatus;
      const matchesFav = onlyFav ? b.favorite : true;
      return matchesQ && matchesStatus && matchesFav;
    });
  }, [books, q, filterStatus, onlyFav]);

  const toggleFavorite = (id: string) => setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, favorite: !b.favorite } : b)));
  const changeStatus = (id: string, status: Book['status']) => setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  const cardMenu = (book: Book): MenuProps['items'] => [
    { key: 'read', label: 'Mark as Read', onClick: () => changeStatus(book.id, 'read') },
    { key: 'want', label: 'Mark as Want to Read', onClick: () => changeStatus(book.id, 'want') },
    { type: 'divider' },
    { key: 'details', label: <Link href={`/books/${book.id}`}>View details</Link> },
  ];

  if (!meta) return (
    <AppShell>
      <Empty description="Genre not found" />
    </AppShell>
  );

  return (
    <AppShell>
      <div className="genrePage">
        <div className="genreMain">
          <GenreHeader icon={meta.icon} title={meta.title} subtitle={meta.subtitle} />

          {/* Controls */}
          <Flex wrap="wrap" gap={12} align="center" style={{ marginBottom: 16 }}>
            <Input.Search allowClear placeholder={`Search ${meta.title}…`} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 240 }} />
            <Select
              value={filterStatus}
              style={{ width: 180 }}
              onChange={(v) => setFilterStatus(v)}
              options={[{ value: 'all', label: 'All statuses' }, { value: 'read', label: 'Read' }, { value: 'want', label: 'Want to read' }]}
            />
            <Checkbox checked={onlyFav} onChange={(e) => setOnlyFav(e.target.checked)}>Favorites only</Checkbox>
          </Flex>

          {/* Cards grid with animations */}
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={filtered}
            locale={{ emptyText: <Empty description={`No ${meta.title} books found`} /> }}
            renderItem={(b, i) => (
              <List.Item>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <Card
                    hoverable
                    cover={<div style={{ height: 220, backgroundImage: `url(${b.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
                    actions={[
                      <button key="fav" className="ghostBtn" onClick={() => toggleFavorite(b.id)}>
                        {b.favorite ? <HeartFilled /> : <HeartOutlined />} {b.favorite ? 'Favorited' : 'Favorite'}
                      </button>,
                      <Dropdown key="more" menu={{ items: cardMenu(b) }} trigger={['click']}>
                        <button className="ghostBtn"><MoreOutlined /> More</button>
                      </Dropdown>,
                    ]}
                  >
                    <Space direction="vertical" size={4} style={{ display: 'block' }}>
                      <Link href={`/books/${b.id}`}><Typography.Title level={5} style={{ marginBottom: 0 }}>{b.title}</Typography.Title></Link>
                      <Typography.Text type="secondary">{b.author}</Typography.Text>
                      <Typography.Paragraph ellipsis={{ rows: 3 }}>{b.description}</Typography.Paragraph>
                      {statusTag(b.status)}
                    </Space>
                  </Card>
                </motion.div>
              </List.Item>
            )}
          />
        </div>

        <aside className="genreSidebar">
          <QuoteSidebar quote="So many books, so little time." author="Frank Zappa" />
        </aside>
      </div>
    </AppShell>
  );
}