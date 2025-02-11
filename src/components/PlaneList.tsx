import React, { RefObject } from 'react';
import { Flight } from '@/app/page';
import PlaneCard from './PlaneCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

interface PlaneListProps {
  flights: Flight[];
  selectedPlane: Flight | null;
  setSelectedPlane: React.Dispatch<React.SetStateAction<Flight | null>>;
  planeRefs: React.MutableRefObject<{ [key: string]: RefObject<HTMLDivElement | null> }>;
}

const PlaneList: React.FC<PlaneListProps> = ({
  flights,
  selectedPlane,
  setSelectedPlane,
  planeRefs,
}) => {
  return (
    <Box className="lg:block">
      {/* Desktop view */}
      <Box className="hidden relative lg:flex flex-col space-y-4 h-screen font-primary overflow-y-auto">
        {flights.map((flight) => (
          <Box
            key={flight.icao24}
            ref={(planeRefs.current[flight.icao24] = React.createRef<HTMLDivElement>())}
          >
            <PlaneCard
              flight={flight}
              isSelected={selectedPlane?.icao24 === flight.icao24}
              onSelect={setSelectedPlane}
              onExit={() => setSelectedPlane(null)}
            />
          </Box>
        ))}
      </Box>

      {/* Mobile view */}
      <Box className="lg:hidden flex absolute top-24 mb-0 left-0 h-screen right-0 bg-gray-800 text-white z-50 p-4 overflow-x-hidden">
        <Box className="flex lg:space-x-3 w-full">
          {flights.map((flight) => (
            <Card
              key={flight.icao24}
              ref={(planeRefs.current[flight.icao24] = React.createRef<HTMLDivElement>())}
              className={`bg-gray-700 p-2 mt-7 h-28 items-center rounded-lg shadow-md font-primary cursor-pointer w-full ${
                selectedPlane?.icao24 === flight.icao24 ? 'border border-teal-500' : ''
              }`}
              onClick={() => setSelectedPlane(flight)}
            >
              <CardMedia
                component="img"
                height="140"
                image={flight.imageUrl}
                alt={flight.planeName}
                className="w-full h-full object-cover rounded-md"
              />
              <CardContent>
                <Typography variant="body2" className="text-xs mt-2 font-primary" sx={{ fontWeight: 'bold', color: 'black' }}>{flight.planeName}</Typography>
                <Typography variant="body2" className="text-xs font-primary" sx={{ fontWeight: 'semi-bold', color: 'black' }}>Callsign: {flight.callsign}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PlaneList;