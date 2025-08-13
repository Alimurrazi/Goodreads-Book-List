'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import { Card, Descriptions, Avatar, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';

const USERS: Record<string, any> = {
  'u1': { name: 'Alice Doe', email: 'alice@example.com', role: 'Admin' },
  'u2': { name: 'Bob Ray', email: 'bob@example.com', role: 'Reader' },
  'u3': { name: 'Carol Kim', email: 'carol@example.com', role: 'Contributor' },
};

export default function UserDetails() {
  const params = useParams<{ id: string }>();
  const u = USERS[params.id];

  if (!u) {
    return <AppShell><Card>User not found.</Card></AppShell>;
  }

  return (
    <AppShell>
      <Card title={u.name} extra={<Space><Button>Edit</Button></Space>}>
        <Space size="large" align="start">
          <Avatar size={64} icon={<UserOutlined />} />
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Email">{u.email}</Descriptions.Item>
            <Descriptions.Item label="Role">{u.role}</Descriptions.Item>
            <Descriptions.Item label="Status">Active</Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
    </AppShell>
  );
}
