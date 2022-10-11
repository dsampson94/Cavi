import { getClassNames } from '../../../../tools/general/helpers.util';

import {
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
  CHART_USAGE_MENU,
  CHART_USAGE_SASRI_MENU,
  CIRCLE_DROPDOWN,
  DAILY_ETO,
  EXTENDED,
  SETTINGS_GEAR,
  SINGLE_DROPDOWN
} from '../../../../tools/general/system-variables.util';

import { chartByName } from '../Chart.util';

import SVGIcon from '../../icon/SVGIcon';
import CheckboxInput from '../../input/checkbox/CheckboxInput';
import DropDownButton from '../../drop-down/DropDownButton';

import './../chart.scss';

const ChartHeader = ({ chartName, chartType, isDarkMode, activeExtendedChart, setActiveExtendedChart }) => {

  return (
    <div className={ getClassNames('chart__header__container',
      { usage: (chartType === EXTENDED) }) }>
      <div className={ getClassNames('chart__header', {
        top: chartName === AGGREGATE_TOP_SOIL,
        bottom: chartName === AGGREGATE_BOTTOM_SOIL
      }) }
           style={ {
             marginTop: chartByName(chartName).marginTop,
             backgroundColor: chartByName(chartName, isDarkMode).backgroundColor
           } }>

        <div className="chart__header__zoom-options">

          { chartName === AGGREGATE_TOP_SOIL &&
          <div className="chart__header__zoom-options--left-top">
            <div className="chart__header__zoom-options--left-top__settings">
              <SVGIcon name={ SETTINGS_GEAR } />
            </div>
            <CheckboxInput constant={ 'Hide rain' } />
          </div> }

          { chartType === EXTENDED &&
          <div className="chart__header__zoom-options--left-top">
            <DropDownButton name={ CIRCLE_DROPDOWN }
                            activeExtendedChart={ activeExtendedChart }
                            setActiveExtendedChart={ setActiveExtendedChart }
                            className={ 'chart__header__zoom-options--left-top__options' }
                            menu={ CHART_USAGE_MENU } />

            <DropDownButton name={ SINGLE_DROPDOWN }
                            className={ 'chart__header__zoom-options--left-top__options' }
                            menu={ CHART_USAGE_SASRI_MENU } />
          </div> }

          { chartName === DAILY_ETO &&
          <div className="chart__header__zoom-options--left-bottom"></div> }
        </div>

        { !chartName.includes('deficit') &&
        <div className="chart__header__center-text">
          { chartName === AGGREGATE_TOP_SOIL && <p>{ 'Top Soil' }</p> }
          { chartName === AGGREGATE_BOTTOM_SOIL && <p style={ { paddingBottom: '5%' } }>{ 'Bottom Soil' }</p> }
          { chartType === EXTENDED && <p>{ chartName }</p> }
          { chartName === DAILY_ETO && <p>{ 'Daily ETo' }</p> }
        </div> }

        { chartName === AGGREGATE_TOP_SOIL &&
        <div className={ getClassNames('chart__header__rain--top',
          { lower: !(chartName === AGGREGATE_TOP_SOIL) }) }>
          { 'Total rain for season: 0' }
        </div> }

        { chartName === AGGREGATE_BOTTOM_SOIL &&
        <div className={ getClassNames('chart__header__rain',
          { lower: !(chartName === AGGREGATE_BOTTOM_SOIL) }) }>
        </div> }

        { chartType === EXTENDED &&
        <div className={ getClassNames('chart__header__rain',
          { lower: !(chartType === EXTENDED) }) }>
        </div> }

        { chartName === DAILY_ETO &&
        <div className={ getClassNames('chart__header__rain',
          { lower: !(chartName === DAILY_ETO) }) }>
        </div> }
      </div>
    </div>
  );
};

export default ChartHeader;
