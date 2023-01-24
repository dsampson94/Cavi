import { BuildingStorefrontIcon, GlobeEuropeAfricaIcon, EnvelopeIcon, TruckIcon, WifiIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

const transferFeatures = [
    {
        id: 1,
        name: 'Distribution',
        description:

            'Through our companies, we deliver world-class distribution services to luxury beauty, fashion and accessories brands across Southern Africa.',
        icon: TruckIcon
    },
    {
        id: 2,
        name: 'Operation',
        description:
            'We operates numerous standalone branded stores, including the iconic ARC Store retail chain.',
        icon: BuildingStorefrontIcon
    },
    {
        id: 3,
        name: 'Digital Presence',
        description:
            'Leading digital capabilities in the eCommerce luxury market',
        icon: WifiIcon
    }
];
const communicationFeatures = [
    {
        id: 1,
        name: 'Offices in Johannesburg and Cape Town',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: GlobeEuropeAfricaIcon
    },
    {
        id: 2,
        name: 'Proud of Our Diversity',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: UserGroupIcon
    }
];

export default function WhyCavi() {
    return (
        <div className="overflow-hidden bg-gray-50 pb-16 lg:pb-24 pt-4 lg:pt-16">
            <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
                <svg
                    className="absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block"
                    width={ 404 }
                    height={ 784 }
                    fill="none"
                    viewBox="0 0 404 784"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
                            x={ 0 }
                            y={ 0 }
                            width={ 20 }
                            height={ 20 }
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={ 0 } y={ 0 } width={ 4 } height={ 4 } className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={ 404 } height={ 784 } fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
                </svg>

                {/*<div className="relative">*/ }
                {/*<h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">*/}
                {/*    Why CAVI Brands?*/}
                {/*</h2>*/}
                {/*    <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">*/ }
                {/*        We are driven by the passion for luxury across Southern Africa.*/ }
                {/*    </p>*/ }
                {/*</div>*/ }

                <div className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                    <div className="relative">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">CAVI Serves World-Class Luxury Brands throughout Southern Africa</h3>
                        <p className="mt-3 text-lg text-gray-500">
                            We combine world leading brands with our extraordinary people,
                            our world class expertise, a profound understanding of our local customers, and an intimate knowledge of luxury.
                        </p>

                        <dl className="mt-10 space-y-10">
                            { transferFeatures.map((item) => (
                                <div key={ item.id } className="relative">
                                    <dt>
                                        <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white">
                                            <item.icon className="h-8 w-8" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{ item.name }</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{ item.description }</dd>
                                </div>
                            )) }
                        </dl>
                    </div>

                    <div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
                        <svg
                            className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
                            width={ 784 }
                            height={ 404 }
                            fill="none"
                            viewBox="0 0 784 404"
                        >
                            <defs>
                                <pattern
                                    id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                                    x={ 0 }
                                    y={ 0 }
                                    width={ 20 }
                                    height={ 20 }
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={ 0 } y={ 0 } width={ 4 } height={ 4 } className="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={ 784 } height={ 404 } fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
                        </svg>
                        <div>
                            <Image className="mt-20 br-04 rounded-lg"
                                   src={ '/cavicamps.jpg' }
                                   alt={ 'rss logo' }
                                   height={ 1600 }
                                   width={ 1600 } />
                        </div>

                    </div>
                </div>

                <svg
                    className="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block"
                    width={ 404 }
                    height={ 784 }
                    fill="none"
                    viewBox="0 0 404 784"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                            x={ 0 }
                            y={ 0 }
                            width={ 20 }
                            height={ 20 }
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={ 0 } y={ 0 } width={ 4 } height={ 4 } className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={ 404 } height={ 784 } fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
                </svg>

                <div className="relative mt-12 sm:mt-16 lg:mt-24">
                    <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
                        <div className="lg:col-start-2">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">We are Proudly African</h3>
                            <p className="mt-3 text-lg text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex obcaecati natus eligendi delectus,
                                cum deleniti sunt in labore nihil quod quibusdam expedita nemo.
                            </p>

                            <dl className="mt-10 space-y-10">
                                { communicationFeatures.map((item) => (
                                    <div key={ item.id } className="relative">
                                        <dt>
                                            <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white">
                                                <item.icon className="h-8 w-8" aria-hidden="true" />
                                            </div>
                                            <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{ item.name }</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">{ item.description }</dd>
                                    </div>
                                )) }
                            </dl>
                        </div>

                        <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
                            <svg
                                className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
                                width={ 784 }
                                height={ 404 }
                                fill="none"
                                viewBox="0 0 784 404"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                                        x={ 0 }
                                        y={ 0 }
                                        width={ 20 }
                                        height={ 20 }
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x={ 0 } y={ 0 } width={ 4 } height={ 4 } className="text-gray-200" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width={ 784 } height={ 404 } fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
                            </svg>
                            <Image className="mt-20 br-04 rounded-lg"
                                   src={ '/cavicpt.jpg' }
                                   alt={ 'rss logo' }
                                   height={ 1200 }
                                   width={ 550 } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}