import React from 'react';
import Image from 'next/image';
import ImageCarousel from './ImageCarousal';

export default function HeroImageCenter() {

    const imagesList = [
        { src: '/cavicampus.jpg' },
        { src: '/cavicamps.jpg' },
        { src: '/cavirecep.png' },
        { src: '/cavicampus-4.jpg' },
        { src: '/cavicampus-8.jpg' },
        { src: '/cavicampus-3.jpg' },
        { src: '/fourps.jpg' },
        { src: '/cavicampus-4.jpg' },
        { src: '/cavicampus-5.jpg' },
        { src: '/cavicampus-6.jpg' },
        { src: '/cavicampus-7.jpg' },
        { src: '/cavicpt.jpg' }
    ];

    return (
        <div className="bg-white">
            <main>
                <div>
                    {/* Hero card */ }
                    <div className="relative shadow-2xl h-screen -mt-28">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="shadow-2xl sm:overflow-hidden sm:rounded-2xl">
                                <div className="absolute inset-0 w-full h-full">
                                    <ImageCarousel images={ imagesList } />
                                    <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" />
                                </div>
                                <div className="relative pt-80 mt-6 px-6 lg:px-8">
                                    <h1 className="text-center text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                                        <span className="tracking-wider block text-white">The Home of Iconic Brands</span>
                                    </h1>
                                    <p className="tracking-wider mx-auto mt-4 max-w-md text-center text-xl text-gray-200 sm:max-w-3xl">
                                        We are dedicated to making every customer experience in our stores and with our
                                        brands, simply extraordinary.
                                    </p>

                                    <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                                        {/*<div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">*/ }
                                        {/*    <a*/ }
                                        {/*        href="#"*/ }
                                        {/*        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8"*/ }
                                        {/*    >*/ }
                                        {/*        Get started*/ }
                                        {/*    </a>*/ }
                                        {/*    <a*/ }
                                        {/*        href="#"*/ }
                                        {/*        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"*/ }
                                        {/*    >*/ }
                                        {/*        Live demo*/ }
                                        {/*    </a>*/ }
                                        {/*</div>*/ }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logo cloud */ }
                    <div className="bg-gray-100">
                        <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">
                            <p className="tracking-wider text-center text-base font-semibold text-gray-500">
                                Our Businesses
                            </p>
                            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <Image src={ '/brands/dermalogica-2.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <Image src={ '/brands/PCG-1.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                                    <Image src={ '/brands/Arc-1.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                                    <Image src={ '/brands/PDS-2.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <Image src={ '/brands/Chanel-1.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
