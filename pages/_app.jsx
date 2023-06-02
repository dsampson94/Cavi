import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

import './../styles/globals.css';
import NavbarLeft from '../components/features/NavbarLeft';

function MyApp({ Component, pageProps }) {
    const contactScrollToRef = useRef('contactScrollToRef');
    const brandsScrollToRef = useRef('brandsScrollToRef');
    const businessScrollToRef = useRef('businessScrollToRef');
    const peopleScrollToRef = useRef('peopleScrollToRef');

    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 100) {
                setShowNavbar(true);
            } else if (currentScrollY < lastScrollRef.current) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }

            lastScrollRef.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
                        showNavbar={ showNavbar } />

            <Component contactScrollToRef={ contactScrollToRef }
                       brandsScrollToRef={ brandsScrollToRef }
                       businessScrollToRef={ businessScrollToRef }
                       peopleScrollToRef={ peopleScrollToRef }
                       { ...pageProps } />
            <Analytics />
        </>
    );
}

export default MyApp;
