'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import generateRandomFlightData from '@/components/FakeFlightData';
import Header from '@/components/Header';
import PlaneList from '@/components/PlaneList';

// Dynamically load Map component
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export interface Flight {
  planeName: string;
  icao24: string;
  callsign: string;
  origin_country: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

const MyApp: React.FC = () => {
  const [useFakeData, setUseFakeData] = useState<boolean>(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedPlane, setSelectedPlane] = useState<Flight | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  const planeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement | null> }>({});

  // Initialize fake flight data and set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
    setFlights(generateRandomFlightData(80));
  }, []);

  // Scroll to the selected plane when it changes
  useEffect(() => {
    if (selectedPlane && planeRefs.current[selectedPlane.icao24]?.current) {
      planeRefs.current[selectedPlane.icao24]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedPlane]);

  if (!isClient) return null;

  return (
    <div className="flex flex-col h-screen font-primary bg-background text-foreground w-full">
      <Header />
      <h2 className="text-xl text-start ml-4 mt-4 p-2 uppercase font-primary">PLANES INFO</h2>
      <main className="flex-grow flex flex-col lg:flex-row w-full">
        {/* Sidebar for PlaneList (visible on large screens) */}
        <aside className="hidden lg:flex lg:w-1/2 bg-primary font-primary text-accent p-4 overflow-y-auto w-full">
          <PlaneList
            flights={flights}
            selectedPlane={selectedPlane}
            setSelectedPlane={setSelectedPlane}
            planeRefs={planeRefs}
          />
        </aside>

        {/* Responsive Map and PlaneList */}
        <section className="flex flex-col w-full lg:w-1/2">
          {/* PlaneList (horizontal scroll for small screens) */}
          <div className="lg:hidden overflow-x-auto p-4 bg-primary font-secondary text-accent w-full">
            <PlaneList
              flights={flights}
              selectedPlane={selectedPlane}
              setSelectedPlane={setSelectedPlane}
              planeRefs={planeRefs}
            />
          </div>

          {/* Map */}
          <div className="relative font-secondary flex-grow mt-0 h-[50vh] lg:h-full w-full">
            <Map
              flights={flights}
              selectedPlane={selectedPlane}
              setSelectedPlane={setSelectedPlane}
              setFlights={setFlights}
              useFakeData={useFakeData}
              setUseFakeData={setUseFakeData}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyApp;