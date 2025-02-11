import React, { useState } from 'react';
import ToggleButton from "@/components/ToggleButton";

const Header: React.FC = () => {
    const [useFakeData, setUseFakeData] = useState(false);

    return (
        <header className="bg-primary items-center flex justify-around min-w-full h-32 text-accent p-2 z-50" style={{ backgroundColor: '#101820' }}>
            <div className="relative flex flex-row justify-around w-full items-center">
            <h1 className="text-4xl font-bold uppercase font-secondary ml-2">Flight Tracker</h1>
            <div className="mr-[-60px] ">
            <ToggleButton  useFakeData={useFakeData} setUseFakeData={setUseFakeData} />
            </div>
            </div>
        </header>
    );
};

export default Header;