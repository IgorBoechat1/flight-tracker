import React, { RefObject } from 'react';
import { Flight } from '@/app/page';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface PlaneListProps {
  flights: Flight[];
  selectedPlane: Flight | null;
  setSelectedPlane: React.Dispatch<React.SetStateAction<Flight | null>>;
  planeRefs: React.MutableRefObject<{ [key: string]: RefObject<HTMLDivElement | null> }>;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const PlaneList: React.FC<PlaneListProps> = ({
  flights,
  selectedPlane,
  setSelectedPlane,
  planeRefs,
}) => {
  return (
    <Box component="section" className="w-full">
      {/* Desktop view */}
      <Box component="div" className="hidden lg:flex relative w-full flex-col space-y-4 h-screen overflow-y-auto p-4">
        {flights.map((flight) => (
          <Box component="div" className="w-full h-72" key={flight.icao24} ref={(planeRefs.current[flight.icao24] = React.createRef<HTMLDivElement>())}>
            <Card
              className={`p-2 w-full h-full rounded-lg shadow-md cursor-pointer transition border border-transparent hover:border-teal-500 ${
                selectedPlane?.icao24 === flight.icao24 ? 'border-teal-500' : ''
              }`}
              onClick={() => setSelectedPlane(flight)}
              sx={{ position: 'relative', overflow: 'hidden' }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={flight.imageUrl}
                alt={flight.planeName}
                className="w-full h-full object-cover rounded-md"
              />
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <Typography variant="body2" className="text-xs font-bold">
                  {flight.planeName}
                </Typography>
                <Typography variant="body2" className="text-xs">
                  Callsign: {flight.callsign}
                </Typography>
                <Typography variant="body2" className="text-xs">
                  Origin Country: {flight.origin_country}
                </Typography>
                <Typography variant="body2" className="text-xs">
                  ICAO24: {flight.icao24}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Mobile view */}
      <Box component="div" className="lg:hidden flex h-32 overflow-x-auto p-0 justify-center w-full">
        <Stack direction="row" spacing={2} className="flex-row mr-0 w-full">
          {flights.map((flight) => (
            <Item key={flight.icao24} className="flex-shrink-0 w-52 h-32">
              <Card
                ref={(planeRefs.current[flight.icao24] = React.createRef<HTMLDivElement>())}
                className={`p-0 w-full h-full rounded-lg shadow-md cursor-pointer transition border border-transparent hover:border-teal-500 ${
                  selectedPlane?.icao24 === flight.icao24 ? 'border-teal-500' : ''
                }`}
                onClick={() => setSelectedPlane(flight)}
                sx={{ position: 'relative', overflow: 'hidden' }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={flight.imageUrl}
                  alt={flight.planeName}
                  className="w-full h-full object-contain rounded-md"
                />
                <CardContent
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    fontFamily: 'aeroportal, sans-serif',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                >
                  <Typography variant="body2" className="text-24" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'semi-bold', color: 'white' }}>
                    {flight.planeName}
                  </Typography>
                  <Typography variant="body2" className="text-xs" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'semi-bold', color: 'white' }}>
                    Callsign: {flight.callsign}
                  </Typography>
                  <Typography variant="body2" className="text-xs font-primary" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'semi-bold', color: 'white' }}>
                    Origin Country: {flight.origin_country}
                  </Typography>
                  <Typography variant="body2" className="text-xs font-aeroportal" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'semi-bold', color: 'white' }}>
                    ICAO24: {flight.icao24}
                  </Typography>
                </CardContent>
              </Card>
            </Item>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default PlaneList;