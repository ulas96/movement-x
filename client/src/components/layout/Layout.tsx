import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 min-h-screen border-x border-gray-700">
          <Header />
          <div className="px-4 py-0">{children}</div>
        </main>
        <div className="w-80 hidden xl:block"></div>
      </div>
    </div>
  );
}
