/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';

import { string } from 'prop-types';
import {
  BULLSEYE,
  CAMERA,
  CHARTS,
  CLOUDED,
  DISSATISFIED,
  DROPDOWN,
  DROPDOWN_ALL,
  EMAIL_RECOMMENDATIONS,
  HARVEST_ICON,
  LOG_OUT_ICON,
  MAPS_ICON,
  NEUTRAL,
  PARTLY_CLOUDED,
  PENCIL,
  PREVIOUS,
  PRINT_ICON,
  RAIN,
  RAIN_CLOUDS,
  REPORT_PROBLEM_ICON,
  SATISFIED,
  SEARCH,
  SETTINGS_GEAR,
  SUNNY,
  VERY_DISSATISFIED,
  VERY_SATISFIED,
  WARNING,
  WATCH,
  WEATHER_STATION_ICON
} from '../general/system-variables.util';
import { getClassNames } from '../general/helpers.util';

import './svg-icon.scss';

const SVGIcon = ({ name, fill, height, width, onClick, tiny }) => {

  const activeTheme = useSelector(state => state.system.theme);

  return (
    <div className={ getClassNames('svg-icon',
      { tiny: tiny, small: getSmallIcons(name) }) }
         onClick={ onClick }>
      <svg xmlns="http://www.w3.org/2000/svg"
           xmlnsXlink="http://www.w3.org/1999/xlink"
           height={ height }
           width={ width }
           fill={ getIconFill(activeTheme, fill, name) }
           viewBox={ getViewBox(name, tiny) }>
        { getPath(name) }
      </svg>
    </div>
  );
};

const getViewBox = (name, tiny) => {
  switch (name) {
    case SETTINGS_GEAR:
      return '3 -1 20 50';
    case WARNING:
      return '-5 -9 1 42';
    case DROPDOWN:
      return '6 -3 1 30';
    case CAMERA:
      return '8 -9 1 42';
    case PENCIL:
      return '-1 -9 1 42';
    case CHARTS:
      return '5 -9 1 42';
    case RAIN_CLOUDS:
      return '0 1 50 120';
    case WATCH:
      return '0 -9 50 120';
    case PREVIOUS:
      return '0 -9 50 60';
    case BULLSEYE:
      return '0 -9 50 60';
    case HARVEST_ICON:
      return '0 -4 50 60';
    case SEARCH:
      return '-6 -5 70 75';
    case DROPDOWN_ALL:
      return '1 3 18 18';
    case VERY_SATISFIED:
      if (tiny) return '5 12 40 30';
      else return '1 -11 40 55';
    case SATISFIED:
      if (tiny) return '5 12 40 30';
      else return '1 -11 40 55';
    case NEUTRAL:
      if (tiny) return '5 12 40 30';
      else return '1 -11 40 55';
    case DISSATISFIED:
      if (tiny) return '5 12 40 30';
      else return '1 -11 40 55';
    case VERY_DISSATISFIED:
      if (tiny) return '5 12 40 30';
      else return '1 -11 40 55';
    case SUNNY:
      return '1 13 43 30';
    case RAIN:
    case PARTLY_CLOUDED:
    case CLOUDED:
      return '1 13 46 30';
    default:
      return '-6 0 36 24';
  }
};

const getSmallIcons = (name) => {
  switch (name) {
    case WARNING:
      return true;
    case DROPDOWN:
      return true;
    case CAMERA:
      return true;
    case PENCIL:
      return true;
    case CHARTS:
      return true;
    default:
      return false;
  }
};

const getIconFill = (activeTheme, fill, name) => {
  if (activeTheme === 'light') {
    return fill;
  } else {
    switch (name) {
      case SETTINGS_GEAR:
        return 'white';
      case PENCIL:
        return 'white';
      case CAMERA:
        return '#607CB1';
      case CHARTS:
        return 'white';
      case RAIN_CLOUDS:
        return 'white';
      case WATCH:
        return 'white';
      case CLOUDED:
        return '#C2C2C1';
      default:
        return fill;
    }
  }
};

