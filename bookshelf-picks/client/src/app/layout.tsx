import type { Metadata } from 'next';
import './globals.css';
import AntdRegistry from './antd-registry';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Next + Ant Design Boilerplate',
  description: 'A minimal Next.js + Ant Design + NextAuth setup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Providers>
            {children}
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
