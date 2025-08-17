"use client";

import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Topbar from "./Topbar";
import { GENRES } from "@/data/genres";

const { Sider, Content } = Layout;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  type GenreKey = keyof typeof GENRES;
  const GenreKeyList = Object.keys(GENRES) as GenreKey[];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
      >
        <div style={{ color: "white", padding: 16, fontWeight: 700 }}>
          BookShelf Picks
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: <Link href="/books">Home</Link>,
            },
            {
              key: "books",
              icon: <BookOutlined />,
              label: <Link href="/books">Books</Link>,
              children: GenreKeyList.map((key) => ({
                key: key,
                icon: GENRES[key].icon,
                label: <Link href={`/genre/${key}`}>{GENRES[key].title}</Link>,
              })),
            },
            {
              key: "users",
              icon: <TeamOutlined />,
              label: <Link href="/users">Users</Link>,
            },
            {
              key: "profile",
              icon: <UserOutlined />,
              label: <Link href="/profile">My Profile</Link>,
            },
          ]}
          defaultOpenKeys={["books"]}
        />
      </Sider>
      <Layout>
        <Topbar />
        <Content style={{ margin: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
