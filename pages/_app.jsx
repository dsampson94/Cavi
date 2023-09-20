import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'

import './../styles/globals.css'
import NavbarLeft from '../components/features/NavbarLeft'
import SimpleFooter from '../components/features/SimpleFooter'
import HeroVideoPlayer from '../components/features/HeroVideoPlayer'
import LogoCloud from '../components/features/LogoCloud'
import VideoCarousel from '../components/features/VideoCarousal'
import VideoAndDivCarousel from '../components/features/VideoAndDivCarousal'
import LeftImageCSR from '../components/features/LeftImageCSR'
import {
    videos,
    videosComponentsLeadership,
    videosComponentsSpotlight,
} from '../components/features/videoUtil'

function MyApp () {

  const contactScrollToRef = useRef(null)
  const brandsScrollToRef = useRef(null)
  const businessScrollToRef = useRef(null)
  const peopleScrollToRef = useRef(null)

  const [showMenu, setShowMenu] = useState(null)

  const [showNavbar, setShowNavbar] = useState(true)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 100) setShowNavbar(true)
      else if (currentScrollY < lastScrollRef.current) setShowNavbar(true)
      else setShowNavbar(false)

      lastScrollRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Head>
        <title>{'CAVI Brands'}</title>
      </Head>

      <NavbarLeft contactScrollToRef={contactScrollToRef}
                  brandsScrollToRef={brandsScrollToRef}
                  businessScrollToRef={businessScrollToRef}
                  peopleScrollToRef={peopleScrollToRef}
                  showNavbar={showNavbar}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}/>

      <main
        className="font-montserrat-light isolate bg-white overflow-x-hidden">

        {/* Hero card */}
        <div className="relative h-screen -mt-28 md:-mt-28">
          <div className="absolute inset-x-0 bottom-0 h-1/2"/>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0 w-full h-full">
                <HeroVideoPlayer videoSrc={'/vids/Header.mp4'}/>
              </div>
            </div>
          </div>
        </div>

        <section ref={brandsScrollToRef}/>

        <LogoCloud/>

        <h1
          className="md:mt-28 mt-12 mb-12 ml-2 text-2xl tracking-wide text-center">Our
          Businesses</h1>

        <section ref={businessScrollToRef}/>

        <VideoCarousel videos={videos}/>

        <h1 className="mt-28 ml-2 text-2xl tracking-wide text-center">Our
          Team</h1>

        <VideoAndDivCarousel videosComponents={videosComponentsSpotlight}
                             reverse/>

        <section ref={peopleScrollToRef}/>

        <VideoAndDivCarousel videosComponents={videosComponentsLeadership}/>

        <h1 className="mb-12 ml-2 text-2xl tracking-wide text-center">Channels</h1>

        <div className="flex pb-24">
          <img
            src="/Channels.svg"
            alt="channels"
            className="w-full flex"
          />
        </div>


        <h1 className="ml-2 text-2xl tracking-wide text-center mb-12">Corporate Social
          Responsibility</h1>

        <LeftImageCSR/>

      </main>

      <SimpleFooter showMenu={showMenu}
                    setShowMenu={setShowMenu}/>

      <div ref={contactScrollToRef}/>
      <Analytics/>
    </>
  )
}

export default MyApp
