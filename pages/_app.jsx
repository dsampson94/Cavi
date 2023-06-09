import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

import './../styles/globals.css';
import NavbarLeft from '../components/features/NavbarLeft';
import SimpleFooter from '../components/features/SimpleFooter';
import HeroVideoPlayer from '../components/features/HeroVideoPlayer';
import LogoCloud from '../components/features/LogoCloud';
import VideoCarousel from '../components/features/VideoCarousal';
import VideoAndDivCarousel from '../components/features/VideoAndDivCarousal';

function MyApp() {

    const contactScrollToRef = useRef('contactScrollToRef');
    const brandsScrollToRef = useRef('brandsScrollToRef');
    const businessScrollToRef = useRef('businessScrollToRef');
    const peopleScrollToRef = useRef('peopleScrollToRef');

    const [showMenu, setShowMenu] = useState(null);

    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 100) setShowNavbar(true);
            else if (currentScrollY < lastScrollRef.current) setShowNavbar(true);
            else setShowNavbar(false);

            lastScrollRef.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head>
                <title>{ 'CAVI Brands' }</title>
            </Head>

            <NavbarLeft contactScrollToRef={ contactScrollToRef }
                        brandsScrollToRef={ brandsScrollToRef }
                        businessScrollToRef={ businessScrollToRef }
                        peopleScrollToRef={ peopleScrollToRef }
                        showNavbar={ showNavbar }
                        showMenu={ showMenu }
                        setShowMenu={ setShowMenu } />

            <main className="font-montserrat-light isolate bg-white overflow-x-hidden">

                {/* Hero card */ }
                <div className="relative shadow-2xl h-screen -mt-28 md:-mt-28">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="sm:overflow-hidden sm:rounded-2xl">
                            <div className="absolute inset-0 w-full h-full">
                                <HeroVideoPlayer videoSrc={ '/placeholder/herovid.mp4' } />
                            </div>
                        </div>
                    </div>
                </div>

                <section ref={ brandsScrollToRef } />

                <LogoCloud />

                <section ref={ businessScrollToRef } />

                <VideoCarousel videos={ videos } />

                <VideoAndDivCarousel videosComponents={ videosComponentsSpotlight } reverse />

                <section ref={ peopleScrollToRef } />

                <VideoAndDivCarousel videosComponents={ videosComponentsLeadership } />

            </main>

            <SimpleFooter showMenu={ showMenu }
                          setShowMenu={ setShowMenu } />

            <div ref={ contactScrollToRef } />
            <Analytics />
        </>
    );
}

export default MyApp;

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
    <div className="flex flex-col justify-center h-full ml-2 mr-4">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">
            Spotlight on our Team Players
        </h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">
            People make CAVI Brands
            We invest in the growth and development of people
            and we are proud to be a part of this dynamic, evolving and diverse nation
        </p>
    </div>
    ,
    '/vids/Staffvid-Ym.mp4',
    <div className="flex flex-col justify-center h-full ml-2 mr-4">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">Spotlight on our Team Players</h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">People make CAVI Brands
            We invest in the growth and developement of people
            and we are proud to be a part of this dynamic, evolving and diverse nation</p>
    </div>,
    '/vids/Staffvid-Mdv.mp4',
    <div className="flex flex-col justify-center h-full ml-2 mr-4">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">Spotlight on our Team Players</h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">People make CAVI Brands
            We invest in the growth and developement of people
            and we are proud to be a part of this dynamic, evolving and diverse nation</p>
    </div>
];

const videosComponentsLeadership = [
    <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">
            Maria is a beauty and fashion retail expert. She brings more than 30 years of beauty and fashion experience to the CAVI Brands Group,
            20 years of which was gained at Edcon. Maria is a results orientated marketing person, with a deep understanding of the South African retail
            landscape.
        </p>
    </div>,
    '/vids/Staffvid-Ml.mp4',
    <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">
            Joanne is a seasoned retailer, with over 25 years working for Woolworths South Africa. She has strong business acumen and is passionate about
            building brands in the South African landscape. She is recognised as having deep knowledge of the beauty industry.
        </p>
    </div>,
    '/vids/Staffvid-Jw.mp4',
    <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">
            Esté is a Chartered Accountant, having completed her articles at Deloitte in Cape Town. After secondment time in the United States, Esté worked for
            Global Multinationals including Dell Computers, Hitachi Data Systems, Ingram Micro, Novartis and Alcon. Her experience covers the IT, Telecom and
            Pharmaceutical industries supporting entities in South Africa as well as across Africa.
        </p>
    </div>,
    '/vids/Staffvid-Evs.mp4',
    <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">
            Michael is a successful, results-driven entrepreneur with a passion for excellence.
            He is the co-founder of CAVI Brands and has over 30 years’ experience in the branded beauty, fashion and accessory sectors in Southern Africa.
        </p>
    </div>,
    '/vids/Staffvid-Mth.mp4',
    <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">
            Cherie has a passion for brands and is recognised for having a deep understanding of the professional skin care channel to market.
            She also has an instinctive understanding and knowledge of delivery-orientated marketing and sales capabilities. </p>
    </div>,
    '/vids/Staffvid-CTH.mp4',
    <div className="flex flex-col justify-center h-full ml-2 mr-4 text-right">
        <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-500">Our Leadership</h2>
        <hr className="border-blue-500 border-2" />
        <p className="mt-4 text-xs md:text-xl text-gray-500">
            Michael is a highly regarded investment banker, and is a co-founder of Candur Active Value Investments “(CAVI)”.
            From 2000 to 2008 he was the CEO of Rand Merchant Bank, a leading investment bank in South Africa, and he has over 30 years experience in growing both
            entrepreneurial and corporate businesses.',
        </p>
    </div>,
    '/vids/Staffvid-Mp.mp4'
];
