import { BuildingStorefrontIcon, GlobeEuropeAfricaIcon, ServerIcon, TruckIcon, UserGroupIcon, WifiIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

const features = [
    {
        id: 1,
        name: 'In Store',
        description:
            'We operates numerous standalone branded stores, including the iconic ARC Store retail chain.',
        icon: BuildingStorefrontIcon,
        image: '/arcstore.png'
    },
    {
        id: 2,
        name: 'Distribution',
        description:

            'Through our companies, we deliver world-class distribution services to luxury beauty, fashion and accessories brands across Southern Africa.',
        icon: TruckIcon,
        image: '/warehouse.jpeg'
    },
    {
        id: 3,
        name: 'Digital Presence',
        description:
            'Leading digital capabilities in the eCommerce luxury market',
        icon: WifiIcon,
        image: '/digi.png'
    },
    {
        id: 4,
        name: 'Proud of Our Diversity',
        description:
            'We are proudly South African and embrace our diversity.',
        icon: UserGroupIcon,
        image: '/cavicpt.jpg'
    },
    {
        id: 5,
        name: 'CAVI Cares',
        description: 'Our vision is to help to create a better future for sustainable change in Southern Africa by changing the lives of young South Africans through education.',
        icon: ServerIcon,
        image: '/cavi-cares.svg'
    },
    {
        id: 6,
        name: 'Offices in Johannesburg and Cape Town',
        description:
            'With offices situated in Parktown, Johannesburg and Observatory, Cape Town we are local to South Africa\'s two largest luxury markets.',
        icon: GlobeEuropeAfricaIcon,
        image: '/cavicampus.jpg'
    }
];

export default function CenteredIconTextFeature() {
    return (
        <div className="relative bg-white py-16 sm:py-16 lg:py-16">
            <div className="mx-auto max-w-md px-2 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                <p className="mt-2 text-3xl tracking-widest text-blue-500 sm:text-4xl font-bold">
                    WHO WE ARE
                </p>
                <p className="mx-auto mt-12 text-xl text-gray-500 p-4">
                    CAVI Brands is a business motivated by a passion for luxury across Southern Africa. We combine world leading brands with our extraordinary people, our
                    world class expertise, a profound understanding of our local customers, and an intimate knowledge of luxury. We are dedicated to making every customer
                    experience in our stores and with our brands, simply extraordinary.

                    <br /><br />Our group companies distribute luxury beauty, accessories and fashion brands, and we co-own the newly launched iconic ARC Store retail
                    chain.

                    <br /><br />CAVI Brands also operates numerous standalone branded stores, provides niched logistics services to strategic luxury partners and has
                    developed a leading digital capability in the eCommerce luxury market.
                </p>
                <div className="hidden sm:hidden md:block lg:block xl:block mt-32">
                    <div className="grid grid-cols-1 sm: grid-cols-2 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        { features.map((feature) => (
                            <div key={ feature.name } className="pt-6">
                                <div className="flow-root rounded-lg bg-gray-50 px-0 pb-0">
                                    <div className="-mt-6">
                                        <div>
                            <span className="inline-flex items-center justify-center rounded-xl p-3 shadow-lg">
                                        <Image src={ feature.image }
                                               alt={ 'cavi-image' }
                                               className={ 'w-92 h-64 object-cover' }
                                               height={ 300 }
                                               width={ 350 }
                                        />
                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                                            { feature.name }
                                        </h3>
                                        <p className="mt-5 text-base xs:text-base-12 leading-7 text-gray-600 ">{ feature.description }</p>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>
                </div>

            </div>
        </div>
    );
}
