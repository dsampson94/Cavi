import React, { useRef } from 'react';
import Contact from '../features/Contact';
import HeroImageCenter from '../features/HeroImageCenter';
import Footer from '../features/Footer';
import CenteredIconTextFeature from '../features/CenteredIconTextFeature';
import Navbar from '../features/Navbar';
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

const ContentContainer = ({ view, children }) => {
    switch (view) {
        case 'Home':
            return <HomePageContentContainer>
                { children }
            </HomePageContentContainer>;
        case 'About':
            return <AboutPageContentContainer>
                { children }
            </AboutPageContentContainer>;
        case 'People':
            return <PeoplePageContentContainer>
                { children }
            </PeoplePageContentContainer>;
        case 'Businesses':
            return <BusinessesPageContentContainer>
                { children }
            </BusinessesPageContentContainer>;
        case 'Brands':
            return <BrandsPageContentContainer>
                { children }
            </BrandsPageContentContainer>;
        case 'Csr':
            return <CsrPageContentContainer>
                { children }
            </CsrPageContentContainer>;
        case 'Careers':
            return <CareerPageContentContainer>
                { children }
            </CareerPageContentContainer>;
        default:
            return <HomePageContentContainer>
                { children }
            </HomePageContentContainer>;
    }

};

export default ContentContainer;

const HomePageContentContainer = () => {

    const contactScrollToRef = useRef('contactScrollToRef');

    return (
        <div>
            <div className="font-montserrat-light isolate bg-white">
                <Navbar contactScrollToRef={ contactScrollToRef } />
                <HeroImageCenter />
                <CenteredIconTextFeature />
                <Contact contactScrollToRef={ contactScrollToRef } />
                <Footer />
            </div>
        </div>
    );
};

const AboutPageContentContainer = () => {

    const contactScrollToRef = useRef('contactScrollToFooter');

    return (
        <div>
            <div className="isolate bg-white">
                <Navbar contactScrollToRef={ contactScrollToRef } />
                <RightImageWithText />
                <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
            </div>
        </div>
    );
};


const PeoplePageContentContainer = () => {

    const contactScrollToRef = useRef('contactScrollToFooter');

    return (
        <div>
            <div className="isolate bg-white">
                <Navbar contactScrollToRef={ contactScrollToRef } />
                <Team />
                <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
            </div>
        </div>
    );
};

const BusinessesPageContentContainer = () => {

    const contactScrollToRef = useRef('contactScrollToFooter');

    return (
        <div>
            <div className="isolate bg-white">
                <Navbar contactScrollToRef={ contactScrollToRef } />
                <BusinessContainer />
                <BusinessesImagesDermalogica />
                <BusinessesImagesPCG />
                <BusinessesImageARC />
                <BusinessesImagesPDS />
                <BusinessesImagesPCD />
                <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
            </div>
        </div>
    );
};

const BrandsPageContentContainer = () => {

    const contactScrollToRef = useRef('contactScrollToFooter');

    return (
        <div>
            <div className="isolate bg-white">
                <Navbar contactScrollToRef={ contactScrollToRef } />
                <LogoCloud />
                <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
            </div>
        </div>
    );
};

const CsrPageContentContainer = () => {

    const contactScrollToRef = useRef('contactScrollToFooter');

    return (
        <div>
            <div className="isolate bg-white">
                <Navbar contactScrollToRef={ contactScrollToRef } />
                <LeftImageCSR />
                <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
            </div>
        </div>
    );
};

const CareerPageContentContainer = () => {

    const contactScrollToRef = useRef('contactScrollToFooter');

    return (
        <div>
            <div className="isolate bg-white">
                <Navbar contactScrollToRef={ contactScrollToRef } />
                <CareersOptions />
                <Footer contactScrollToRef={ contactScrollToRef } hasContactDetails />
            </div>
        </div>
    );
};