import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import * as gtag from '../components/ads/gtag';
import { Analytics } from '@vercel/analytics/react';

import './../styles/globals.css';

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => gtag.pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return <>
    <Head>
      <title>{ 'CAVI BRANDS' }</title>
    </Head>
    <Component { ...pageProps } />
    <Analytics />
  </>;
}

export default MyApp;
