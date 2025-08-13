'use client';

import React from 'react';
import { Typography, Space } from 'antd';
import { ReactNode } from 'react';

export default function GenreHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <Space align="center" size={12} style={{ marginBottom: 16 }}>
      <span style={{ fontSize: 28, display: 'inline-flex' }}>{icon}</span>
      <div>
        <Typography.Title style={{ margin: 0, fontWeight: 900 }}>{title}</Typography.Title>
        {subtitle && (
          <Typography.Text type="secondary" style={{ fontSize: 14 }}>
            {subtitle}
          </Typography.Text>
        )}
      </div>
    </Space>
  );
}