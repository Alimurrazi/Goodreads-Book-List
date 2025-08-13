'use client';

import { Card, Button, Typography, Space } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card title="Welcome to BookShelf" style={{ width: 360 }}>
        <Typography.Paragraph>Sign in to continue</Typography.Paragraph>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" icon={<GoogleOutlined />} onClick={() => signIn('google')}>
            Sign in with Google
          </Button>
        </Space>
      </Card>
    </div>
  );
}
