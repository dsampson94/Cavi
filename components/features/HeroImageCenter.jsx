import React from 'react';
import LogoCloud from './LogoCloud';
import VideoCarousel from './VideoCarousal';
import VideoAndDivCarousel from './VideoAndDivCarousal';
import HeroVideoPlayer from './HeroVideoPlayer';

export default function HeroImageCenter({ brandsScrollToRef, businessScrollToRef }) {

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

    const videos = [
        // '/placeholder/Arc Place Holder Video.mp4',
        '/placeholder/PDS Place Holder Video.mp4',
        '/placeholder/Chanel Place Holder Video.mp4',
        '/placeholder/Dermalogica Place Holder Video.mp4',
        // '/placeholder/Arc Place Holder Video.mp4',
        '/placeholder/PDS Place Holder Video.mp4',
        '/placeholder/Chanel Place Holder Video.mp4',
        '/placeholder/Dermalogica Place Holder Video.mp4'
    ];

    const videosComponentsSpotlight = [
        '/vids/Staffvid-CS.mp4',
        <div className="flex flex-col justify-center h-full md:mt-16 ml-2 mr-4">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">
                Spotlight on our Team Players
            </h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">
                People make CAVI Brands<br />
                We invest in the growth and development of people<br />
                and we are proud to be a part of this dynamic, evolving and diverse nation
            </p>
        </div>
        ,
        '/vids/Staffvid-Ym.mp4',
        <div className="flex flex-col justify-center h-full md:mt-16 ml-2 mr-4">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">Spotlight on our Team Players</h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">People make CAVI Brands<br />
                We invest in the growth and developement of people<br />
                and we are proud to be a part of this dynamic, evolving and diverse nation</p>
        </div>,
        '/vids/Staffvid-Mdv.mp4',
        <div className="flex flex-col justify-center h-full md:mt-16 ml-2 mr-4">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">Spotlight on our Team Players</h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">People make CAVI Brands<br />
                We invest in the growth and developement of people<br />
                and we are proud to be a part of this dynamic, evolving and diverse nation</p>
        </div>
    ];

    const videosComponentsLeadership = [
        <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">
                Maria is a beauty and fashion retail expert.<br /> She brings more than 30 years of beauty and fashion experience to the CAVI Brands Group,
                20 years of which was gained at Edcon.<br /> Maria is a results orientated marketing person, with a deep understanding of the South African retail
                landscape.
            </p>
        </div>,
        '/vids/Staffvid-Ml.mp4',
        <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">
                Joanne is a seasoned retailer, with over 25 years working for Woolworths South Africa.<br /> She has strong business acumen and is passionate about
                building brands in the South African landscape.<br /> She is recognised as having deep knowledge of the beauty industry.
            </p>
        </div>,
        '/vids/Staffvid-Jw.mp4',
        <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">
                Esté is a Chartered Accountant, having completed her articles at Deloitte in Cape Town.<br /> After secondment time in the United States, Esté worked for
                Global Multinationals including Dell Computers, Hitachi Data Systems, <br /> Ingram Micro, Novartis and Alcon. Her experience covers the IT, Telecom and
                Pharmaceutical industries supporting entities in South Africa as well as across Africa.
            </p>
        </div>,
        '/vids/Staffvid-Evs.mp4',
        <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">
                Michael is a successful, results-driven entrepreneur with a passion for excellence.<br />
                He is the co-founder of CAVI Brands and has over 30 years’ experience in the branded beauty, fashion and accessory sectors in Southern Africa.
            </p>
        </div>,
        '/vids/Staffvid-Mth.mp4',
        <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">
                Cherie has a passion for brands and is recognised for having a deep understanding of the professional skin care channel to market.<br />
                She also has an instinctive understanding and knowledge of delivery-orientated marketing and sales capabilities. </p>
        </div>,
        '/vids/Staffvid-CTH.mp4',
        <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
            <h2 className="text-sm md:text-3xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
            <hr className="border-blue-500 border-2" />
            <p className="mt-4 text-xs md:text-2xl text-gray-500">
                Michael is a highly regarded investment banker, and is a co-founder of Candur Active Value Investments <br /> “(CAVI)”.
                From 2000 to 2008 he was the CEO of Rand Merchant Bank, a leading investment bank in South Africa, and he has over 30 years experience in growing both
                entrepreneurial and corporate businesses.',
            </p>
        </div>,
        '/vids/Staffvid-Mp.mp4'
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
                                    <HeroVideoPlayer videoSrc={ '/placeholder/herovid.mp4' } />
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
                                    {/*<Link href="/people" className="flex justify-center tracking-wider mt-4 text-white text-md hover:text-blue-400">*/ }
                                    {/*    Learn more <span className="pl-2" aria-hidden="true"> →</span>*/ }
                                    {/*</Link>*/ }
                                </div>
                            </div>
                        </div>
                    </div>

                    <LogoCloud brandsScrollToRef={ brandsScrollToRef } />

                    <VideoCarousel videos={ videos }
                                   businessScrollToRef={ businessScrollToRef } />

                    <VideoAndDivCarousel videosComponents={ videosComponentsSpotlight }
                                         businessScrollToRef={ businessScrollToRef } />

                    <VideoAndDivCarousel videosComponents={ videosComponentsLeadership }
                                         businessScrollToRef={ businessScrollToRef } />

                    {/*<div className="bg-gray-100">*/ }
                    {/*    <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">*/ }
                    {/*        <p className="tracking-wider text-center text-base font-semibold text-gray-500">*/ }
                    {/*            Our Businesses*/ }
                    {/*        </p>*/ }
                    {/*        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">*/ }
                    {/*            <div className="relative h-24 col-span-1 flex justify-center md:col-span-2 lg:col-span-1">*/ }
                    {/*                <Image src={ '/brands/dermalogica-2.png' }*/ }
                    {/*                       alt={ 'logo' }*/ }
                    {/*                       layout="fill"*/ }
                    {/*                       objectFit="contain"*/ }
                    {/*                       className="absolute top-0 left-0 w-full h-full" />*/ }
                    {/*            </div>*/ }
                    {/*            <div className="relative h-24 col-span-1 flex justify-center md:col-span-2 lg:col-span-1">*/ }
                    {/*                <Image src={ '/brands/PCG-1.png' }*/ }
                    {/*                       alt={ 'logo' }*/ }
                    {/*                       layout="fill"*/ }
                    {/*                       objectFit="contain"*/ }
                    {/*                       className="absolute top-0 left-0 w-full h-full" />*/ }
                    {/*            </div>*/ }
                    {/*            <div className="relative h-24 col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">*/ }
                    {/*                <Image src={ '/brands/Arc-1.png' }*/ }
                    {/*                       alt={ 'logo' }*/ }
                    {/*                       layout="fill"*/ }
                    {/*                       objectFit="contain"*/ }
                    {/*                       className="absolute top-0 left-0 w-full h-full" />*/ }
                    {/*            </div>*/ }
                    {/*            <div className="relative h-24 col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">*/ }
                    {/*                <Image src={ '/brands/PDS-2.png' }*/ }
                    {/*                       alt={ 'logo' }*/ }
                    {/*                       layout="fill"*/ }
                    {/*                       objectFit="contain"*/ }
                    {/*                       className="absolute top-0 left-0 w-full h-full" />*/ }
                    {/*            </div>*/ }
                    {/*            <div className="relative h-24 col-span-1 flex justify-center md:col-span-2 lg:col-span-1">*/ }
                    {/*                <Image src={ '/brands/Chanel-1.png' }*/ }
                    {/*                       alt={ 'logo' }*/ }
                    {/*                       layout="fill"*/ }
                    {/*                       objectFit="contain"*/ }
                    {/*                       className="absolute top-0 left-0 w-full h-full" />*/ }
                    {/*            </div>*/ }
                    {/*        </div>*/ }
                    {/*    </div>*/ }
                    {/*</div>*/ }
                </div>
            </main>
        </div>
    );
}
