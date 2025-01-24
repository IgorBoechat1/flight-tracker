import React from 'react';
import { Flight } from '@/app/page';

interface PlaneCardProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: (flight: Flight) => void;
  onExit: (flight: Flight) => void; // New prop for handling the exit button
}

const PlaneCard: React.FC<PlaneCardProps> = ({ flight, isSelected, onSelect, onExit }) => (
  <section>
    <div
      className={`bg-gray-700 p-2 rounded-lg shadow-md cursor-pointer w-full ${
        isSelected ? 'border border-teal-500' : ''
      }`}
      onClick={() => onSelect(flight)}
    >
      <button
        className="absolute top-2 right-2 bg-gray-500 font-primary text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the card's onClick from being triggered
          onExit(flight);
        }}
      >
        X
      </button>
      <img
        src={flight.imageUrl}
        alt={flight.planeName}
        className="w-full h-15 object-cover rounded-md mb-0 hover:scale-200 transition-transform duration-300 ease-in-out"
      />
      <h3 className="font-8 font-semibold">{flight.planeName}</h3>
      <p className="text-4">Callsign: {flight.callsign}</p>
      <p className="text-4">Origin Country: {flight.origin_country}</p>
    </div>
  </section>
);

export default PlaneCard;
