'use client';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import generateRandomFlightData from '@/components/FakeFlightData'; // Adjust the import path as necessary

// Dynamically load Map component
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

// Flight interface for type safety
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

  // Use a dictionary of refs (React.RefObject<HTMLDivElement | null>)
  const planeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement | null> }>({});

  const flightsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);

    if (!useFakeData) {
      const fetchFlights = async () => {
        try {
          // Replace 'YOUR_API_ENDPOINT' with your actual API URL
          const response = await fetch("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWdvcmJvZWNoYXQiLCJhIjoiY202NWNkM213MWx1eDJqc2Z3ZjZkYnYyeCJ9.Pdvgs-1RAJzKkR5cJdDPBw"
          );
          if (!response.ok) {
            throw new Error('API IS WITH THE KEY DISABLED FOR TIME');
          }
          const data: Flight[] = await response.json();
          setFlights(data); // Populate with real data from the API
        } catch (error) {
          console.error('Error fetching flight data:', error);
          // Optionally, you can fallback to fake data if the API call fails
          setFlights(generateRandomFlightData(20)); // Use fake data as fallback
        }
      };

      fetchFlights();
    } else {
      // Initialize fake flight data when `useFakeData` is true
      setFlights(generateRandomFlightData(20));
    }
  }, [useFakeData]); // Run whenever `useFakeData` changes

  useEffect(() => {
    if (selectedPlane && planeRefs.current[selectedPlane.icao24]?.current) {
      // Scroll the respective plane into view when it's selected
      planeRefs.current[selectedPlane.icao24]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [selectedPlane]);

  if (!isClient) {
    return null; // Only render after client-side
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-[#9B1B30] text-white text-2xl font-bold p-4 text-center">
        <h1>Flight Tracker</h1>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col lg:flex-row text-4">
        {/* Map Section */}
        <section className="relative w-full lg:flex-grow h-[30vh] lg:h-full">
          <aside className="lg:hidden h-64 w-full absolute mt-0 overflow-x-auto bg-gray-800 text-white p-2 z-50">
            <button
              onClick={() => setUseFakeData((prev) => !prev)}
              className="mb-4 w-full items-center px-4 py-2  bg-gray-600 text-white rounded-md shadow-md hover:bg-red-700"
            >
              {useFakeData ? 'Switch to API Data' : 'Use Fake Data'}
            </button>
            <h2 className="text-xl text-center font-bold mb-6">PLANES INFO</h2>
            {/* Create a scrollable container for the flight list */}
            <div className="flex space-x-3 bg-gray-400 h-16  w-[38px] text-8">
              {flights.map((flight) => (
                <div
                  key={flight.icao24}
                  ref={planeRefs.current[flight.icao24] = React.createRef<HTMLDivElement>()}
                  className={`bg-gray-700 p-2 h-24 rounded-lg shadow-md cursor-pointer w-[72px] ${
                    selectedPlane?.icao24 === flight.icao24 ? 'border border-teal-500' : ''
                  }`}
                  onClick={() => setSelectedPlane(flight)}
                >
                  <img
                    src={flight.imageUrl}
                    alt={flight.planeName}
                    className="w-full h-full object-cover rounded-md mb-4"
                  />
                  <h3 className="text-[8px]">{flight.planeName}</h3>
                  <p className='text-[6px]'>Callsign: {flight.callsign}</p>
                  <p className='text-[6px]'>Origin Country: {flight.origin_country}</p>
                </div>
              ))}
            </div>
          </aside>
          <div className="relative mt-56 right-0 h-1 bg-red-500">
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

        {/* Sidebar (Desktop) */}
        <aside
          ref={flightsContainerRef}
          className="hidden lg:block w-96 h-screen overflow-y-auto bg-gray-800 text-white p-6"
        >
          <button
            onClick={() => setUseFakeData((prev) => !prev)}
            className="mb-4 w-full items-center px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-red-700"
          >
            {useFakeData ? 'Switch to API Data' : 'Use Fake Data'}
          </button>
          <h2 className="text-xl text-center font-bold mb-2">PLANES INFO</h2>
          {/* Ensure the container does not scroll */}
          <div className="flex flex-col space-y-4 h-[calc(100vh-6rem)] overflow-y-auto">
            {/* Adjusted height of the flight list container */}
            {flights.map((flight) => (
              <div
                key={flight.icao24}
                ref={planeRefs.current[flight.icao24] = React.createRef<HTMLDivElement>()}
                className={`bg-gray-700 p-2 rounded-lg shadow-md cursor-pointer w-full ${
                  selectedPlane?.icao24 === flight.icao24 ? 'border border-teal-500' : ''
                }`}
                onClick={() => setSelectedPlane(flight)}
              >
                <img
                  src={flight.imageUrl}
                  alt={flight.planeName}
                  className="w-full h-30 object-cover rounded-md mb-0"
                />
                <h3 className="font-8 font-semibold">{flight.planeName}</h3>
                <p className='text-4'>Callsign: {flight.callsign}</p>
                <p className='text-4'>Origin Country: {flight.origin_country}</p>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 Igor's Flight Tracker</p>
      </footer>
    </div>
  );
};

export default MyApp;
