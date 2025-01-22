'use client';
import dynamic from 'next/dynamic';
import { FlightProvider } from '@/components/context/FlightContext';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

function MyApp({ Component, pageProps }: any) {
  return (
    <FlightProvider>
      <Map /> {/* Display the Map component */}
    </FlightProvider>
  );
}

export default MyApp;
