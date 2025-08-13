'use client';

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BookOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Topbar from './Topbar';

const { Sider, Content } = Layout;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} breakpoint="lg">
        <div style={{ color: 'white', padding: 16, fontWeight: 700 }}>BookShelf Picks</div>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            { key: 'home', icon: <HomeOutlined />, label: <Link href="/books">Home</Link> },
            { key: 'books', icon: <BookOutlined />, label: <Link href="/books">Books</Link>,
              children: [
                { key: '5', label: 'Option 5' },
                { key: '6', label: 'Option 6' }]},
            { key: 'users', icon: <TeamOutlined />, label: <Link href="/users">Users</Link> },
            { key: 'profile', icon: <UserOutlined />, label: <Link href="/profile">My Profile</Link> },
          ]}
          defaultOpenKeys={['books']}
        />
      </Sider>
      <Layout>
        <Topbar />
        <Content style={{ margin: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
