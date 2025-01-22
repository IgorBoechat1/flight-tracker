'use client';

import './globals.css';
import { ReactNode } from 'react';
import { FlightProvider } from '@/components/context/FlightContext';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <FlightProvider>{children}</FlightProvider>
      </body>
    </html>
  );
};

export default RootLayout;
