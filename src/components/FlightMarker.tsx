import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Flight } from '@/app/page';

interface FlightMarkerProps {
  flight: Flight;
  setSelectedPlane: React.Dispatch<React.SetStateAction<Flight | null>>;
}

const createAirplaneIcon = () => {
  const randomRotation = Math.floor(Math.random() * 60);
  return new L.DivIcon({
    className: 'airplane-icon',
    html: `<img src="/plane2.png" style="transform: rotate(${randomRotation}deg); width: 30px; height: 30px; drop-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);" />`,
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const FlightMarker: React.FC<FlightMarkerProps> = ({ flight, setSelectedPlane }) => (
  <Marker
    key={flight.icao24}
    position={[flight.latitude, flight.longitude]}
    icon={createAirplaneIcon()}
    eventHandlers={{
      click: () => setSelectedPlane(flight),
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
);

export default FlightMarker;
