import React, { useState, useEffect } from 'react';

const TopBar = () => {
    const [activeHeader, setActiveHeader] = useState(1);
    const headers = ['Home', 'About', 'Contact', 'Contact'];
    useEffect(() => {
        const handleScroll = () => {
            let currentPosition = window.pageYOffset;
            headers.forEach((header, index) => {
                const headerElement = document.getElementById(`header-${index}`);
                if (headerElement) {
                    const headerPosition = headerElement.offsetTop;
                    if (currentPosition >= headerPosition - 50) {
                        setActiveHeader(index);
                    }
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gray-900 top-0 w-full">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <div className="w-1/4">
                    <img className="w-20" src="path/to/logo" alt="company logo" />
                </div>
                <nav className="w-1/2">
                    <ul className="flex items-center justify-center text-sm text-white">
                        {headers.map((header, index) => (
                            <li key={index} id={`header-${index}`} className={`mx-4 ${activeHeader === index ? 'font-medium' : ''}`}>
                                <a className={`text-white hover:text-gray-300 ${activeHeader === index ? 'underline' : ''}`}>
                                    {header}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="w-1/4 flex items-center justify-end">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">Contact</button>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
