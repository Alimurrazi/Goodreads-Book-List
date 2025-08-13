'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import { Card, Descriptions, Avatar } from 'antd';
import { useSession } from 'next-auth/react';
import { UserOutlined } from '@ant-design/icons';

export default function ProfilePage() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <AppShell>
      <Card title="My Profile">
        <Avatar src={user?.image ?? undefined} icon={<UserOutlined />} size={64} />
        <Descriptions bordered column={1} style={{ marginTop: 16 }}>
          <Descriptions.Item label="Name">{user?.name ?? 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email ?? 'N/A'}</Descriptions.Item>
        </Descriptions>
      </Card>
    </AppShell>
  );
}
