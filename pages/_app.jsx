import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import * as gtag from '../components/ads/gtag';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '../components/features/Navbar';

import './../styles/globals.css';

function MyApp({ Component, pageProps }) {

    const router = useRouter();

    const contactScrollToRef = useRef('contactScrollToRef');

    useEffect(() => {
        const handleRouteChange = (url) => gtag.pageview(url);
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => router.events.off('routeChangeComplete', handleRouteChange);
    }, [router.events]);

    return <>
        <Head>
            <title>{ 'CAVI Brands' }</title>
        </Head>

        <Navbar contactScrollToRef={ contactScrollToRef } />

        <Component contactScrollToRef={ contactScrollToRef }
                   { ...pageProps } />
        <Analytics />
    </>;
}

export default MyApp;
