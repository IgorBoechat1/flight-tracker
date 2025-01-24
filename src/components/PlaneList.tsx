import React, { RefObject } from 'react';
import { Flight } from '@/app/page';
import PlaneCard from './PlaneCard';

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
    <div className="lg:block">
      {/* Desktop view */}
      <div className="hidden relative lg:flex flex-col space-y-4 h-[calc(100vh-6rem)] overflow-y-auto <-50">
        {flights.map((flight) => (
          <div
            key={flight.icao24}
            ref={(planeRefs.current[flight.icao24] = React.createRef<HTMLDivElement>())}
          >
            <PlaneCard
              flight={flight}
              isSelected={selectedPlane?.icao24 === flight.icao24}
              onSelect={setSelectedPlane}
              onExit={() => setSelectedPlane(null)}
            />
          </div>
        ))}
      </div>

      {/* Mobile view */}
        <h2 className="text-xl font-bold text-center mb-4">Planes Info</h2>
      <div className="lg:hidden flex absolute top-24 mb-0 left-0 h-56 right-0 bg-gray-800 text-white z-50 p-4 overflow-x-auto">
        <div className="flex lg:gispace-x-3">
          {flights.map((flight) => (
            <div
              key={flight.icao24}
              ref={(planeRefs.current[flight.icao24] = React.createRef<HTMLDivElement>())}
              
              className={`bg-gray-700 p-2 mt-7 h-28 itens-center rounded-lg shadow-md cursor-pointer w-48 ${
                selectedPlane?.icao24 === flight.icao24 ? 'border border-teal-500' : ''
              }`}
              onClick={() => setSelectedPlane(flight)}
            >
              <img
                src={flight.imageUrl}
                alt={flight.planeName}
                className="w-full h-full object-cover rounded-md"
              />
              <h3 className="text-xs mt-2">{flight.planeName}</h3>
              <p className="text-xs">Callsign: {flight.callsign}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaneList;
