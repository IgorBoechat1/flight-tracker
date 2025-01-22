'use client';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import generateRandomFlightData, { Flight } from './FakeFlightData';

// Dynamically load react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

// Custom airplane icon with random rotation
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

const Map = () => {
  const [flights, setFlights] = useState<Flight[]>([]); // Store active flights
  const [useFakeData, setUseFakeData] = useState<boolean>(true); // Toggle between fake or real flight data
  const [error, setError] = useState<string>(''); // Store any error message
  const mapRef = useRef<any>(null); // Reference to the map instance
  const flightTimers = useRef<Map<string, NodeJS.Timeout>>(new globalThis.Map()); // Keep track of flight timers
  const username = 'igorboechat';
  const password = 'K8Zmu2EizbuvY4@';

  // Simulate movement for each flight, moving them along a random path
  const movePlane = (flight: Flight): Flight => {
    const randomDirection = Math.random() * Math.PI * 2; // Random direction in radians
    const moveDistance = Math.random() * 0.01; // Smoother, smaller movement

    const newLatitude = flight.latitude + Math.sin(randomDirection) * moveDistance;
    const newLongitude = flight.longitude + Math.cos(randomDirection) * moveDistance;

    return { ...flight, latitude: newLatitude, longitude: newLongitude };
  };

  // Update position of all active flights
  const updateFlightsPosition = () => {
    setFlights((prevFlights) => prevFlights.map((flight) => movePlane(flight)));
  };

  // Generate a random flight trace starting from a random location
  const generateRandomTraceRoute = () => {
    const startingPoint = {
      latitude: 40 + Math.random() * 40, // Random latitude between 40°N and 80°N
      longitude: -60 + Math.random() * 120, // Random longitude between -60°W and 60°E
    };

    const flightTrace: Flight[] = [];
    let currentLocation = startingPoint;
    const numberOfSteps = 500; // Number of steps in the flight trace

    for (let i = 0; i < numberOfSteps; i++) {
      flightTrace.push({
        planeName: `Flight-${i + 1}`,
        icao24: `${Math.floor(Math.random() * 1000000)}`,
        callsign: `CALLSIGN${i + 1}`,
        origin_country: 'Unknown Country',
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        imageUrl: '', // Placeholder image URL
      });

      // Simulate slight movement in the flight trace
      const randomDirection = Math.random() * Math.PI * 2;
      const moveDistance = Math.random() * 5.1;

      currentLocation = {
        latitude: currentLocation.latitude + Math.sin(randomDirection) * moveDistance,
        longitude: currentLocation.longitude + Math.cos(randomDirection) * moveDistance,
      };
    }

    return flightTrace;
  };

  // Refresh the flight data based on the current settings (fake or real)
  const refreshFlights = () => {
    const map = mapRef.current;
    if (!map) return;

    const bounds = map.getBounds();
    if (useFakeData) {
      const traceRoute = generateRandomTraceRoute(); // Generate random flight trace
      setFlights(traceRoute.filter((flight) => bounds.contains([flight.latitude, flight.longitude])));
    } else {
      // Fetch real-time flight data from API
      const fetchFlights = async () => {
        const apiUrl = 'https://opensky-network.org/api/states/all';
        const authHeader = 'Basic ' + btoa(`${username}:${password}`);

        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              Authorization: authHeader,
            },
          });

          if (!response.ok) {
            if (response.status === 429) {
              const retryAfter = response.headers.get('X-Rate-Limit-Retry-After-Seconds') || 'unknown';
              setError(`Rate limit exceeded. Try again after ${retryAfter} seconds.`);
            } else {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return;
          }

          const data: { states?: any[][] } = await response.json();
          const flightData: Flight[] =
            data.states?.map((state) => ({
              planeName: state[3],
              icao24: state[0],
              callsign: state[1] || 'Unknown',
              origin_country: state[2],
              latitude: state[6] || 0,
              longitude: state[5] || 0,
              imageUrl: 'https://www.airteamimages.com/boeing-787_d2-teq_taag-angola-airlines_471955',
            })) || [];

          const visibleFlights = flightData.filter((flight) =>
            bounds.contains([flight.latitude, flight.longitude])
          );
          setFlights(visibleFlights);
          setError('');
        } catch (err) {
          if (err instanceof Error) {
            setError(`Error fetching data: ${err.message}`);
          } else {
            setError('An unknown error occurred.');
          }
        }
      };

      fetchFlights();
    }
  };

  // Set up periodic refresh of flight data and position updates
  useEffect(() => {
    // Set initial flight data on component mount
    const initialFlights = generateRandomFlightData(10); // Generate 10 initial flights
    setFlights(initialFlights); // Set the initial flight data
  }, []);

  // Update flights every time useFakeData changes
  useEffect(() => {
    if (useFakeData) {
      // Generate random flight data when toggling to fake data
      const fakeFlights = generateRandomFlightData(30);
      setFlights(fakeFlights); // Update the flights state with generated data
    } else {
      // Fetch real-time flight data when toggling to real data
      refreshFlights();
    }
  }, [useFakeData]);

  // Set up periodic position updates for flights every 5 seconds
  useEffect(() => {
    const positionUpdateInterval = setInterval(updateFlightsPosition, 5000);
    return () => clearInterval(positionUpdateInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <button
        onClick={() => setUseFakeData((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
      >
        {useFakeData ? 'Switch to API Data' : 'Use Fake Data'}
      </button>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="w-full max-w-8xl h-[900px] bg-white shadow-lg rounded-md overflow-hidden">
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
          {flights.map((flight) => {
            const { planeName, icao24, callsign, origin_country, latitude, longitude, imageUrl } = flight;
            return (
              <Marker key={icao24} position={[latitude, longitude]} icon={createAirplaneIcon()}>
                <Popup>
                  <div className="p-4 w-[300px] bg-grey-500 rounded-lg shadow-md text-center">
                    <img
                      src={imageUrl}
                      alt={callsign}
                      className="w-full h-40 object-cover mb-4 rounded-lg border"
                    />
                    <p className="font-bold text-xl text-grey-900 mb-2">PLANE: {planeName}</p>
                    <div className="text-grey-900">
                      <p className="font-semibold">CALLSIGN:</p>
                      <p className="mb-4">{callsign}</p>
                      <p className="font-semibold">ORIGIN COUNTRY:</p>
                      <p className="mb-4">{origin_country}</p>
                      <p className="font-semibold">ICAO24:</p>
                      <p>{icao24}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
