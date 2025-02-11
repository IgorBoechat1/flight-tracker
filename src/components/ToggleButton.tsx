import * as React from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface ToggleButtonProps {
  useFakeData: boolean;
  setUseFakeData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ useFakeData, setUseFakeData }) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setUseFakeData((prev) => !prev);
    if (!useFakeData) {
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleToggle}
        sx={{
          mb: 2,
          mr: 2,
          width: '6rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.8rem',
          justifyContent: 'center',
          py: 1,
          mt: 1,
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert className="z-150" onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          API data is now disabled due to financial constraints. Enjoy the fake data instead!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToggleButton;