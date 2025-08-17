"use client";

import { SessionProvider } from "next-auth/react";
import { ConfigProvider, theme } from "antd";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: { colorPrimary: "#1677ff", borderRadius: 8 },
          }}
        >
          {children}
        </ConfigProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
