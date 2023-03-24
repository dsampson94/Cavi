import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as gtag from '../components/ads/gtag';
import { Analytics } from '@vercel/analytics/react';

import './../styles/globals.css';
import NavbarLeft from '../components/features/NavbarLeft';
import NavbarCentered from '../components/features/NavbarCentered';

function MyApp({ Component, pageProps }) {

    // const router = useRouter();

    const contactScrollToRef = useRef('contactScrollToRef');
    const [isNavbarCentered, setIsNavbarCentered] = useState(false);
    // useEffect(() => {
    //     const handleRouteChange = (url) => gtag.pageview(url);
    //     router.events.on('routeChangeComplete', handleRouteChange);
    //     return () => router.events.off('routeChangeComplete', handleRouteChange);
    // }, [router.events]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 100 && !isNavbarCentered) {
                setIsNavbarCentered(true);
            } else if (scrollPosition <= 100 && isNavbarCentered) {
                setIsNavbarCentered(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isNavbarCentered]);


    return <>
        <Head>
            <title>{ 'CAVI Brands' }</title>
        </Head>

        {!isNavbarCentered ? (
            <NavbarCentered contactScrollToRef={contactScrollToRef} />
        ) : (
            <NavbarLeft contactScrollToRef={contactScrollToRef} />
        )}

        <Component contactScrollToRef={ contactScrollToRef }
                   { ...pageProps } />
        <Analytics />
    </>;
}

export default MyApp;
