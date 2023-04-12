import React from 'react';
import Image from 'next/image';
import ImageCarousel from './ImageCarousal';
import Link from 'next/link';

export default function HeroImageCenter() {

    const imagesList = [
        { src: '/cavicampus.jpg' },
        { src: '/cavicamps.jpg' },
        { src: '/cavicampus-4.jpg' },
        { src: '/cavicampus-8.jpg' },
        { src: '/cavicampus-3.jpg' },
        { src: '/fourps.jpg' },
        { src: '/cavicampus-4.jpg' },
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
                            <div className="sm:overflow-hidden sm:rounded-2xl">
                                <div className="absolute inset-0 w-full h-full">
                                    <ImageCarousel images={ imagesList } />
                                    <div className="absolute inset-0 bg-gray-400 mix-blend-multiply" />
                                </div>
                                <div className="relative pt-[380px] px-6 lg:px-8">
                                    <h1 className="text-center text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                                        <span className="tracking-wider block text-white">The Home of Iconic Brands</span>
                                    </h1>
                                    <p className="tracking-wider mx-auto mt-4 max-w-md text-center text-xl text-gray-200 sm:max-w-3xl">
                                        We are dedicated to making every customer experience in our stores and with our
                                        brands, simply extraordinary.
                                    </p>
                                    <Link href="/people" className="flex justify-center tracking-wider mt-4 text-white text-md hover:text-blue-400">
                                        Learn more  <span className="pl-2" aria-hidden="true"> →</span>
                                    </Link>
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
                            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5 max-h-24 min-h-24 h-24">
                                <div className="object-contain col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <Image src={ '/brands/dermalogica-2.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                                <div className="object-contain col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <Image src={ '/brands/PCG-1.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                                <div className="object-contain col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                                    <Image src={ '/brands/Arc-1.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                                <div className="object-contain col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                                    <Image src={ '/brands/PDS-2.png' }
                                           alt={ 'rss logo' }
                                           height={ 200 }
                                           width={ 200 } />
                                </div>
                                <div className="object-contain col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
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
