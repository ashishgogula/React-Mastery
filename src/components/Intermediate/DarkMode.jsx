import React from 'react';
import Nav from '../Nav';

const DarkMode = () => {
    return (
        <>
            <Nav />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
                <h1 className="text-3xl font-bold mb-4">Dark Mode Challenge</h1>
                <p className="text-lg">This is a placeholder for the Dark Mode challenge.</p>
            </div>
        </>
    );
};

export default DarkMode;
