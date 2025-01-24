'use client';
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Flight } from '@/app/page';
import FlightMarker from './FlightMarker';


export interface MapProps {
  flights: Flight[];
  selectedPlane: Flight | null;
  setSelectedPlane: React.Dispatch<React.SetStateAction<Flight | null>>;
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
  useFakeData: boolean;
  setUseFakeData: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map: React.FC<MapProps> = ({
  flights,
  selectedPlane,
  setSelectedPlane,
}) => {
  const mapRef = useRef<any>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  // Scroll into view when selected plane changes
  useEffect(() => {
    if (selectedPlane && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedPlane]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-[-45vh] mb-0 bg-gray-100 p-4">
      <div className="w-full max-w-8xl h-screen  bg-white shadow-lg rounded-md overflow-hidden no-repeat">
        <MapContainer
          center={[39.5, -8.0]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWdvcmJvZWNoYXQiLCJhIjoiY202NWNkM213MWx1eDJqc2Z3ZjZkYnYyeCJ9.Pdvgs-1RAJzKkR5cJdDPBw"
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
          />
          {flights.map((flight) => (
            <FlightMarker
              key={flight.icao24}
              flight={flight}
              setSelectedPlane={setSelectedPlane}
            />
          ))}
        </MapContainer>
      </div>

      
    </div>
  );
};

export default Map;
