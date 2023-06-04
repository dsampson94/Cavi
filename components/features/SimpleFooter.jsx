import React from 'react';
import { socials } from './NavbarLeft';
import Contact from './Contact';
import Map from './map';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

const SimpleFooter = ({ showMenu, setShowMenu }) => {

    const toggleMenu = (index) => {
        if (showMenu === index) setShowMenu(null);
        else setShowMenu(index);
    };

    return (
        <div className="relative flex justify-between px-3 py-2 bg-gray-800 text-white">
            <div className="relative flex space-x-2">
                { contacts.map((item, index) => (
                    <div key={ item.name }>
                        <button onClick={ () => toggleMenu(index) }
                                className="text-gray-400 hover:text-gray-500">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        { showMenu === index && (
                            <div className="absolute bottom-0 left-0">
                                { item.menu }
                            </div>
                        ) }
                    </div>
                )) }
            </div>
            <div className="flex space-x-2">
                { socials.map((item) => (
                    <a key={ item.name } href={ item.href } className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">{ item.name }</span>
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                )) }
            </div>
        </div>
    );
};

export default SimpleFooter;

const MapsMenu = () => (
    <div className="absolute bottom-full w-[380px] md:w-[500px] bg-white pr-4 rounded-xl shadow-2xl mb-14 -translate-x-1 overflow-hidden">

        <div className="flex-row pt-4">

            <h2 className="text-lg font-bold text-gray-500 ml-11 sm:text-2xl sm:tracking-tight">JOHANNESBURG CAVI CAMPUS</h2>
            <div className="ml-3 text-base flex text-gray-500">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <MapPinIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=CAVI Brands+Oakhurst Building, 11-13 Saint Andrew Road, Parktown, Johannesburg, 2193"
                           target="_blank" className="text-xs font-bold">11-13 St Andrews Road, Parktown, 2193, Johannesburg, Gauteng,
                            South Africa</a><br />
                    </div>
                </div>
            </div>

            <Map lat={ -26.18239629277934 }
                 lon={ 28.03498248465847 }
                 location={ 'JHB' } />
        </div>

        <div className="flex-row">

            <h2 className="text-xl font-bold text-gray-500 ml-11 sm:text-2xl sm:tracking-tight">CAPE TOWN CAVI CAMPUS</h2>
            <div className="ml-3 text-base flex text-gray-500">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <MapPinIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=Black River Park+2 Fir St, Observatory, Cape Town, 7925"
                           target="_blank" className="text-xs font-bold">Unit 2D, Black River Park North,
                            Fir Street, Observatory, 7925,
                            Cape Town, Western Cape,
                            South Africa</a>
                    </div>
                </div>
            </div>

            <Map lat={ -33.93434753748154 }
                 lon={ 18.471861071164618 }
                 location={ 'CPT' } />
        </div>
    </div>
);

const ContactMenu = () => (
    <div className="absolute bottom-full w-[380px] md:w-[500px] bg-white rounded-xl shadow-2xl mb-14 -translate-x-1">

        <div className="flex-row p-4">

            <h2 className="text-lg font-bold text-gray-500 ml-10 sm:text-2xl sm:tracking-tight">JOHANNESBURG CAVI CAMPUS</h2>
            <div className="flex">
                <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-gray-400 -mt-6" aria-hidden="true" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                    <a href="tel:+27(0)113414900"
                       className="font-bold text-md underline"
                    >+27 (0)11 341 4900</a>
                </div>
            </div>
        </div>

        <div className="flex-row p-4">

            <h2 className="text-lg font-bold text-gray-500 ml-10 sm:text-2xl sm:tracking-tight">CAPE TOWN CAVI CAMPUS</h2>
            <div className="flex">
                <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-gray-400 -mt-6" aria-hidden="true" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                    <a href="tel:+270(21)4427700"
                       className="font-bold text-md underline"
                    >+27 0(21) 442 7700</a>
                </div>
            </div>
        </div>
    </div>
);

const MailMenu = () => (
    <div className="absolute bottom-full w-[380px] p-6 md:w-[550px] bg-white rounded-xl shadow-2xl mb-14 -translate-x-1">
        <h2 className="text-lg font-bold text-gray-500 ml-10 sm:text-2xl sm:tracking-tight">CAVI Email</h2>
        <div className="flex">
            <div className="flex-shrink-0">
                <EnvelopeIcon className="h-6 w-6 text-gray-400 -mt-6" aria-hidden="true" />
            </div>
            <div className="ml-4 text-base text-gray-500">
                <a className="font-bold underline" href="mailto:info@cavibrands.co.za?subject=CAVI%20Web%20Mail">
                    info@cavibrands.co.za
                </a>
            </div>
        </div>
    </div>
);

const contacts = [
    {
        name: 'Mail',
        href: 'https://www.linkedin.com/company/cavi-brands/?originalSubdomain=za',
        menu: <MapsMenu />,
        icon: () => (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24">
                    <path
                        d="M480.089-490Q509-490 529.5-510.589q20.5-20.588 20.5-49.5Q550-589 529.411-609.5q-20.588-20.5-49.5-20.5Q451-630 430.5-609.411q-20.5 20.588-20.5 49.5Q410-531 430.589-510.5q20.588 20.5 49.5 20.5ZM480-159q133-121 196.5-219.5T740-552q0-117.79-75.292-192.895Q589.417-820 480-820t-184.708 75.105Q220-669.79 220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-472Z" />
                </svg>
            </div>
        )
    },
    {
        name: 'Contact',
        href: 'https://www.youtube.com/channel/UCnDYwOXD3h0PlrCKKH_nMKg',
        menu: <ContactMenu />,
        icon: () => (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24">
                    <path
                        d="M795-120q-122 0-242.5-60T336-336q-96-96-156-216.5T120-795q0-19.286 12.857-32.143T165-840h140q13.611 0 24.306 9.5Q340-821 343-805l27 126q2 14-.5 25.5T359-634L259-533q56 93 125.5 162T542-254l95-98q10-11 23-15.5t26-1.5l119 26q15.312 3.375 25.156 15.188Q840-316 840-300v135q0 19.286-12.857 32.143T795-120ZM229-588l81-82-23-110H180q0 39 12 85.5T229-588Zm369 363q41 19 89 31t93 14v-107l-103-21-79 83ZM229-588Zm369 363Z" />
                </svg>
            </div>
        )
    },
    {
        name: 'Map',
        href: 'https://www.instagram.com/cavibrands/',
        menu: <MailMenu />,
        icon: () => (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24">
                    <path
                        d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z" />
                </svg>
            </div>
        )
    }
];
