import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import { Flight } from '@/app/page';

interface PlaneCardProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: (flight: Flight) => void;
  onExit: (flight: Flight) => void;
}

const PlaneCard: React.FC<PlaneCardProps> = ({ flight, isSelected, onSelect, onExit }) => (
  <Card sx={{ maxWidth: 345, border: isSelected ? '2px solid var(--primary)' : 'none' }}>
    <CardActionArea onClick={() => onSelect(flight)}>
      <CardMedia
        component="img"
        height="140"
        image={flight.imageUrl}
        alt={flight.planeName}
      />
      <CardContent className="font-primary">
        <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'bold', color: 'black' }}>
          {flight.planeName}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'semi-bold', color: 'black' }}>
          Callsign: {flight.callsign}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'aeroportal, sans-serif', fontWeight: 'semi-bold', color: 'black' }}>
          Origin Country: {flight.origin_country}
        </Typography>
      </CardContent>
    </CardActionArea>
    <IconButton
      sx={{ position: 'absolute', top: 8, right: 8 }}
      onClick={(e) => {
        e.stopPropagation();
        onExit(flight);
      }}
    >
      
    </IconButton>
  </Card>
);

export default PlaneCard;