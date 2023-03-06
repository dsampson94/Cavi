import Image from 'next/image';
import React from 'react';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { socials } from './Navbar';
import Link from 'next/link';

const navigation = {
    navbarOne: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'People', href: '/people' },
        { name: 'Careers', href: '/careers' }
    ],
    navbarTwo: [
        { name: 'Businesses', href: '/businesses' },
        { name: 'Our Brands', href: '/brands' },
        { name: 'CSR', href: '/csr' }
    ],
    solutions: [
        { name: 'Marketing', href: '#' },
        { name: 'Analytics', href: '#' },
        { name: 'Commerce', href: '#' },
        { name: 'Insights', href: '#' }
    ],
    support: [
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Status', href: '#' }
    ],
    company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' }
    ],
    legal: [
        { name: 'Claim', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' }
    ]
};

export default function Footer({ hasContactDetails, contactScrollToRef }) {
    return (
        <footer className="bg-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Image src={ '/cavilogo.svg' }
                               alt={ 'rss logo' }
                               height={ 120 }
                               width={ 200 } />
                        <div className="flex space-x-6">
                            { socials.map((item) => (
                                <a key={ item.name } href={ item.href } className="text-gray-400 hover:text-gray-500" target="_blank">
                                    <span className="sr-only">{ item.name }</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            )) }
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <ul role="list" className="mt-6 space-y-4 text-sm font-semibold leading-6 text-gray-900">
                                    { navigation.navbarOne.map((item) => (
                                        <li key={ item.name }>
                                            <Link href={ item.href } className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                { item.name }
                                            </Link>
                                        </li>
                                    )) }
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <ul role="list" className="mt-6 space-y-4 text-sm font-semibold leading-6 text-gray-900">
                                    { navigation.navbarTwo.map((item) => (
                                        <li key={ item.name }>
                                            <Link href={ item.href } className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                { item.name }
                                            </Link>
                                        </li>
                                    )) }
                                </ul>
                            </div>
                        </div>

                        { hasContactDetails &&
                        <div ref={ contactScrollToRef }>
                            <h2 className="text-md font-bold text-gray-900 sm:text-md sm:tracking-tight">JOHANNESBURG CAVI CAMPUS</h2>
                            <div className="mt-9">
                                <div className="flex pb-6">
                                    <div className="flex-shrink-0">
                                        <MapPinIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 text-base text-gray-500">
                                        <a href="https://www.google.com/maps/dir/?api=1&destination=CAVI Brands+Oakhurst Building, 11-13 Saint Andrew Road, Parktown, Johannesburg, 2193"
                                           target="_blank" className="text-sm font-bold">11-13 St Andrews Road, Parktown, 2193, <br />
                                            Johannesburg, Gauteng,
                                            South Africa</a>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 text-base text-gray-500">
                                        <a href="tel:+27(0)113414900"
                                           className="font-bold text-sm"
                                        >+27 (0)11 341 4900</a>
                                    </div>
                                </div>
                                <div className="mt-6 flex">
                                    <div className="flex-shrink-0">
                                        <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 text-base text-gray-500">
                                        <a className=" font-bold text-sm"
                                           href="mailto:info@cavibrands.co.za">info@cavibrands.co.za</a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12">

                                <h2 className="text-md font-bold text-gray-900 sm:text-md sm:tracking-tight">CAPE TOWN CAVI CAMPUS</h2>
                                <div className="mt-9">
                                    <div className="flex pb-6">
                                        <div className="flex-shrink-0">
                                            <MapPinIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 text-base text-gray-500">
                                            <a href="https://www.google.com/maps/dir/?api=1&destination=Black River Park+2 Fir St, Observatory, Cape Town, 7925"
                                               target="_blank" className=" text-sm font-bold">Unit 2D, Black River Park North,
                                                Fir Street, Observatory, 7925,
                                                Cape Town, Western Cape,
                                                South Africa</a>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 text-base text-gray-500">
                                            <a href="tel:+270(21)4427700"
                                               className="font-bold text-sm"
                                            >+27 0(21) 442 7700</a>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex">
                                        <div className="flex-shrink-0">
                                            <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 text-base text-gray-500">
                                            <a className="font-bold text-sm"
                                               href="mailto:info@cavibrands.co.za">info@cavibrands.co.za</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> }
                    </div>
                </div>
            </div>
            <p className="text-xs leading-5 text-gray-500">CAVI | Brands. All rights reserved &copy; { new Date().toDateString().slice(-4) } </p>
        </footer>
    );
}
