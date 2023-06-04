import React, { useEffect, useState } from 'react';
import { SVGIcon } from './SVGIcon';

export default function LogoCloud() {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        // Clean up function
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []); // Empty dependency array means this effect runs once, on mount.

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

    return (
        <div className="flex-column mx-auto pt-12 md:pt-12 md:pr-10 pb-12 -mt-16 md:pt-8">
            { windowWidth !== null ?
                (windowWidth <= 768 ?
                    <img src="/logowallmobile.jpg"
                         className="pt-10"
                         alt="Logo Cloud" /> :
                    rows.map((row, i) => (
                        <div key={ i } className={ `flex justify-center ${ row.length === 7 ? 'w-full' : 'w-11/12 mx-auto' }` }>
                            { row.map((name, j) => (
                                <div key={ j } className={ `w-full sm:w-1/${ row.length }` }>
                                    <SVGIcon name={ name } />
                                </div>
                            )) }
                        </div>
                    ))) : null }
        </div>
    );
}
