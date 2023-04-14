import React from 'react';

import { bisector } from 'd3';

import {
  CANOPY_LINE,
  CANOPY_OUTSIDE_TEMPERATURE,
  DAILY_ETO,
  DEFICIT,
  DEFICIT_ETO,
  EC,
  EXTENDED,
  HUMIDITY_LINE,
  LINE_100MM,
  LINE_200MM,
  LINE_300MM,
  LINE_400MM,
  LINE_600MM,
  LINE_800MM,
  OUTSIDE_LINE,
  RAIN_HUMIDITY,
  RAIN_LINE,
  SOIL_TEMPERATURE,
  TEMPERATURE_MULTILINE,
  VOLT_READINGS
} from '../../../../tools/general/system-variables.util';

import '../chart.scss';

const ChartTooltipText = ({
                            data,
                            date,
                            xAccessor,
                            yAccessor,
                            xScale,
                            yScale,
                            hoverActive,
                            setHoverActive,
                            chartName,
                            chartType,
                            clipPath,
                            hiddenLineList,
                            secondaryData
                          }) => {

  switch (chartType) {
    case TEMPERATURE_MULTILINE:
      return <TemperatureMultiLineText data={ data }
                                       date={ date }
                                       xScale={ xScale }
                                       xAccessor={ xAccessor }
                                       hoverActive={ hoverActive }
                                       clipPath={ clipPath }
                                       hiddenLineList={ hiddenLineList }
                                       chartName={ chartName } />;

    default:
      return <TooltipText data={ data }
                          date={ date }
                          xScale={ xScale }
                          yScale={ yScale }
                          xAccessor={ xAccessor }
                          yAccessor={ yAccessor }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          chartName={ chartName }
                          chartType={ chartType }
                          clipPath={ clipPath }
                          hiddenLineList={ hiddenLineList }
                          secondaryData={ secondaryData } />;
  }
};

export default ChartTooltipText;

