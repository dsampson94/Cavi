import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Map from './map';

const supportLinks = [
    {
        name: 'JOHANNESBURG CAVI CAMPUS',
        href: '#',
        description:
            '11-13 St Andrews Road, Parktown, 2193,\n' +
            'Johannesburg, Gauteng,\n' +
            'South Africa\n' +
            '\n' +
            'T +27 (0)11 341 4900\n' +
            'E info@cavibrands.co.za',
        icon: PhoneIcon
    },
    {
        name: 'CAPE TOWN CAVI CAMPUS',
        href: '#',
        description:
            'Unit 2D, Black River Park North,\n' +
            'Fir Street, Observatory, 7925,\n' +
            'Cape Town, Western Cape,\n' +
            'South Africa\n' +
            '\n' +
            'T +27 0(21) 442 7700\n' +
            'E info@cavibrands.co.za',
        icon: EnvelopeIcon
    }
];

export default function Contact({ contactScrollToRef }) {
    return (
        <div className="bg-white">
            {/* Header */ }
            <div className="relative bg-gray-00 pb-16">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gray-200 mix-blend-multiply" aria-hidden="true" />
                </div>
                <div ref={ contactScrollToRef } className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
                    <h1 className="text-center text-4xl font-bold tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Contact Us</h1>
                </div>
            </div>

            {/* Overlapping cards */ }
            <section id="contact-info" className="relative z-10 mx-auto -mt-32 max-w-7xl px-6 pb-16 lg:px-8 md:mx-40" aria-labelledby="contact-heading">
                <div className="bg-white br-04 rounded-2xl shadow-2xl">
                    <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">
                        <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">JOHANNESBURG CAVI CAMPUS</h2>
                                <div className="mt-9">
                                    <div className="flex pb-6">
                                        <div className="flex-shrink-0">
                                            <MapPinIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 text-base text-gray-500">
                                            <p></p>
                                            <a href="https://www.google.com/maps/dir/?api=1&destination=CAVI Brands+Oakhurst Building, 11-13 Saint Andrew Road, Parktown, Johannesburg, 2193"
                                               target="_blank" className="text-md font-bold">11-13 St Andrews Road, Parktown, 2193, <br />
                                                Johannesburg, Gauteng,
                                                South Africa</a><br />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 text-base text-gray-500">
                                            <a href="tel:+27(0)113414900"
                                               className="font-bold"
                                            >+27 (0)11 341 4900</a>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex">
                                        <div className="flex-shrink-0">
                                            <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 text-base text-gray-500">
                                            <a className="font-bold"
                                               href="mailto:info@cavibrands.co.za">info@cavibrands.co.za</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Map lat={ -26.18239629277934 }
                                         lon={ 28.03498248465847 }
                                         location={ 'JHB' } />
                                </div>

                            </div>
                            <div className="mt-12 sm:mt-16 md:mt-0">
                                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">CAPE TOWN CAVI CAMPUS</h2>
                                <div className="mt-9">
                                    <div className="flex pb-6">
                                        <div className="flex-shrink-0">
                                            <MapPinIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 text-base text-gray-500">
                                            <a href="https://www.google.com/maps/dir/?api=1&destination=Black River Park+2 Fir St, Observatory, Cape Town, 7925"
                                               target="_blank" className="text-md font-bold">Unit 2D, Black River Park North,
                                                Fir Street, Observatory, 7925,<br />
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
                                               className="font-bold"
                                            >+27 0(21) 442 7700</a>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex">
                                        <div className="flex-shrink-0">
                                            <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 text-base text-gray-500">
                                            <a className="font-bold"
                                               href="mailto:info@cavibrands.co.za">info@cavibrands.co.za</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Map lat={ -33.93434753748154 }
                                         lon={ 18.471861071164618 }
                                         location={ 'CPT' } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
