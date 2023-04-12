import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import NavbarCentered from '../components/features/NavbarCentered';

import './../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const contactScrollToRef = useRef('contactScrollToRef');
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
                <title>{'CAVI Brands'}</title>
            </Head>

            <NavbarCentered contactScrollToRef={contactScrollToRef} showNavbar={showNavbar} />

            <Component contactScrollToRef={contactScrollToRef} {...pageProps} />
            <Analytics />
        </>
    );
}

export default MyApp;
