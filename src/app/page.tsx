'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import generateRandomFlightData from '@/components/FakeFlightData';
import Header from '@/components/Header';
import ToggleButton from '@/components/ToggleButton';
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
    setFlights(generateRandomFlightData(20));
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
    <div className="flex flex-col h-screen">
      <Header />
      <h2 className="text-xl text-center font-bold mb-4">PLANES INFO</h2>
      <ToggleButton useFakeData={useFakeData} setUseFakeData={setUseFakeData} />
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* Sidebar for PlaneList (visible on large screens) */}
        <aside className="hidden lg:block lg:w-1/3 bg-gray-800 text-white p-4 overflow-y-auto">
          <PlaneList
            flights={flights}
            selectedPlane={selectedPlane}
            setSelectedPlane={setSelectedPlane}
            planeRefs={planeRefs}
          />
        </aside>

        {/* Responsive Map and PlaneList */}
        <section className="flex flex-col w-full lg:w-2/3">
          {/* PlaneList (horizontal scroll for small screens) */}
          <div className="lg:hidden overflow-x-auto whitespace-nowrap p-4 bg-gray-800 text-white">
            <PlaneList
              flights={flights}
              selectedPlane={selectedPlane}
              setSelectedPlane={setSelectedPlane}
              planeRefs={planeRefs}
            />
          </div>

          {/* Map */}
          <div className="relative flex-grow h-[50vh] lg:h-full">
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
