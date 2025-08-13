'use client';

import { SessionProvider } from "next-auth/react";
import { ConfigProvider, theme } from "antd";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: { colorPrimary: '#1677ff', borderRadius: 8 },
        }}
      >
        {children}
      </ConfigProvider>
    </SessionProvider>
  );
}