const TemperatureMultiLineText = ({
                                    xAccessor,
                                    xScale,
                                    data,
                                    date,
                                    hoverActive,
                                    clipPath,
                                    hiddenLineList,
                                    chartName
                                  }) => {

  if (!data) return null;

  let x1;

  let hoveredObject1;
  let hoveredObject2;
  let hoveredObject3;
  let hoveredObject4;
  let hoveredObject5;
  let hoveredObject6;

  let dateBisector = bisector(xAccessor).center;

  if (data?.[0]) {
    hoveredObject1 = data?.[0][dateBisector(data?.[0], date)];
    x1 = xScale(xAccessor(data?.[0][Math.max(0, dateBisector(data?.[0], date))]));
  }
  if (data?.[1]) {
    hoveredObject2 = data?.[1][dateBisector(data?.[1], date)];
  }
  if (data?.[2]) {
    hoveredObject3 = data?.[2][dateBisector(data?.[2], date)];
  }
  if (data?.[3]) {
    hoveredObject4 = data?.[3][dateBisector(data?.[3], date)];
  }
  if (data?.[4]) {
    hoveredObject5 = data?.[4][dateBisector(data?.[4], date)];
  }
  if (data?.[5]) {
    hoveredObject6 = data?.[5][dateBisector(data?.[5], date)];
  }

  let toolTipText = (chart) => {
    switch (chart) {
      case LINE_100MM:
        return `100mm: ${ hoveredObject1?.y?.toFixed(2) }mm  @ ${ hoveredObject1?.x }`;
      case LINE_200MM:
        return `200mm: ${ hoveredObject2?.y?.toFixed(2) }mm @ ${ hoveredObject2?.x }`;
      case LINE_300MM:
        return `300mm: ${ hoveredObject3?.y?.toFixed(2) }mm @ ${ hoveredObject3?.x }`;
      case LINE_400MM:
        return `400mm: ${ hoveredObject4?.y?.toFixed(2) }mm @ ${ hoveredObject4?.x }`;
      case LINE_600MM:
        return `600mm: ${ hoveredObject5?.y?.toFixed(2) }mm @ ${ hoveredObject5?.x }`;
      case LINE_800MM:
        return `800mm: ${ hoveredObject6?.y?.toFixed(2) }mm @ ${ hoveredObject6?.x }`;
    }
  };

  const getXPos = () => {
    return { rect: x1 + 25, text: x1 + 35 };
  };

  const getYPos = (chart) => {
    switch (chart) {
      case LINE_100MM :
        return { rect: 50, text: 63 };
      case LINE_200MM :
        return { rect: 70, text: 83 };
      case LINE_300MM :
        return { rect: 90, text: 103 };
      case LINE_400MM :
        return { rect: 110, text: 123 };
      case LINE_600MM :
        return { rect: 130, text: 143 };
      case LINE_800MM :
        return { rect: 150, text: 163 };
    }
  };

  const getTextWidth = () => {
    return 250;
  };

  const renderText = (chart) => {
    if (!hiddenLineList?.includes(chart)) return false;
    return hoverActive;
  };

  if (chartName === SOIL_TEMPERATURE)
    return (<>
      { renderText(LINE_100MM) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_100MM } /> }

      { renderText(LINE_200MM) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_200MM } /> }

      { renderText(LINE_300MM) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_300MM } /> }

      { renderText(LINE_400MM) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_400MM } /> }

      { renderText(LINE_600MM) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_600MM } /> }

      { renderText(LINE_800MM) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_800MM } /> }
    </>);
  else if (chartName === CANOPY_OUTSIDE_TEMPERATURE)
    return (<>
      { renderText(CANOPY_LINE) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_100MM } /> }

      { renderText(OUTSIDE_LINE) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_200MM } /> }
    </>);
  else if (chartName === RAIN_HUMIDITY)
    return (<>
      { renderText(RAIN_LINE) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_100MM } /> }

      { renderText(HUMIDITY_LINE) &&
      <TextBox clipPath={ clipPath }
               getXPos={ getXPos }
               getYPos={ getYPos }
               getTextWidth={ getTextWidth }
               toolTipText={ toolTipText }
               textBoxName={ LINE_200MM } /> }
    </>);

};

const TextBox = ({ clipPath, getXPos, getYPos, getTextWidth, toolTipText, textBoxName }) => {
  return (
    <g className="tooltip-container"
       clipPath={ clipPath }>
      <rect className="tooltip-container__rect"
            fill={ 'white' }
            x={ getXPos().rect }
            y={ getYPos(textBoxName).rect }
            height={ 18 }
            width={ getTextWidth() }
            rx={ '5' }
            ry={ '5' } />

      <text className="tooltip-container__text"
            x={ getXPos().text }
            y={ getYPos(textBoxName).text }
            fontSize={ '12' }
            fontWeight={ 800 }>
        { toolTipText(textBoxName) }
      </text>
    </g>
  );
};

