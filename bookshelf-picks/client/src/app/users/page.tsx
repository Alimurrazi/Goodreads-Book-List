'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import { Card, Table, Tag } from 'antd';
import Link from 'next/link';

const columns = [
  { title: 'Name', dataIndex: 'name', render: (t: string, r: any) => <Link href={`/users/${r.key}`}>{t}</Link> },
  { title: 'Email', dataIndex: 'email' },
  { title: 'Role', dataIndex: 'role', render: (r: string) => <Tag color={r === 'Admin' ? 'red' : 'blue'}>{r}</Tag> },
];

const data = [
  { key: 'u1', name: 'Alice Doe', email: 'alice@example.com', role: 'Admin' },
  { key: 'u2', name: 'Bob Ray', email: 'bob@example.com', role: 'Reader' },
  { key: 'u3', name: 'Carol Kim', email: 'carol@example.com', role: 'Contributor' },
];

export default function UsersPage() {
  return (
    <AppShell>
      <Card title="Users">
        <Table rowKey="key" columns={columns} dataSource={data} pagination={false} />
      </Card>
    </AppShell>
  );
}
