import * as React from 'react';
import Button from '@mui/material/Button';

interface ToggleButtonProps {
  useFakeData: boolean;
  setUseFakeData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ useFakeData, setUseFakeData }) => (
  <Button
    variant="contained"
    onClick={() => setUseFakeData((prev) => !prev)}
    sx={{
      mb: 2,
      mr: 8,
      width: '12rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 2,
      mt: 2,
      fontFamily: 'aeroportal, sans-serif',
      borderRadius: '8px',
      border: '2px solid white',
      backgroundColor: useFakeData ? 'white' : 'transparent',
      color: useFakeData ? 'green' : 'white',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        backgroundColor: 'white',
        color: 'green',
      },
    }}
  >
    {useFakeData ? 'Use Fake Data' : 'Switch to API Data'}
  </Button>
);

export default ToggleButton;