const getPath = (name) => {
  switch (name) {
    case EMAIL_RECOMMENDATIONS:
      return (
        <g>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zm-2 0v.01L12 13 4 8l8-4.68L19.99 8zM4 18v-7.66l8 5.02 7.99-4.99L20 18H4z" />
        </g>
      );
    case WEATHER_STATION_ICON:
      return (
        <g>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v2h-1v1h1v2h-2V5z" />
        </g>
      );

    case MAPS_ICON:
      return (
        <g>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z" />
        </g>
      );
    case REPORT_PROBLEM_ICON:
      return (
        <g>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
        </g>
      );
    case LOG_OUT_ICON:
      return (
        <g>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
        </g>
      );
    case PREVIOUS:
      return (
        <path
          d="M28.4 38H14V35H28.45Q31.95 35 34.475 32.675Q37 30.35 37 26.9Q37 23.45 34.475 21.125Q31.95 18.8 28.45 18.8H13.7L19.4 24.5L17.3 26.6L8 17.3L17.3 8L19.4 10.1L13.7 15.8H28.4Q33.15 15.8 36.575 19Q40 22.2 40 26.9Q40 31.6 36.575 34.8Q33.15 38 28.4 38Z" />
      );
    case BULLSEYE:
      return (
        <path
          d="M37.8 9.5Q40.65 12.25 42.325 15.975Q44 19.7 44 24Q44 28.15 42.425 31.8Q40.85 35.45 38.15 38.15Q35.45 40.85 31.8 42.425Q28.15 44 24 44Q19.85 44 16.2 42.425Q12.55 40.85 9.85 38.15Q7.15 35.45 5.575 31.8Q4 28.15 4 24Q4 19.85 5.575 16.2Q7.15 12.55 9.85 9.85Q12.55 7.15 16.2 5.575Q19.85 4 24 4H25.5V20.3Q26.6 20.75 27.3 21.75Q28 22.75 28 24Q28 25.65 26.825 26.825Q25.65 28 24 28Q22.35 28 21.175 26.825Q20 25.65 20 24Q20 22.75 20.7 21.75Q21.4 20.75 22.5 20.3V15.1Q19.25 15.65 17.125 18.125Q15 20.6 15 24Q15 27.75 17.625 30.375Q20.25 33 24 33Q27.75 33 30.375 30.375Q33 27.75 33 24Q33 21.95 32.2 20.25Q31.4 18.55 30 17.3L32.15 15.15Q33.9 16.8 34.95 19.075Q36 21.35 36 24Q36 29 32.5 32.5Q29 36 24 36Q19 36 15.5 32.5Q12 29 12 24Q12 19.35 15 15.975Q18 12.6 22.5 12.05V7.05Q15.95 7.6 11.475 12.45Q7 17.3 7 24Q7 31.1 11.95 36.05Q16.9 41 24 41Q31.1 41 36.05 36.05Q41 31.1 41 24Q41 20.3 39.575 17.15Q38.15 14 35.65 11.65Z" />
      );
    case PRINT_ICON:
      return (
        <g>
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
        </g>
      );
    case HARVEST_ICON:
      return (
        <path
          d="M7.25 18.05Q6.7 18.05 6.3 17.6Q5.9 17.15 5.9 16.55Q5.9 15.95 6.3 15.5Q6.7 15.05 7.25 15.05H14.7Q16.15 15.05 16.95 15.95Q17.75 16.85 18 18.05ZM11.5 37Q14.2 37 16.1 35.1Q18 33.2 18 30.5Q18 27.8 16.1 25.9Q14.2 24 11.5 24Q8.8 24 6.9 25.9Q5 27.8 5 30.5Q5 33.2 6.9 35.1Q8.8 37 11.5 37ZM39.25 37Q40.8 37 41.9 35.9Q43 34.8 43 33.25Q43 31.7 41.9 30.6Q40.8 29.5 39.25 29.5Q37.7 29.5 36.6 30.6Q35.5 31.7 35.5 33.25Q35.5 34.8 36.6 35.9Q37.7 37 39.25 37ZM11.5 34Q10.05 34 9.025 32.975Q8 31.95 8 30.5Q8 29.05 9.025 28.025Q10.05 27 11.5 27Q12.95 27 13.975 28.025Q15 29.05 15 30.5Q15 31.95 13.975 32.975Q12.95 34 11.5 34ZM40.5 26.6Q41.45 26.85 42.075 27.15Q42.7 27.45 43.5 28.05V15.05Q43.5 13.75 42.65 12.9Q41.8 12.05 40.5 12.05H26.9L24.45 9.6L27.55 6.5L26.65 5.6L19.55 12.7L20.5 13.6L23.55 10.55L26 12.95V18.15Q26 20.25 24.575 21.725Q23.15 23.2 21.05 23.2H17.6Q18.45 23.9 18.925 24.55Q19.4 25.2 20 26.2H21.05Q24.3 26.2 26.65 23.8Q29 21.4 29 18.15V15.05H40.5Q40.5 15.05 40.5 15.05Q40.5 15.05 40.5 15.05ZM32.65 32Q32.95 30.9 33.275 30.275Q33.6 29.65 34.2 28.95H20.9Q21 29.85 21 30.475Q21 31.1 20.9 32ZM39.25 40Q36.45 40 34.475 38.1Q32.5 36.2 32.5 33.4Q32.5 30.6 34.55 28.55Q36.6 26.5 39.4 26.5Q42.2 26.5 44.1 28.475Q46 30.45 46 33.25Q46 36.05 44.025 38.025Q42.05 40 39.25 40ZM11.4 40Q7.45 40 4.725 37.225Q2 34.45 2 30.5Q2 26.55 4.775 23.775Q7.55 21 11.5 21Q15.45 21 18.225 23.775Q21 26.55 21 30.5Q21 34.45 18.225 37.225Q15.45 40 11.4 40ZM31.1 22Q31.1 22 31.1 22Q31.1 22 31.1 22Q31.1 22 31.1 22Q31.1 22 31.1 22Q31.1 22 31.1 22Q31.1 22 31.1 22Q31.1 22 31.1 22Q31.1 22 31.1 22Z" />
      );
    case SETTINGS_GEAR:
      return (
        <g>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </g>
      );
    case WARNING:
      return (
        <g>
          <path
            d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        </g>
      );
    case DROPDOWN_ALL:
    case DROPDOWN:
      return (
        <g>
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <polygon points="18,6.41 16.59,5 12,9.58 7.41,5 6,6.41 12,12.41" />
              <polygon points="18,13 16.59,11.59 12,16.17 7.41,11.59 6,13 12,19" />
            </g>
          </g>
        </g>
      );
    case CAMERA:
      return (
        <g>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M14.12 4l1.83 2H20v12H4V6h4.05l1.83-2h4.24M15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm-3 7c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
        </g>
      );
    case PENCIL:
      return (
        <g>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
        </g>
      );
    case CHARTS:
      return (
        <g>
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <path
                d="M21,8c-1.45,0-2.26,1.44-1.93,2.51l-3.55,3.56c-0.3-0.09-0.74-0.09-1.04,0l-2.55-2.55C12.27,10.45,11.46,9,10,9 c-1.45,0-2.27,1.44-1.93,2.52l-4.56,4.55C2.44,15.74,1,16.55,1,18c0,1.1,0.9,2,2,2c1.45,0,2.26-1.44,1.93-2.51l4.55-4.56 c0.3,0.09,0.74,0.09,1.04,0l2.55,2.55C12.73,16.55,13.54,18,15,18c1.45,0,2.27-1.44,1.93-2.52l3.56-3.55 C21.56,12.26,23,11.45,23,10C23,8.9,22.1,8,21,8z" />
              <polygon points="15,9 15.94,6.93 18,6 15.94,5.07 15,3 14.08,5.07 12,6 14.08,6.93" />
              <polygon points="3.5,11 4,9 6,8.5 4,8 3.5,6 3,8 1,8.5 3,9" />
            </g>
          </g>
        </g>
      );
    case RAIN_CLOUDS:
      return (
        <path
          d="M27.9 43.85Q27.35 44.1 26.725 43.9Q26.1 43.7 25.85 43.15L22.4 36.25Q22.15 35.7 22.325 35.075Q22.5 34.45 23.05 34.2Q23.6 33.95 24.225 34.15Q24.85 34.35 25.1 34.9L28.55 41.8Q28.8 42.35 28.625 42.975Q28.45 43.6 27.9 43.85ZM39.9 43.8Q39.35 44.05 38.725 43.85Q38.1 43.65 37.85 43.1L34.4 36.2Q34.15 35.65 34.325 35.025Q34.5 34.4 35.05 34.15Q35.6 33.9 36.225 34.1Q36.85 34.3 37.1 34.85L40.55 41.75Q40.8 42.3 40.625 42.925Q40.45 43.55 39.9 43.8ZM15.9 43.8Q15.35 44.05 14.725 43.875Q14.1 43.7 13.85 43.15L10.4 36.25Q10.15 35.7 10.35 35.075Q10.55 34.45 11.1 34.2Q11.65 33.95 12.275 34.125Q12.9 34.3 13.15 34.85L16.6 41.8Q16.85 42.35 16.65 42.95Q16.45 43.55 15.9 43.8ZM14.5 31Q10.15 31 7.075 27.925Q4 24.85 4 20.5Q4 16.55 6.825 13.45Q9.65 10.35 13.85 10.05Q15.45 7.25 18.075 5.625Q20.7 4 24 4Q28.55 4 31.625 6.875Q34.7 9.75 35.4 14Q39.35 14.2 41.675 16.675Q44 19.15 44 22.5Q44 26 41.525 28.5Q39.05 31 35.5 31ZM14.5 28H35.5Q37.8 28 39.4 26.375Q41 24.75 41 22.5Q41 20.2 39.4 18.6Q37.8 17 35.5 17H32.5V15.5Q32.5 11.95 30.025 9.475Q27.55 7 24 7Q21.45 7 19.325 8.375Q17.2 9.75 16.2 12.1L15.8 13H14.4Q11.3 13.1 9.15 15.275Q7 17.45 7 20.5Q7 23.6 9.2 25.8Q11.4 28 14.5 28ZM24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Z" />
      );
    case WATCH:
      return (
        <path
          d="M18.3 44 15.95 35.45Q13.2 33.7 11.6 30.7Q10 27.7 10 24Q10 20.3 11.6 17.275Q13.2 14.25 15.95 12.55L18.3 4H29.7L32.05 12.55Q34.8 14.25 36.4 17.275Q38 20.3 38 24Q38 27.7 36.4 30.7Q34.8 33.7 32.05 35.45L29.7 44ZM24 35Q28.6 35 31.8 31.8Q35 28.6 35 24Q35 19.4 31.8 16.2Q28.6 13 24 13Q19.4 13 16.2 16.2Q13 19.4 13 24Q13 28.6 16.2 31.8Q19.4 35 24 35ZM19.65 10.8Q22 10.1 24.025 10.1Q26.05 10.1 28.35 10.8L27.45 7H20.55ZM20.55 41H27.45L28.35 37.2Q26 37.85 24 37.85Q22 37.85 19.65 37.2ZM19.65 7H20.55H27.45H28.35Q26.05 7 24.025 7Q22 7 19.65 7ZM20.55 41H19.65Q22 41 24 41Q26 41 28.35 41H27.45Z" />
      );
    case SEARCH:
      return (
        <path
          d="M39.8 41.95 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L42 39.75ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55Z" />
      );
    case VERY_SATISFIED:
      return (
        <path
          d="M31.25 21.4Q32.4 21.4 33.2 20.625Q34 19.85 34 18.65Q34 17.45 33.225 16.675Q32.45 15.9 31.25 15.9Q30.05 15.9 29.25 16.675Q28.45 17.45 28.45 18.65Q28.45 19.85 29.25 20.625Q30.05 21.4 31.25 21.4ZM16.75 21.4Q17.95 21.4 18.75 20.625Q19.55 19.85 19.55 18.65Q19.55 17.45 18.75 16.675Q17.95 15.9 16.75 15.9Q15.6 15.9 14.8 16.675Q14 17.45 14 18.65Q14 19.85 14.775 20.625Q15.55 21.4 16.75 21.4ZM24 34.95Q27.35 34.95 30.125 33.15Q32.9 31.35 34.15 28.25H13.85Q15.15 31.3 17.9 33.125Q20.65 34.95 24 34.95ZM24 44.3Q19.8 44.3 16.1 42.7Q12.4 41.1 9.65 38.35Q6.9 35.6 5.3 31.9Q3.7 28.2 3.7 24Q3.7 19.75 5.3 16.05Q6.9 12.35 9.65 9.625Q12.4 6.9 16.1 5.3Q19.8 3.7 24 3.7Q28.25 3.7 31.95 5.3Q35.65 6.9 38.375 9.625Q41.1 12.35 42.7 16.05Q44.3 19.75 44.3 24Q44.3 28.2 42.7 31.9Q41.1 35.6 38.375 38.35Q35.65 41.1 31.95 42.7Q28.25 44.3 24 44.3ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM24 40.9Q31.05 40.9 35.975 35.95Q40.9 31 40.9 24Q40.9 16.95 35.975 12.025Q31.05 7.1 24 7.1Q17 7.1 12.05 12.025Q7.1 16.95 7.1 23.95Q7.1 31 12.05 35.95Q17 40.9 24 40.9Z" />
      );
    case SATISFIED:
      return (
        <path
          d="M31.3 21.35Q32.45 21.35 33.225 20.575Q34 19.8 34 18.65Q34 17.5 33.225 16.725Q32.45 15.95 31.3 15.95Q30.15 15.95 29.375 16.725Q28.6 17.5 28.6 18.65Q28.6 19.8 29.375 20.575Q30.15 21.35 31.3 21.35ZM16.7 21.35Q17.85 21.35 18.625 20.575Q19.4 19.8 19.4 18.65Q19.4 17.5 18.625 16.725Q17.85 15.95 16.7 15.95Q15.55 15.95 14.775 16.725Q14 17.5 14 18.65Q14 19.8 14.775 20.575Q15.55 21.35 16.7 21.35ZM24 34.95Q27.3 34.95 30.075 33.175Q32.85 31.4 34.1 28.35H31.5Q30.35 30.35 28.35 31.425Q26.35 32.5 24.05 32.5Q21.7 32.5 19.675 31.45Q17.65 30.4 16.55 28.35H13.9Q15.2 31.4 17.95 33.175Q20.7 34.95 24 34.95ZM24 44Q19.9 44 16.25 42.425Q12.6 40.85 9.875 38.125Q7.15 35.4 5.575 31.75Q4 28.1 4 23.95Q4 19.85 5.575 16.2Q7.15 12.55 9.875 9.85Q12.6 7.15 16.25 5.575Q19.9 4 24.05 4Q28.15 4 31.8 5.575Q35.45 7.15 38.15 9.85Q40.85 12.55 42.425 16.2Q44 19.85 44 24Q44 28.1 42.425 31.75Q40.85 35.4 38.15 38.125Q35.45 40.85 31.8 42.425Q28.15 44 24 44ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM24 41Q31.1 41 36.05 36.025Q41 31.05 41 24Q41 16.9 36.05 11.95Q31.1 7 24 7Q16.95 7 11.975 11.95Q7 16.9 7 24Q7 31.05 11.975 36.025Q16.95 41 24 41Z" />
      );
    case NEUTRAL:
      return (
        <path
          d="M31.3 21.35Q32.45 21.35 33.225 20.575Q34 19.8 34 18.65Q34 17.5 33.225 16.725Q32.45 15.95 31.3 15.95Q30.15 15.95 29.375 16.725Q28.6 17.5 28.6 18.65Q28.6 19.8 29.375 20.575Q30.15 21.35 31.3 21.35ZM16.7 21.35Q17.85 21.35 18.625 20.575Q19.4 19.8 19.4 18.65Q19.4 17.5 18.625 16.725Q17.85 15.95 16.7 15.95Q15.55 15.95 14.775 16.725Q14 17.5 14 18.65Q14 19.8 14.775 20.575Q15.55 21.35 16.7 21.35ZM17.7 31.05H30.35V28.6H17.7ZM24 44Q19.9 44 16.25 42.425Q12.6 40.85 9.875 38.125Q7.15 35.4 5.575 31.75Q4 28.1 4 23.95Q4 19.85 5.575 16.2Q7.15 12.55 9.875 9.85Q12.6 7.15 16.25 5.575Q19.9 4 24.05 4Q28.15 4 31.8 5.575Q35.45 7.15 38.15 9.85Q40.85 12.55 42.425 16.2Q44 19.85 44 24Q44 28.1 42.425 31.75Q40.85 35.4 38.15 38.125Q35.45 40.85 31.8 42.425Q28.15 44 24 44ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM24 41Q31.1 41 36.05 36.025Q41 31.05 41 24Q41 16.9 36.05 11.95Q31.1 7 24 7Q16.95 7 11.975 11.95Q7 16.9 7 24Q7 31.05 11.975 36.025Q16.95 41 24 41Z" />
      );
    case DISSATISFIED:
      return (
        <path
          d="M31.3 21.35Q32.45 21.35 33.225 20.575Q34 19.8 34 18.65Q34 17.5 33.225 16.725Q32.45 15.95 31.3 15.95Q30.15 15.95 29.375 16.725Q28.6 17.5 28.6 18.65Q28.6 19.8 29.375 20.575Q30.15 21.35 31.3 21.35ZM16.7 21.35Q17.85 21.35 18.625 20.575Q19.4 19.8 19.4 18.65Q19.4 17.5 18.625 16.725Q17.85 15.95 16.7 15.95Q15.55 15.95 14.775 16.725Q14 17.5 14 18.65Q14 19.8 14.775 20.575Q15.55 21.35 16.7 21.35ZM24 27.15Q20.65 27.15 17.925 29.025Q15.2 30.9 13.9 34H16.55Q17.65 31.9 19.675 30.75Q21.7 29.6 24.05 29.6Q26.4 29.6 28.375 30.75Q30.35 31.9 31.5 34H34.1Q32.85 30.9 30.1 29.025Q27.35 27.15 24 27.15ZM24 44Q19.9 44 16.25 42.425Q12.6 40.85 9.875 38.125Q7.15 35.4 5.575 31.75Q4 28.1 4 23.95Q4 19.85 5.575 16.2Q7.15 12.55 9.875 9.85Q12.6 7.15 16.25 5.575Q19.9 4 24.05 4Q28.15 4 31.8 5.575Q35.45 7.15 38.15 9.85Q40.85 12.55 42.425 16.2Q44 19.85 44 24Q44 28.1 42.425 31.75Q40.85 35.4 38.15 38.125Q35.45 40.85 31.8 42.425Q28.15 44 24 44ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM24 41Q31.1 41 36.05 36.025Q41 31.05 41 24Q41 16.9 36.05 11.95Q31.1 7 24 7Q16.95 7 11.975 11.95Q7 16.9 7 24Q7 31.05 11.975 36.025Q16.95 41 24 41Z" />
      );
    case VERY_DISSATISFIED:
      return (
        <path
          d="M31.25 21.4Q32.4 21.4 33.2 20.625Q34 19.85 34 18.65Q34 17.45 33.225 16.675Q32.45 15.9 31.25 15.9Q30.05 15.9 29.25 16.675Q28.45 17.45 28.45 18.65Q28.45 19.85 29.25 20.625Q30.05 21.4 31.25 21.4ZM16.75 21.4Q17.95 21.4 18.75 20.625Q19.55 19.85 19.55 18.65Q19.55 17.45 18.75 16.675Q17.95 15.9 16.75 15.9Q15.6 15.9 14.8 16.675Q14 17.45 14 18.65Q14 19.85 14.775 20.625Q15.55 21.4 16.75 21.4ZM24 27.05Q20.6 27.05 17.875 28.95Q15.15 30.85 13.85 34H34.15Q32.9 30.85 30.15 28.95Q27.4 27.05 24 27.05ZM24 44.3Q19.8 44.3 16.1 42.7Q12.4 41.1 9.65 38.35Q6.9 35.6 5.3 31.9Q3.7 28.2 3.7 24Q3.7 19.75 5.3 16.05Q6.9 12.35 9.65 9.625Q12.4 6.9 16.1 5.3Q19.8 3.7 24 3.7Q28.25 3.7 31.95 5.3Q35.65 6.9 38.375 9.625Q41.1 12.35 42.7 16.05Q44.3 19.75 44.3 24Q44.3 28.2 42.7 31.9Q41.1 35.6 38.375 38.35Q35.65 41.1 31.95 42.7Q28.25 44.3 24 44.3ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM24 40.9Q31.05 40.9 35.975 35.95Q40.9 31 40.9 24Q40.9 16.95 35.975 12.025Q31.05 7.1 24 7.1Q17 7.1 12.05 12.025Q7.1 16.95 7.1 23.95Q7.1 31 12.05 35.95Q17 40.9 24 40.9Z" />
      );
    case SUNNY:
      return (
        <path
          d="M22.5 7.5V2H25.5V7.5ZM22.5 46V40.5H25.5V46ZM40.5 25.5V22.5H46V25.5ZM2 25.5V22.5H7.5V25.5ZM37.1 13 34.95 10.85 38.25 7.55 40.4 9.7ZM9.75 40.45 7.6 38.3 10.9 35 13.05 37.15ZM38.25 40.45 34.95 37.15 37.1 35 40.4 38.3ZM10.9 13 7.6 9.7 9.75 7.55 13.05 10.85ZM24 35.25Q19.3 35.25 16.025 31.975Q12.75 28.7 12.75 24Q12.75 19.3 16.025 16.025Q19.3 12.75 24 12.75Q28.7 12.75 31.975 16.025Q35.25 19.3 35.25 24Q35.25 28.7 31.975 31.975Q28.7 35.25 24 35.25ZM24 32.25Q27.45 32.25 29.85 29.85Q32.25 27.45 32.25 24Q32.25 20.55 29.85 18.15Q27.45 15.75 24 15.75Q20.55 15.75 18.15 18.15Q15.75 20.55 15.75 24Q15.75 27.45 18.15 29.85Q20.55 32.25 24 32.25ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Z" />
      );
    case RAIN:
      return (
        <path
          d="M27.9 43.85Q27.35 44.1 26.725 43.9Q26.1 43.7 25.85 43.15L22.4 36.25Q22.15 35.7 22.325 35.075Q22.5 34.45 23.05 34.2Q23.6 33.95 24.225 34.15Q24.85 34.35 25.1 34.9L28.55 41.8Q28.8 42.35 28.625 42.975Q28.45 43.6 27.9 43.85ZM39.9 43.8Q39.35 44.05 38.725 43.85Q38.1 43.65 37.85 43.1L34.4 36.2Q34.15 35.65 34.325 35.025Q34.5 34.4 35.05 34.15Q35.6 33.9 36.225 34.1Q36.85 34.3 37.1 34.85L40.55 41.75Q40.8 42.3 40.625 42.925Q40.45 43.55 39.9 43.8ZM15.9 43.8Q15.35 44.05 14.725 43.875Q14.1 43.7 13.85 43.15L10.4 36.25Q10.15 35.7 10.35 35.075Q10.55 34.45 11.1 34.2Q11.65 33.95 12.275 34.125Q12.9 34.3 13.15 34.85L16.6 41.8Q16.85 42.35 16.65 42.95Q16.45 43.55 15.9 43.8ZM14.5 31Q10.15 31 7.075 27.925Q4 24.85 4 20.5Q4 16.55 6.825 13.45Q9.65 10.35 13.85 10.05Q15.45 7.25 18.075 5.625Q20.7 4 24 4Q28.55 4 31.625 6.875Q34.7 9.75 35.4 14Q39.35 14.2 41.675 16.675Q44 19.15 44 22.5Q44 26 41.525 28.5Q39.05 31 35.5 31ZM14.5 28H35.5Q37.8 28 39.4 26.375Q41 24.75 41 22.5Q41 20.2 39.4 18.6Q37.8 17 35.5 17H32.5V15.5Q32.5 11.95 30.025 9.475Q27.55 7 24 7Q21.45 7 19.325 8.375Q17.2 9.75 16.2 12.1L15.8 13H14.4Q11.3 13.1 9.15 15.275Q7 17.45 7 20.5Q7 23.6 9.2 25.8Q11.4 28 14.5 28ZM24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Q24 17.5 24 17.5Z" />
      );
    case PARTLY_CLOUDED:
      return (
        <path
          d="M24 9.5Q23.35 9.5 22.925 9.075Q22.5 8.65 22.5 8V3.5Q22.5 2.85 22.925 2.425Q23.35 2 24 2Q24.65 2 25.075 2.425Q25.5 2.85 25.5 3.5V8Q25.5 8.65 25.075 9.075Q24.65 9.5 24 9.5ZM34.25 13.75Q33.8 13.3 33.8 12.675Q33.8 12.05 34.25 11.6L37.4 8.45Q37.9 7.95 38.5 7.975Q39.1 8 39.55 8.45Q40 8.9 40 9.5Q40 10.1 39.55 10.55L36.35 13.75Q35.9 14.2 35.3 14.2Q34.7 14.2 34.25 13.75ZM40 25.5Q39.35 25.5 38.925 25.075Q38.5 24.65 38.5 24Q38.5 23.35 38.925 22.925Q39.35 22.5 40 22.5H44.5Q45.15 22.5 45.575 22.925Q46 23.35 46 24Q46 24.65 45.575 25.075Q45.15 25.5 44.5 25.5ZM37.45 39.55 34.3 36.4Q33.85 35.95 33.85 35.325Q33.85 34.7 34.3 34.25Q34.75 33.8 35.375 33.8Q36 33.8 36.45 34.25L39.6 37.4Q40.1 37.9 40.075 38.5Q40.05 39.1 39.6 39.55Q39.15 40 38.55 40.025Q37.95 40.05 37.45 39.55ZM11.65 13.75 8.45 10.55Q8 10.1 8 9.5Q8 8.9 8.45 8.45Q8.9 8 9.475 7.975Q10.05 7.95 10.55 8.45L13.75 11.65Q14.2 12.1 14.2 12.7Q14.2 13.3 13.75 13.75Q13.3 14.2 12.7 14.2Q12.1 14.2 11.65 13.75ZM12 42Q7.75 42 4.875 39.125Q2 36.25 2 32Q2 27.85 4.95 24.925Q7.9 22 12 22Q12 22 12.05 22Q12.1 22 12.15 22Q12.85 17.7 16.2 14.85Q19.55 12 24 12Q29 12 32.5 15.5Q36 19 36 24Q36 27.75 33.825 30.9Q31.65 34.05 27.9 35.35Q27.65 37.85 25.65 39.925Q23.65 42 21 42ZM12 39H21Q22.8 39 23.9 37.9Q25 36.8 25 35Q25 33.2 23.9 32.075Q22.8 30.95 21.05 30.95H18.85L17.95 28.9Q17.2 27.1 15.575 26.05Q13.95 25 12 25Q9.15 25 7.075 27.075Q5 29.15 5 32Q5 34.95 7.025 36.975Q9.05 39 12 39ZM27.45 32.3Q30 31.3 31.5 29Q33 26.7 33 24Q33 20.25 30.375 17.625Q27.75 15 24 15Q20.75 15 18.175 17.1Q15.6 19.2 15.15 22.5Q17.1 23.35 18.55 24.75Q20 26.15 20.8 27.95Q22.85 27.95 24.675 29.2Q26.5 30.45 27.45 32.3Z" />
      );
    case CLOUDED:
      return (
        <path
          d="M12.55 40Q8.15 40 5.075 36.925Q2 33.85 2 29.45Q2 25.55 4.5 22.6Q7 19.65 10.85 19.05Q11.85 14.2 15.55 11.125Q19.25 8.05 24.1 8.05Q29.7 8.05 33.55 12.125Q37.4 16.2 37.4 21.9V23.1Q41 23 43.5 25.425Q46 27.85 46 31.55Q46 35 43.5 37.5Q41 40 37.55 40ZM12.55 37H37.55Q39.8 37 41.4 35.4Q43 33.8 43 31.55Q43 29.3 41.4 27.7Q39.8 26.1 37.55 26.1H34.4V21.9Q34.4 17.35 31.35 14.2Q28.3 11.05 23.9 11.05Q19.5 11.05 16.425 14.2Q13.35 17.35 13.35 21.9H12.4Q9.3 21.9 7.15 24.075Q5 26.25 5 29.45Q5 32.6 7.2 34.8Q9.4 37 12.55 37ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Z" />
      );
    default:
      return <path />;
  }
};

SVGIcon.defaultProps = {
  name: undefined,
  fill: 'black',
  height: '40px',
  width: '40px'
};

SVGIcon.propTypes = {
  name: string,
  fill: string,
  height: string,
  width: string
};

export default SVGIcon;
