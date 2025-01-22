'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FlightContextType {
  selectedShip: any | null;
  setSelectedShip: React.Dispatch<React.SetStateAction<any | null>>;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

interface FlightProviderProps {
  children: ReactNode;
}

export const FlightProvider: React.FC<FlightProviderProps> = ({ children }) => {
  const [selectedShip, setSelectedShip] = useState<any | null>(null);

  return (
    <FlightContext.Provider value={{ selectedShip, setSelectedShip }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = (): FlightContextType => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useShipContext must be used within a ShipProvider");
  }
  return context;
};
