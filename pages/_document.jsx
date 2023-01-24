import Document, { Head, Html, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from '../components/ads/gtag';

import { NextSeo } from 'next-seo';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <NextSeo
                        title="CAVI Brands - Leading luxury brand management company"
                        description="CAVI Brands is a business motivated by a passion for luxury across Southern Africa. We combine world leading brands with our extraordinary people, our world class expertise, a profound understanding of our local customers, and an intimate knowledge of luxury. We are dedicated to making every customer experience in our stores and with our brands, simply extraordinary."
                        openGraph={ {
                            url: '/',
                            title: 'CAVI Brands - Leading luxury brand management company',
                            description: 'CAVI Brands is a business motivated by a passion for luxury across Southern Africa. We combine world leading brands with our extraordinary people, our world class expertise, a profound understanding of our local customers, and an intimate knowledge of luxury. We are dedicated to making every customer experience in our stores and with our brands, simply extraordinary.',
                            images: [
                                {
                                    url: '/caviwhitebacklogo.png',
                                    width: 600,
                                    height: 600,
                                    alt: 'CAVI Brands Logo'
                                }
                            ],
                            site_name: 'CAVI Brands'
                        } }
                    />
                    <meta charSet="utf-8" />
                    <link rel="shortcut icon" href="../static/favicon.ico" />
                    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                    <meta property="og:image" content="/caviwhitebacklogo.png" />
                    {/* Google Adsense */ }
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7780458585019281"
                            crossOrigin="anonymous"></script>
                    {/* Global Site Tag (gtag.js) - Google Analytics */ }
                    <script async src={ `https://www.googletagmanager.com/gtag/js?id=${ GA_TRACKING_ID }` } />
                    <script dangerouslySetInnerHTML={ {
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ GA_TRACKING_ID }', {
              page_path: window.location.pathname,
            });`
                    } }
                    />
                </Head>

                <body>
                <Main />
                <NextScript />
                </body>

            </Html>
        );
    }
}
