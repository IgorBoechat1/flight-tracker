'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Flight } from '@/app/page'; // Adjust the import path as necessary
import L from 'leaflet';

interface Plane {
  icao24: string;
  planeName: string;
  callsign: string;
  latitude: number;
  longitude: number;
  origin_country: string;
  imageUrl: string;
}

export interface MapProps {
    flights: Flight[];
    selectedPlane: Flight | null;
    setSelectedPlane: React.Dispatch<React.SetStateAction<Flight | null>>;
    setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
    useFakeData: boolean;
    setUseFakeData: React.Dispatch<React.SetStateAction<boolean>>;  // Add this line
  }

const Map: React.FC<MapProps> = ({ flights, selectedPlane, setSelectedPlane, setFlights, useFakeData }) => {
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

  // Create airplane icon
  const createAirplaneIcon = () => {
    if (typeof window === 'undefined') return undefined; // Return undefined instead of null
    const randomRotation = Math.floor(Math.random() * 60); // Random angle for rotation
    return new L.DivIcon({
      className: 'airplane-icon',
      html: `<img src="/plane2.png" style="transform: rotate(${randomRotation}deg); width: 30px; height: 30px; drop-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);" />`,
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-8xl h-[900px] mt-96 bg-white shadow-lg rounded-md overflow-hidden">
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
            <Marker
              key={flight.icao24}
              position={[flight.latitude, flight.longitude]}
              icon={createAirplaneIcon()}
              eventHandlers={{
                click: () => {
                  setSelectedPlane(flight);
                },
              }}
            >
              <Popup>
                <div className="p-4 w-[300px] bg-grey-500 rounded-lg shadow-md text-center">
                  <img
                    src={flight.imageUrl}
                    alt={flight.callsign}
                    className="w-full h-40 object-cover mb-4 rounded-lg border"
                  />
                  <p className="font-bold text-xl text-grey-900 mb-2">PLANE: {flight.planeName}</p>
                  <div className="text-grey-900">
                    <p className="font-semibold">CALLSIGN:</p>
                    <p className="mb-4">{flight.callsign}</p>
                    <p className="font-semibold">ORIGIN COUNTRY:</p>
                    <p className="mb-4">{flight.origin_country}</p>
                    <p className="font-semibold">ICAO24:</p>
                    <p>{flight.icao24}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Plane details container (only renders when a plane is selected) */}
      {selectedPlane && (
        <div ref={detailsRef} className="plane-details-container mt-6 p-6 bg-white shadow-md rounded-lg w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-500">Details for {selectedPlane.planeName}</h2>
          <div className="text-lg text-gray-500">
            <p><strong>Callsign:</strong> {selectedPlane.callsign}</p>
            <p><strong>ICAO24:</strong> {selectedPlane.icao24}</p>
            <p><strong>Origin Country:</strong> {selectedPlane.origin_country}</p>
            <div className="mt-4">
              <img
                src={selectedPlane.imageUrl}
                alt={selectedPlane.planeName}
                className="w-full h-64 object-cover rounded-lg border"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
