import React, { useRef } from 'react';
import Contact from '../features/Contact';
import HeroImageCenter from '../features/HeroImageCenter';
import Footer from '../features/Footer';
import CenteredIconTextFeature from '../features/CenteredIconTextFeature';
import RightImageWithText from '../features/RightImageWithText';
import Team from '../features/Team';
import LogoCloud from '../features/LogoCloud';
import LeftImageCSR from '../features/LeftImageCSR';
import CareersOptions from '../features/CareersOption';
import BusinessContainer from '../features/BusinessesContainer';
import BusinessesImagesDermalogica from '../features/BusinessesImagesDermalogica';
import BusinessesImagesPCD from '../features/BusinessesImagesPCD';
import BusinessesImagesPCG from '../features/BusinessesImagesPCG';
import BusinessesImagesPDS from '../features/BusinessesImagesPDS';
import BusinessesImageARC from '../features/BusinessesImagesARC';
import Navbar from '../features/Navbar';

const ContentContainer = ({ view, children }) => {
    const contactScrollToRef = useRef('contactScrollToRef');

    const PageComponent = (() => {
        switch (view) {
            case 'Home':
                return HomePageContentContainer;
            case 'About':
                return AboutPageContentContainer;
            case 'People':
                return PeoplePageContentContainer;
            case 'Businesses':
                return BusinessesPageContentContainer;
            case 'Brands':
                return BrandsPageContentContainer;
            case 'Csr':
                return CsrPageContentContainer;
            case 'Careers':
                return CareerPageContentContainer;
            default:
                return HomePageContentContainer;
        }
    })();

    return (
        <>
            <Navbar contactScrollToRef={ contactScrollToRef } />
            <PageComponent contactScrollToRef={ contactScrollToRef }>
                { children }
            </PageComponent>
        </>
    );
};

export default ContentContainer;

const HomePageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="font-montserrat-light isolate bg-white">
            <HeroImageCenter />
            <CenteredIconTextFeature />
            <Contact contactScrollToRef={ contactScrollToRef } />
            <Footer />
        </div>
    );
};

const AboutPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <RightImageWithText />
            <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
        </div>
    );
};


const PeoplePageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <Team />
            <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
        </div>
    );
};

const BusinessesPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <BusinessContainer />
            <BusinessesImagesDermalogica />
            <BusinessesImagesPCG />
            <BusinessesImageARC />
            <BusinessesImagesPDS />
            <BusinessesImagesPCD />
            <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
        </div>
    );
};

const BrandsPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <LogoCloud />
            <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
        </div>
    );
};

const CsrPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <LeftImageCSR />
            <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
        </div>
    );
};

const CareerPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <CareersOptions />
            <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
        </div>
    );
};
