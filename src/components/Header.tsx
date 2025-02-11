import React, { useState } from 'react';
import ToggleButton from "@/components/ToggleButton";

const Header: React.FC = () => {
    const [useFakeData, setUseFakeData] = useState(false);

    return (
        <header className="bg-primary items-center flex  justify-between min-w-full min-h-24 text-accent p-4 z-50" style={{ backgroundColor: '#101820' }}>
            <h1 className="text-3xl font-bold uppercase font-secondary ml-4">Flight Tracker</h1>
            <ToggleButton useFakeData={useFakeData} setUseFakeData={setUseFakeData} />
        </header>
    );
};

export default Header;