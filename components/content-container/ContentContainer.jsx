import React from 'react';
import Contact from '../features/Contact';
import HeroImageCenter from '../features/HeroImageCenter';
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
import FooterCentered from '../features/FooterCentered';
import SimpleFooter from '../features/SimpleFooter';

const ContentContainer = ({ view, contactScrollToRef, businessScrollToRef, brandsScrollToRef, peopleScrollToRef, children }) => {

    switch (view) {
        case 'Home':
            return <HomePageContentContainer contactScrollToRef={ contactScrollToRef }
                                             businessScrollToRef={ businessScrollToRef }
                                             brandsScrollToRef={ brandsScrollToRef }
                                             peopleScrollToRefchildren={ peopleScrollToRef }>
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

const HomePageContentContainer = ({ contactScrollToRef, brandsScrollToRef, businessScrollToRef, peopleScrollToRefchildren }) => {

    return (
        <div className="font-montserrat-light isolate bg-white overflow-x-hidden">
            <HeroImageCenter brandsScrollToRef={ brandsScrollToRef }
                             businessScrollToRef={ businessScrollToRef } />
            {/*<CenteredIconTextFeature />*/ }
            {/*<Contact contactScrollToRef={ contactScrollToRef } />*/}
            <SimpleFooter />
        </div>
    );
};

const AboutPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <RightImageWithText />
            <FooterCentered contactScrollToRef={ contactScrollToRef } />
        </div>
    );
};


const PeoplePageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <Team />
            <FooterCentered contactScrollToRef={ contactScrollToRef } />
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
            <FooterCentered contactScrollToRef={ contactScrollToRef } />
        </div>
    );
};

const BrandsPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <LogoCloud />
            <FooterCentered contactScrollToRef={ contactScrollToRef } />
        </div>
    );
};

const CsrPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <LeftImageCSR />
            <FooterCentered contactScrollToRef={ contactScrollToRef } />
        </div>
    );
};

const CareerPageContentContainer = ({ contactScrollToRef }) => {

    return (
        <div className="isolate bg-white">
            <CareersOptions />
            <FooterCentered contactScrollToRef={ contactScrollToRef } />
        </div>
    );
};
