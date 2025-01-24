import React, { useState } from 'react';
import ToggleButton from "@/components/ToggleButton";

const Header: React.FC = () => {
    const [useFakeData, setUseFakeData] = useState(false);

    return (
        <header className="bg-sky-800 items-center flex justify-between min-w-full min-h-24 text-white p-4">
            <h1 className="text-3xl text-bold uppercase font-semibold ml-4 font-primary ">Flight Tracker</h1>
            <ToggleButton useFakeData={useFakeData} setUseFakeData={setUseFakeData} />
        </header>
    );
};

export default Header;