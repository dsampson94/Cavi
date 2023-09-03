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

    const brands = {
        'Amouage': 'https://www.amouage.com/',
        'Bulgari': 'https://www.bulgari.com/',
        'Chanel': 'https://www.chanel.com/',
        'Chopard': 'https://www.chopard.com/',
        'Clear': 'https://www.clearhaircare.com/',
        'Coach': 'https://www.coach.com/',
        'Dermalogica': 'https://www.dermalogica.com/',
        'Dolce': 'https://www.dolcegabbana.com/',
        'Elemis': 'https://www.elemis.com/',
        'Elie': 'https://www.eliesaab.com/',
        'Ellis': 'https://www.ellisfaas.com/',
        'Floral': 'https://www.floralstreet.com/',
        'Guerlain': 'https://www.guerlain.com/',
        'Hermes': 'https://www.hermes.com/',
        'Issey': 'https://www.isseymiyake.com/',
        'Jorgobe': 'https://jorgobeshop.com/',
        'Jack': 'https://jackperfume.co.uk/',
        'Prairie': 'https://www.laprairie.com/',
        'Memo': 'https://www.memofragrances.com/',
        'Narciso': 'https://www.narcisorodriguez.com/',
        'Van': 'https://www.vancleefarpels.com/',
        'Nesti': 'https://nestidante.com/',
        'Phillip': 'https://www.philipp plein.com/',
        'Sensai': 'https://www.sensai-cosmetics.com/',
        'Tommy': 'https://usa.tommy.com/',
        'Zadig': 'https://www.zadig-et-voltaire.com/'
    };

    const names = Object.keys(brands);
    const rows = [
        names.slice(0, 7),
        names.slice(7, 13),
        names.slice(13, 20),
        names.slice(20, 26)
    ];

    const centerStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={ {
            display: 'flex',
            flexDirection: 'column',
            padding: '6vh 10px 0 10px'
        } }>

            <h1 className="md:pt-64 pt-0 text-2xl text-center tracking-wide">Our Brands</h1>

            <div style={ centerStyles }>

                <div className="flex-column ">
                    { windowWidth !== null ? (
                        windowWidth <= 768 ? (
                            <img src="/logowallmobile.jpg" className="flex pt-6 mb-6" alt="Logo Cloud" />
                        ) : (
                            <div className="flex flex-wrap justify-center">
                                { rows.map((row, i) => (
                                    <div
                                        key={ i }
                                        className={ `flex justify-center ${
                                            row.length === 7 ? 'w-full' : 'w-11/12'
                                        }` }
                                    >
                                        { row.map(name => (
                                            <a href={ brands[name] } target="_blank" rel="noreferrer">
                                                <SVGIcon name={ name } />
                                            </a>
                                        )) }
                                    </div>
                                )) }
                            </div>
                        )
                    ) : null }
                </div>
            </div>
        </div>
    );
}
