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
                            url: 'https://cavibrands.com/',
                            title: 'CAVI Brands - Leading luxury brand management company',
                            description: 'CAVI Brands is a business motivated by a passion for luxury across Southern Africa. We combine world leading brands with our extraordinary people, our world class expertise, a profound understanding of our local customers, and an intimate knowledge of luxury. We are dedicated to making every customer experience in our stores and with our brands, simply extraordinary.',
                            images: [
                                {
                                    url: 'https://cavibrands.com/social-share-logo.png',
                                    alt: 'CAVI Brands Logo'
                                }
                            ],
                            site_name: 'CAVI Brands',
                            type: 'website'
                        } }
                        twitter={{
                            cardType: 'summary_large_image'
                        }}
                        canonical="https://cavibrands.com/"
                        additionalMetaTags={[
                            {
                                name: 'keywords',
                                content: 'CAVI, Brands, luxury, brand management, Southern Africa, customers, experience'
                            },
                            {
                                property: 'og:url',
                                content: 'https://cavibrands.com/'
                            },
                            {
                                property: 'og:type',
                                content: 'website'
                            },
                            {
                                property: 'og:site_name',
                                content: 'CAVI Brands'
                            }
                        ]}
                    />
                    <meta charSet="utf-8" />
                    <link rel="shortcut icon" href="../static/favicon.ico" />
                    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                    <meta property="og:image" content="https://cavibrands.com/social-share-logo.png" />
                    {/* Google Maps */ }
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2MMmQ2tPm4z0OURwhMNCNBMYlMsDTNu0"></script>

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
