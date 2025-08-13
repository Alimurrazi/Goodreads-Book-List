'use client';

import React from 'react';
import { Layout, Dropdown, Avatar, MenuProps, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const { Header } = Layout;

export default function Topbar() {
  const { data } = useSession();
  const user = data?.user;

  const items: MenuProps['items'] = [
    { key: 'profile', label: <Link href="/profile">Profile</Link>, icon: <ProfileOutlined /> },
    { type: 'divider' },
    { key: 'logout', label: 'Sign out', icon: <LogoutOutlined />, onClick: () => signOut() },
  ];

  return (
    <Header style={{ background: 'white', paddingInline: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/books" className="logo" style={{ color: 'black' }}>
        BookShelf Picks
      </Link>

      <Space>
        <Typography.Text>{user?.name ?? 'Guest'}</Typography.Text>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Avatar src={user?.image ?? undefined} icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Header>
  );
}
