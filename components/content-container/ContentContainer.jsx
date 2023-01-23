import React from 'react';
import Contact from '../features/contact/Contact';
import HeroImageCenter from '../features/hero/HeroImageCenter';
import Footer from '../features/footer/Footer';
import Team from '../features/team/Team';
import CenteredIconTextFeature from '../features/why-cavi/CenteredIconTextFeature';
import LogoCloud from '../features/logo-cloud/LogoCloud';
import Navbar from '../navbar/Navbar';

const ContentContainer = ({ view, children }) => {
    return <HomePageContentContainer view={ view }>
        { children }
    </HomePageContentContainer>;
};

export default ContentContainer;

const HomePageContentContainer = ({ children, view }) => {

    return (
        <div>
            <div className="isolate bg-white">
                <Navbar />
                <HeroImageCenter />
                <CenteredIconTextFeature />
                <LogoCloud />
                <Team />
                <Contact />
                <Footer />
            </div>
        </div>
    );
};
