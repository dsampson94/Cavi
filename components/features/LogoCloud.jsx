import React, { useEffect, useState } from 'react'
import { SVGIcon } from './SVGIcon'

export default function LogoCloud () {
  const [windowWidth, setWindowWidth] = useState(null)

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    setWindowWidth(window.innerWidth)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const brands = {
    'Amouage': 'https://www.amouage.com/',
    'Bulgari': 'https://www.bulgari.com/',
    'Chanel': 'https://www.chanel.com/',
    'Chopard': 'https://www.chopard.com/',
    'Clear': 'https://www.clearhaircare.com/',
    'Coach': 'https://www.coach.com/',
    'Dermalogica': 'https://www.dermalogica.com/',
    'Dolce': 'https://www.dolcegabbana.com/',
    'Elemis': 'https://www.elemis.com/',
    'Elie': 'https://www.eliesaab.com/',
    'Ellis': 'https://www.ellisfaas.com/',
    'Floral': 'https://www.floralstreet.com/',
    'Guerlain': 'https://www.guerlain.com/',
    'Hermes': 'https://www.hermes.com/',
    'Issey': 'https://www.isseymiyake.com/',
    'Jorgobe': 'https://jorgobeshop.com/',
    'Jack': 'https://jackperfume.co.uk/',
    'Prairie': 'https://www.laprairie.com/',
    'Memo': 'https://www.memofragrances.com/',
    'Narciso': 'https://www.narcisorodriguez.com/',
    'Van': 'https://www.vancleefarpels.com/',
    'Nesti': 'https://nestidante.com/',
    'Phillip': 'https://www.philipp plein.com/',
    'Sensai': 'https://www.sensai-cosmetics.com/',
    'Tommy': 'https://usa.tommy.com/',
    'e': '',
    'Zadig': 'https://www.zadig-et-voltaire.com/',
  }

  const names = Object.keys(brands)
  const laptopBreakpoint = 1024
  const mobileBreakpoint = 768
  let rows
  if (windowWidth <= mobileBreakpoint) {
    const itemsPerRow = 3;
    const numRows = Math.ceil(names.length / itemsPerRow);
    rows = Array.from({ length: numRows }, (_, i) =>
      names.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
    );
  } else if (windowWidth <= laptopBreakpoint) {
    rows = [
      names.slice(0, 4),
      names.slice(4, 7),
      names.slice(7, 11),
      names.slice(11, 14),
      names.slice(14, 18),
      names.slice(18, 21),
      names.slice(21, 25),
      names.slice(25, 26),
    ]
  } else {
    rows = [
      names.slice(0, 7),
      names.slice(7, 13),
      names.slice(13, 20),
      names.slice(20, 26),
    ]
  }


  const centerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '6vh 0 0 0',
      width: '100%'
    }}>

      <h1 className="md:pt-64 pt-0 text-2xl text-center tracking-wide">
        Our Brands
      </h1>

      <div style={centerStyles}>
        <div className="flex-column ">
          {windowWidth !== null ? (
            <div className="flex flex-wrap justify-center">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className={`flex justify-center ${
                    row.length === 7 ? 'w-full' : 'w-11/12'
                  }`}
                >
                  {row.map(name => {
                    // Conditionally render 'e' for mobile
                    if (name === 'e' && windowWidth > mobileBreakpoint) {
                      return null;
                    }
                    return (
                      <a
                        href={brands[name]}
                        target="_blank"
                        className={windowWidth <= mobileBreakpoint ? '-m-14' : 'm-0'}
                        rel="noreferrer"
                      >
                        <SVGIcon name={name} />
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}