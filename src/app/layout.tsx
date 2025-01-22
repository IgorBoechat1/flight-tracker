// RootLayout.tsx
'use client';

import './globals.css'; // Ensure this imports your custom font and global styles
import { ReactNode } from 'react';
import { FlightProvider } from '@/components/context/FlightContext';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="/fonts/ArgentumSans-Bold.ttf" // Example if hosted externally
          rel="stylesheet"
        />
      </head>
      <body className="font-argentum-sans bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
};

export default RootLayout;
