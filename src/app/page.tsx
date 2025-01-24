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

  useEffect(() => {
    setIsClient(true);
    setFlights(generateRandomFlightData(20)); // Initialize with fake data
  }, []);

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
          <h2 className="text-xl  text-center font-bold mb-4">PLANES INFO</h2>
      <main className="flex-grow flex flex-col mb-0 lg:flex-row">
        <aside className="lg:hidden w-96 h-screen bg-gray-800 text-white p-6">
          <ToggleButton useFakeData={useFakeData} setUseFakeData={setUseFakeData} />
          <PlaneList
      flights={flights}
      selectedPlane={selectedPlane}
      setSelectedPlane={setSelectedPlane}
      planeRefs={planeRefs}
      
    />
  </aside>
  {/* Mobile PlaneList */}
  <PlaneList
    flights={flights}
    selectedPlane={selectedPlane}
    setSelectedPlane={setSelectedPlane}
    planeRefs={planeRefs}
    
  />
        <section className="relative flex-col lg:flex-row w-full lg:flex-grow h-[30vh] mt-[-50vh] lg:mt-[50vh]">
          <Map
            flights={flights}
            selectedPlane={selectedPlane}
            setSelectedPlane={setSelectedPlane}
            setFlights={setFlights}
            useFakeData={useFakeData}
            setUseFakeData={setUseFakeData}
            />
        </section>
            </main>

    </div>
  );
};

export default MyApp;
