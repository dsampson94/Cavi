import React from 'react';
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

const ContentContainer = ({ view, contactScrollToRef, children }) => {

    switch (view) {
        case 'Home':
            return <HomePageContentContainer contactScrollToRef={ contactScrollToRef }>
                { children }
            </HomePageContentContainer>;
        case 'About':
            return <AboutPageContentContainer contactScrollToRef={ contactScrollToRef }>
                { children }
            </AboutPageContentContainer>;
        case 'People':
            return <PeoplePageContentContainer contactScrollToRef={ contactScrollToRef }>
                { children }
            </PeoplePageContentContainer>;
        case 'Businesses':
            return <BusinessesPageContentContainer contactScrollToRef={ contactScrollToRef }>
                { children }
            </BusinessesPageContentContainer>;
        case 'Brands':
            return <BrandsPageContentContainer contactScrollToRef={ contactScrollToRef }>
                { children }
            </BrandsPageContentContainer>;
        case 'Csr':
            return <CsrPageContentContainer contactScrollToRef={ contactScrollToRef }>
                { children }
            </CsrPageContentContainer>;
        case 'Careers':
            return <CareerPageContentContainer contactScrollToRef={ contactScrollToRef }>
                { children }
            </CareerPageContentContainer>;
        default:
            return <HomePageContentContainer contactScrollToRef={ contactScrollToRef }>
                { children }
            </HomePageContentContainer>;
    }

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
