import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Flight } from '@/app/page';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

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
      <Paper elevation={3} sx={{ p: 2, width: 250, textAlign: 'center', backgroundColor: 'var(--background)', color: 'white' }}>
        <Box sx={{ mb: 2 }}>
          <img
            src={flight.imageUrl}
            alt={flight.callsign}
            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </Box>
        <Typography variant="h6" component="div" className="font-primary" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'bold', mb: 1, color: 'white' }}>
          {flight.planeName}
        </Typography>
        <Box>
          <Typography variant="body2" component="p" className="font-primary" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'bold', color: 'white' }}>
            CALLSIGN:
          </Typography>
          <Typography variant="body2" component="p" className="font-primary" sx={{ fontFamily: 'aeroportal, sans-serif', mb: 2, color: 'white' }}>
            {flight.callsign}
          </Typography>
          <Typography variant="body2" component="p" className="font-primary" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'bold', color: 'white' }}>
            ORIGIN COUNTRY:
          </Typography>
          <Typography variant="body2" component="p" className="font-primary" sx={{ fontFamily: 'aeroportal, sans-serif', mb: 2, color: 'white' }}>
            {flight.origin_country}
          </Typography>
          <Typography variant="body2" component="p" className="font-primary" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'bold', color: 'white' }}>
            ICAO24:
          </Typography>
          <Typography variant="body2" component="p" className="font-primary" sx={{ fontFamily: 'aeroportal, sans-serif', color: 'white' }}>
            {flight.icao24}
          </Typography>
        </Box>
      </Paper>
    </Popup>
  </Marker>
);

export default FlightMarker;