const TooltipText = ({
                       xAccessor,
                       yAccessor,
                       xScale,
                       yScale,
                       data,
                       date,
                       hoverActive,
                       chartName,
                       chartType,
                       clipPath,
                       hiddenLineList,
                       secondaryData
                     }) => {

  let dateBisector = bisector(xAccessor).center;

  let hoveredObject = data[dateBisector(data, date)];

  let x1 = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y1 = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  let secondaryHoveredObject;

  let x2;
  let y2;

  if (secondaryData) {
    x2 = xScale(xAccessor(secondaryData[Math.max(0, dateBisector(secondaryData, date))]));
    y2 = yScale(yAccessor(secondaryData[Math.max(0, dateBisector(secondaryData, date))]));
    secondaryHoveredObject = secondaryData[dateBisector(secondaryData, date)];
  }

  const getTextWidth = () => {
    if (chartName === DEFICIT_ETO) return 160;
    if (chartType === EXTENDED) return 220;
    else if (chartType === DEFICIT) return 210;
    else if (chartName === DAILY_ETO) return 180;
    else return 160;
  };

  const renderText = (chart) => {
    if (hoveredObject?.barY === -0.1) return false;
    if (chartName === DAILY_ETO) return !!(hiddenLineList?.includes(chart) && hoverActive && hoveredObject?.y);
    else if (chart !== 'Actual' && hoverActive && hoveredObject?.y) return true;
    else if (hoveredObject?.barY && hoverActive && y1) return true;
  };

  const tooltipX = x1 + 20;
  const tooltipY = y1 < 30 ? y1 : y1 - 40;

  const getTooltipContent = () => {
    if (chartName.includes('deficit')) {
      return [
        { icon: '📅', value: hoveredObject?.x },
        { icon: '📏', value: hoveredObject?.y ? `${ hoveredObject?.y }mm` : '' },
        { icon: hoveredObject?.temp ? '🌡️' : '', value: hoveredObject?.temp ? `${ hoveredObject?.temp }C` : '' },
        { icon: hoveredObject?.percent ? '💧💧' : '', value: hoveredObject?.percent ? `${ hoveredObject?.percent }%` : '' }
      ];
    } else if (chartName === DEFICIT_ETO) {
      return [
        { icon: '📅', value: hoveredObject?.x },
        { icon: hoveredObject?.barY ? '💧💧' : '', value: hoveredObject?.barY ? `${ hoveredObject?.barY }%` : '' },
        { icon: hoveredObject?.lineY ? '💧' : '', value: hoveredObject?.lineY ? `${ hoveredObject?.lineY.toFixed(2) }%` : '' }
      ];
    } else if (chartName === VOLT_READINGS) {
      return [
        { icon: '📅', value: hoveredObject?.x },
        { icon: '📏', value: hoveredObject?.y ? `${ hoveredObject?.y }mm` : '' }
      ];
    } else if (chartName === EC) {
      return [
        { icon: '📅', value: hoveredObject?.x },
        { icon: '📏', value: hoveredObject?.y ? `${ hoveredObject?.y }mm` : '' }
      ];
    } else if (chartName === DAILY_ETO) {
      return [
        { icon: '📅', value: hoveredObject?.x },
        { icon: '📏', value: hoveredObject?.y ? `${ hoveredObject?.y }mm` : '' },
        { icon: '📏', value: secondaryHoveredObject?.y ? `${ secondaryHoveredObject?.y }mm` : '' }
      ];
    } else if (hoveredObject?.barY && hoverActive) {
    } else {
      return [
        { icon: '📅', value: hoveredObject?.x },
        { icon: '📏', value: hoveredObject?.y ? `${ hoveredObject?.y }mm` : '' }
      ];
    }
  };

  return hoverActive && (
    <>
      { renderText('Forecast') &&
      <g className="tooltip-container" transform={ `translate(${ tooltipX }, ${ tooltipY })` } clipPath={ clipPath }>
        <rect
          className="tooltip-container__rect"
          x="0"
          y="0"
          rx="20"
          ry="20"
          width={ getTextWidth() }
          height="50"
          fill="#f0f0f0"
          stroke="none"
          opacity={ 0.8 }
          style={ {
            boxShadow:
              '13px 13px 15px rgba(0, 0, 0, 0.1), -3px -3px 5px rgba(255, 255, 255, 0.7)'
          } }
        />
        { getTooltipContent()?.map((item, index) => (
          <React.Fragment key={ index }>
            <text
              x={
                index === 0
                  ? 20
                  : index === 2
                    ? 93
                    : index === 3
                      ? 138
                      : (index - 1) * 60 + 20
              }
              y={ index === 0 ? 20 : 40 }
              font-family="sans-serif"
              font-size="10px"
            >
              { item.icon }
            </text>
            <text
              x={
                index === 0
                  ? 40
                  : index === 2
                    ? 104
                    : index === 3
                      ? 160
                      : (index - 1) * 55 + 40
              }
              y={ index === 0 ? 20 : 40 }
              font-family="monospace"
              fontWeight={ 'bold' }
              font-size="10px"
            >
              { item.value }
            </text>
          </React.Fragment>
        )) }
      </g> }
    </>
  );
};
