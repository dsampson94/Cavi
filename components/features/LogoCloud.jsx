import React, { useEffect, useState } from 'react';
import { SVGIcon } from './SVGIcon';

export default function LogoCloud() {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        // Initial width
        setWindowWidth(window.innerWidth);

        // Clean up function
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const names = [
        'Amouage', 'Bulgari', 'Chanel', 'Chopard', 'Clear', 'Coach', 'Dermalogica',
        'Dolce', 'Elemis', 'Elie', 'Ellis', 'Floral', 'Guerlain',
        'Hermes', 'Issey', 'Jorgobe', 'Jack', 'Prairie', 'Memo', 'Narciso',
        'Van', 'Nesti', 'Phillip', 'Sensai', 'Tommy', 'Zadig'
    ];

    const rows = [
        names.slice(0, 7),
        names.slice(7, 13),
        names.slice(13, 20),
        names.slice(20, 26)
    ];

    const centerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0 10px'
    };

    return (
        <div style={ centerStyles }>
            <div className="flex-column md:pt-12 pb-6 md:pb-0 mt-2 md:-mt-12 md:pt-8">
                { windowWidth !== null ? (
                    windowWidth <= 768 ? (
                        <img src="/logowallmobile.jpg" className="" alt="Logo Cloud" />
                    ) : (
                        <div className="flex flex-wrap justify-center">
                            { rows.map((row, i) => (
                                <div
                                    key={ i }
                                    className={ `flex justify-center ${
                                        row.length === 7 ? 'w-full' : 'w-11/12'
                                    }` }
                                >
                                    { row.map((name, j) => (
                                        <SVGIcon name={ name } />
                                    )) }
                                </div>
                            )) }
                        </div>
                    )
                ) : null }
            </div>
        </div>
    );
}
