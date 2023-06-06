import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { generateId, getClassNames, isEmpty, noOp, removeCamelCase } from '../../../tools/general/helpers.util';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';

import { handleRowDoubleClick, hideColumnHeader } from './TableFunctions.util';

import {
  CAMERA,
  CHARTS,
  CLOUDED,
  DROPDOWN,
  HARVEST,
  HARVEST_ICON,
  LOW_BATTERY,
  PARTLY_CLOUDED,
  PENCIL,
  RAIN_CLOUDS,
  RAINING,
  SUNNY,
  UNIT,
  WARNING,
  WATCH
} from '../../../tools/general/system-variables.util';
import ToolTipRelative from '../tool-tip/ToolTipRelative';
import RecommendationModal from '../modal/RecommendationModal';
import SVGIcon from '../SVGIcon/SVGIcon';
import { FieldCaptureBar } from './components/FieldCaptureBar';

import './table.scss';

export const ClientFieldsTable = ({
                                    tableName,
                                    activeTableData,
                                    hiddenColumns,
                                    setSelectedIndex,
                                    setSelectedDropdownObject,
                                    setSelectedCaptureObject,
                                    toggleDropdowns,
                                    captureDate,
                                    setCaptureDate,
                                    captureValue,
                                    setCaptureValue,
                                    captureType,
                                    setCaptureType,
                                    captureField,
                                    setCaptureField,
                                    mappedChartList,
                                    activeLoadPeriod,
                                    setActiveLoadPeriod,
                                    setActiveFieldName,
                                    setActiveFieldProbeNumber,
                                    quickViewIsOpen,
                                    setQuickViewIsOpen,
                                    setRowClickId,
                                    setSelectedPhotoName,
                                    imageViewerIsOpen,
                                    setImageViewerIsOpen,
                                    photoClicked,
                                    setPhotoClicked
                                  }) => {

  const history = useHistory();
  const { groupName, clientName } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(undefined);
  const [hoveredRowObject, setHoveredRowObject] = useState(undefined);

  const buildTableHeader = () => {
    if (!activeTableData) return;
    let headers;
    if (activeTableData?.length !== 0) {
      const objectKeys = Object.keys(activeTableData[0]);
      headers = objectKeys.filter((key) => !hiddenColumns.includes(key)).map((key) => (
        <th key={ generateId() }
            style={ { color: hideColumnHeader(tableName, key) } }>
          <div className="table__header-row__text">
            { removeCamelCase(key) }
          </div>
        </th>
      ));
    }

    return (
      <thead className="table__header">
      <tr className="table__header-row">
        { headers }
      </tr>
      </thead>
    );
  };

  const buildTableBody = () => {
    if (!activeTableData) return;
    const rows = activeTableData?.map((object, rowIndex) => {
      let objectLocationName = object?.fieldName?.locationName;
      let isHeaderRow = (objectLocationName?.includes('-forecast') || objectLocationName?.includes('-landGroup'));
      let isDropdownRow = !!(object?.b?.sublande);

      const objectValues = [];
      for (const property in object) {
        if (!hiddenColumns.includes(property)) {
          objectValues.push(object[property]);
        }
      }

      let tableDataElements = [];
      if (activeTableData?.length > 0) {
        tableDataElements = objectValues?.map((value, dataIndex) => {
          switch (dataIndex) {
            case 0:
              return <FieldNameColumn dataIndex={ dataIndex }
                                      value={ value } />;
            case 1:
              return <WarningIconColumn dataIndex={ dataIndex }
                                        value={ value } />;
            case 2:
              return <DropdownIconColumn dataIndex={ dataIndex }
                                         value={ value }
                                         setSelectedIndex={ setSelectedIndex }
                                         setSelectedDropdownObject={ setSelectedDropdownObject }
                                         rowIndex={ rowIndex }
                                         object={ object }
                                         toggleDropdowns={ toggleDropdowns } />;
            case 3:
              return <PhotoIconColumn dataIndex={ dataIndex }
                                      value={ value }
                                      setSelectedPhotoName={ setSelectedPhotoName }
                                      imageViewerIsOpen={ imageViewerIsOpen }
                                      setImageViewerIsOpen={ setImageViewerIsOpen }
                                      photoClicked={ photoClicked }
                                      setPhotoClicked={ setPhotoClicked } />;
            case 4:
              return <LastReadingColumn dataIndex={ dataIndex }
                                        value={ value } />;

            case 5:
              return <CaptureNoteColumn dataIndex={ dataIndex }
                                        rowIndex={ rowIndex }
                                        value={ value }
                                        object={ object }
                                        captureDate={ captureDate }
                                        setCaptureDate={ setCaptureDate }
                                        captureType={ captureType }
                                        setCaptureType={ setCaptureType }
                                        captureValue={ captureValue }
                                        setCaptureValue={ setCaptureValue }
                                        captureField={ captureField }
                                        setCaptureField={ setCaptureField }
                                        setSelectedIndex={ setSelectedIndex }
                                        setSelectedCaptureObject={ setSelectedCaptureObject }
                                        setRowClickId={ setRowClickId }
                                        isHeaderRow={ isHeaderRow } />;
            case 6:
              return <ChartColumn dataIndex={ dataIndex }
                                  object={ object }
                                  mappedChartList={ mappedChartList }
                                  activeLoadPeriod={ activeLoadPeriod }
                                  setActiveLoadPeriod={ setActiveLoadPeriod }
                                  setActiveFieldName={ setActiveFieldName }
                                  setActiveFieldProbeNumber={ setActiveFieldProbeNumber }
                                  value={ value }
                                  quickViewIsOpen={ quickViewIsOpen }
                                  setQuickViewIsOpen={ setQuickViewIsOpen } />;
            case 7:
              return <DeficitColumn dataIndex={ dataIndex }
                                    value={ value }
                                    isDropdownRow={ isDropdownRow }
                                    isHeaderRow={ isHeaderRow } />;
            case 8:
              return <UnitColumn dataIndex={ dataIndex }
                                 value={ value } />;
            case 9:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 9 }
                                              value={ value } />;
            case 10:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 10 }
                                                value={ value } />;
            case 11:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 11 }
                                              value={ value } />;
            case 12:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 12 }
                                                value={ value } />;
            case 13:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 13 }
                                              value={ value } />;

            case 14:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 14 }
                                                value={ value } />;
            case 15:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 15 }
                                              value={ value } />;
            case 16:
              return <ForecastTimeIconsColumn dataIndex={ dataIndex }
                                              value={ value }
                                              isHeaderRow={ isHeaderRow } />;
            case 17:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 16 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 18:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 17 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 19:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 18 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 20:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 19 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 21:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 20 }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 22:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 21 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 23:
            case 24:
            case 25:
              return <TransEvapTotalsColumn dataIndex={ dataIndex }
                                            value={ value } />;
            default:
              return <td key={ dataIndex } />;
          }
        });
      }

      return (
        <>
          { !isDropdownRow &&
          <tr className={ getClassNames('table__body__row',
            { header: isHeaderRow, hidden: !(object?.fieldName?.locationName), selected: (object === selectedRow) }) }
              onMouseDown={ () => setSelectedRow(object) }
              onDoubleClick={ !isHeaderRow ? () => handleRowDoubleClick(history, groupName, clientName, object?.fieldName) : null }
              key={ generateId() }>
            { tableDataElements }
          </tr> }

          { object.expanded && isDropdownRow &&
          <tr className={ 'table__body__row' }
              key={ generateId() }>
            { tableDataElements }
          </tr> }

          { object.captureExpanded && <>
            <FieldCaptureBar
              captureDate={ captureDate }
              setCaptureDate={ setCaptureDate }
              captureType={ captureType }
              setCaptureType={ setCaptureType }
              captureValue={ captureValue }
              setCaptureValue={ setCaptureValue }
            />
          </> }
        </>
      );
    });

    return (
      <tbody className="table__body">
      { (!isEmpty(rows)) ? rows :
        <tr key={ generateId() }>
          <td>{ `No active fields currently set up on ${ groupName?.toUpperCase() } - ${ clientName?.toUpperCase() }` }</td>
        </tr> }

      { showModal &&
      <RecommendationModal activeObject={ hoveredRowObject }
                           handleClose={ setShowModal } /> }
      </tbody>
    );
  };

  return (
    <table className="table">
      { buildTableHeader() }
      { buildTableBody() }
    </table>
  );
};

ClientFieldsTable.propTypes = {
  tableName: string.isRequired,
  activeTableData: arrayOf(shape({})),
  hiddenColumns: arrayOf(string).isRequired
};

const FieldNameColumn = ({ dataIndex, value }) => {

  const getColor = (color) => {
    switch (color) {
      case '4278190080':
        return undefined;
      case '4294901760':
        return '#FF0000';
      case '4278190335':
        return '#0090ff';
    }
  };

  if (value?.locationName?.includes('-forecast')) {
    return <td onClick={ noOp() }
               key={ generateId() }>
      <div className={ 'table__body__row__td-container-forecast' }>
        <div className={ 'table__body__row__td-container-forecast-upper' }>{ value?.locationName?.slice(0, -9) }</div>
        <div className={ 'table__body__row__td-container-forecast-lower' }>{ value?.summary }</div>
      </div>
    </td>;
  } else if (value?.locationName?.includes('-landGroup')) {
    return <td onClick={ noOp() }
               key={ generateId() }>
      <div className={ 'table__body__row__td-container-landgroup' }>
        { value?.locationName?.slice(0, -10) }
      </div>
    </td>;
  } else {
    return <td onClick={ noOp() }
               key={ generateId() }
               className="min-w-fit">
      <div className={ 'table__body__row__td-container' }>

        <div className={ 'table__body__row__td-upper' }
             style={ { color: getColor(value?.color) } }>
          { value?.locationName }
        </div>

        <div className={ 'table__body__row__td-lower' }>
          { value?.type }
        </div>

      </div>
      <DropDown value={ value }
                columnNumber={ 0 } />
    </td>;
  }
};

FieldNameColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({})
};

const WarningIconColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ generateId() }>
      <div className={ 'table__body__row__td-container' }>
        <ToolTipRelative text={ value } />
        <SVGIcon name={ WARNING }
                 fill={ '#EE9A94' } />
      </div>
    </td>;
  else
    return <td key={ dataIndex } />;
};

WarningIconColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string
};

const DropdownIconColumn = ({
                              dataIndex,
                              value,
                              setSelectedIndex,
                              setSelectedDropdownObject,
                              rowIndex,
                              object,
                              toggleDropdowns
                            }) => {
  if (value)
    return <td key={ generateId() }
               onContextMenu={ e => {
                 e.preventDefault();
                 toggleDropdowns();
               } }
               onClick={ () => {
                 setSelectedIndex(rowIndex);
                 setSelectedDropdownObject(object);
               } }>
      { (value?.tooltip) &&
      <div className={ 'table__body__row__td-container__icon-clickable' }>
        <ToolTipRelative text={ value?.tooltip } />
        <SVGIcon name={ DROPDOWN }
                 fill={ '#53A5DF' } />
      </div> }
      <DropDown value={ value }
                columnNumber={ 2 } />
    </td>;
  else
    return <td key={ generateId() } />;
};

DropdownIconColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({}),
  setSelectedIndex: func.isRequired,
  setSelectedDropdownObject: func.isRequired,
  rowIndex: number.isRequired,
  object: shape({}).isRequired
};

const PhotoIconColumn = ({ dataIndex, value, setSelectedPhotoName, setImageViewerIsOpen, imageViewerIsOpen, photoClicked, setPhotoClicked }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ generateId() }
               onMouseUp={ () => {
                 setPhotoClicked(!photoClicked);
                 setSelectedPhotoName(value?.photoName);
                 setImageViewerIsOpen(!imageViewerIsOpen);
               } }>
      { value?.tooltip &&
      <div className={ 'table__body__row__td-container__icon-clickable' }>
        <ToolTipRelative text={ value?.tooltip } />
        <SVGIcon name={ CAMERA }
                 fill={ '#043b6e' } />
      </div> }
    </td>;
  else
    return <td key={ generateId() } />;
};

PhotoIconColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({})
};

const LastReadingColumn = ({ value }) => {
  if (!value) return <td key={ generateId() } />;

  const reading = value?.lastReading.includes('1970/') ? '---' : value?.lastReading;

  return (
    <td onClick={ noOp() } key={ generateId() }>
      <div className="table__body__row__td-container__icon-clickable" style={ { color: '#0090ff' } }>
        { !value?.lastReading.includes('now') && <ToolTipRelative text={ value?.tooltip } /> }

        <p className={ value?.hasBattery ? 'table__body__row__td-container__battery-text' : 'table__body__row__td-container__text' }>
          { reading }
        </p>

        { value?.hasBattery && !value?.lastReading.includes('now') && <SVGIcon name={ LOW_BATTERY } fill="orange" /> }
      </div>
    </td>
  );
};

LastReadingColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({})
};

const CaptureNoteColumn = ({
                             rowIndex,
                             value,
                             object,
                             setCaptureField,
                             setSelectedIndex,
                             setSelectedCaptureObject,
                             setRowClickId,
                             isHeaderRow
                           }) => {
  if (value)
    return (
      <td key={ generateId() }
          onMouseUp={ () => {
            setSelectedIndex(rowIndex);
            setSelectedCaptureObject(object);
            setCaptureField(object.fieldName.locationName);
            setRowClickId(Date.now());
          } }>

        { !isHeaderRow && <div>
          <SVGIcon name={ PENCIL } />
        </div> }

        <ToolTipRelative text={ value } />

      </td>
    );
  else return <></>;
};

CaptureNoteColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({})
};

const ChartColumn = ({
                       value,
                       object,
                       setQuickViewIsOpen,
                       setActiveFieldName,
                       setActiveFieldProbeNumber
                     }) => {

  if (value)
    return <td key={ generateId() }
               onMouseDown={ () => {
                 setActiveFieldName(object.fieldName.locationName);
                 setActiveFieldProbeNumber(object.fieldName.probeNumber);
                 setQuickViewIsOpen(true);
               } }>
      <div className={ 'table__body__row__td-container__icon-clickable' }>
        <ToolTipRelative text={ value } />
        <SVGIcon name={ CHARTS } />
      </div>
    </td>;
  else
    return <td key={ generateId() } />;
};

const DeficitColumn = ({ dataIndex, value, isDropdownRow, isHeaderRow }) => {
  return <td onClick={ noOp() }
             key={ generateId() }>
    { !isDropdownRow &&
    <div className={ 'table__body__row__td-container' }
         style={ { margin: '1px 0 1px 0' } }>
      { value?.tooltip && <ToolTipRelative text={ value?.tooltip } /> }
      <div className={ 'table__body__row__td-upper--deficit' }
           style={ {
             backgroundColor: value?.colorTop === '#F9FFFA' ? '#a1c98a' : value?.colorTop
           } }>
        { value?.top }
      </div>
      <div className={ (isHeaderRow) ? 'table__body__row__td-lower' : 'table__body__row__td-lower--deficit' }
           style={ {
             backgroundColor: value?.colorBot === '#F9FFFA' ? '#a1c98a' : value?.colorBot
           } }>
        { value?.bottom }
      </div>
    </div> }
  </td>;
};

DeficitColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  isDropdownRow: bool,
  isHeaderRow: bool
};

const UnitColumn = ({ value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ generateId() }>
      <div className={ 'table__body__row__td-container' }>
        { value?.slice(0, 2) }
      </div>
    </td>;
  else
    return <td key={ generateId() } />;
};

UnitColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({})
};

const PrimaryForecastColumn = ({ value, columnNumber }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ generateId() }
               className={ 'table__body__row__td--dark' }>

      { (value?.comment) &&
      <div className={ 'table__body__row__td-container' }>
        <div> { (value?.data === 0) ? '' : value?.data }</div>
        <div> { value?.comment ? value?.comment : '' }</div>
      </div> }

      { (!value?.harvest) &&
      <div className={ 'table__body__row__td-container' }>
        <div> { (value?.data === 0) ? '' : value?.data }</div>
      </div> }

      { (value?.harvest && (value?.data === 0)) &&
      <div className={ 'table__body__row__td-container__icon-right' }>
        <ToolTipRelative text={ HARVEST } />
        <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
      </div> }

      { (value?.harvest && value?.data !== 0) &&
      <div className={ 'table__body__row__td-container' }>
        { (value?.data === 0) ? '' : value?.data }
        <div className={ 'table__body__row__td-container__icon' }>
          <ToolTipRelative text={ HARVEST } />
          <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
        </div>
      </div> }
      <DropDown value={ value }
                columnNumber={ columnNumber } />
    </td>;
  else
    return <td key={ generateId() } />;
};

PrimaryForecastColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  columnNumber: number.isRequired
};

const SecondaryForecastColumn = ({ dataIndex, value, columnNumber }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ generateId() }
               className={ 'table__body__row__td--light' }>

      { (value?.comment) &&
      <div className={ 'table__body__row__td-container' }>
        <div> { (value?.data === 0) ? '' : value?.data }</div>
        <div> { value?.comment ? value?.comment : '' }</div>
      </div> }

      { (!value?.harvest) &&
      <div className={ 'table__body__row__td-container' }>
        <div> { (value?.data === 0) ? '' : value?.data }</div>
      </div> }

      { (value?.harvest && (value?.data === 0)) &&
      <div className={ 'table__body__row__td-container__icon-right' }>
        <ToolTipRelative text={ HARVEST } />
        <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
      </div> }

      { (value?.harvest && value?.data !== 0) &&
      <div className={ 'table__body__row__td-container' }>
        { (value?.data === 0) ? '' : value?.data }
        <div className={ 'table__body__row__td-container__icon' }>
          <ToolTipRelative text={ HARVEST } />
          <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
        </div>
      </div> }
      <DropDown value={ value }
                columnNumber={ columnNumber } />
    </td>;
  else
    return <td key={ generateId() } />;
};

SecondaryForecastColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  columnNumber: number.isRequired
};

const LandGroupForecastColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ generateId() }>

      <div className={ 'table__body__row__td-weather' }>
        <div className={ 'table__body__row__td-weather-left' }>
          <div className={ 'table__body__row__td-weather-left--icon' }>
            <div className={ 'table__body__row__td-weather-left--icon-container' }>
              { (() => {
                switch (value?.sid) {
                  case 1:
                    return <SVGIcon name={ SUNNY } fill={ '#FDC633' } />;
                  case 9:
                  case 10:
                  case 41:
                  case 46:
                    return <SVGIcon name={ RAINING } fill={ '#6495ED' } />;
                  case 2:
                    return <SVGIcon name={ PARTLY_CLOUDED } fill={ '#C2C2C1' } />;
                  case 3:
                  case 4:
                    return <SVGIcon name={ CLOUDED } fill={ '#C2C2C1' } />;
                }
              })() }
            </div>
          </div>
          <div className={ 'table__body__row__td-weather-left--wind' }>
            { value?.windDisplay }
          </div>
        </div>
        <div className={ 'table__body__row__td-weather-right' }>
          <div className={ 'table__body__row__td-weather-right--max' }>
            { `${ value?.maks }°C` }
          </div>
          <div className={ 'table__body__row__td-weather-right--min' }>
            { `${ value?.min }°C` }
          </div>
          <div className={ 'table__body__row__td-weather-right--weer' }>
            { value?.weer }
          </div>
        </div>
      </div>
    </td>;
  else
    return <td key={ generateId() } />;
};

LandGroupForecastColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({})
};

const ForecastTimeIconsColumn = ({ dataIndex, value, isHeaderRow }) => {
  if (value && !isHeaderRow)
    return <td onClick={ noOp() }
               key={ generateId() }
               className={ 'table__body__row__td--fade--thin' }>
      { !value?.dropdown &&
      <>
        <ToolTipRelative text={ UNIT } />
        <SVGIcon name={ RAIN_CLOUDS } fill={ '#043b6e' } tiny />
        <SVGIcon name={ WATCH } fill={ '#043b6e' } tiny />
      </>
      }
    </td>;
  else
    return <td key={ generateId() } />;
};

ForecastTimeIconsColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string,
  isHeaderRow: bool
};

const RainDataColumn = ({ dataIndex, value, object, setHoveredRowObject, columnNumber, setShowModal, isHeaderRow }) => {

  const [holdChartOpen, setHoldChartOpen] = useState(false);

  const openModal = (sensor) => {
    setHoveredRowObject({
      ...object,
      sensor: sensor,
      day: (() => {
        switch (columnNumber) {
          case 20:
            return 6;
          case 21:
            return 5;
          default:
            return (columnNumber - 15);
        }
      })()
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setHoveredRowObject(undefined);
    setShowModal(false);
  };

  if (!isHeaderRow)
    return <td onClick={ noOp() }
               key={ generateId() }
               className={ 'table__body__row__td--fade' }>
      <div className={ 'table__body__row__td-container' }>
        <div onMouseEnter={ () => openModal(1) }
             style={ { color: holdChartOpen ? '#54a4d9' : null } }
             className={ 'table__body__row__td-container--hoverable' }
             onClick={ () => setHoldChartOpen(!holdChartOpen) }
             onMouseLeave={ holdChartOpen ? null : () => closeModal() }>
          { (value?.upper === 0) ? '' : value?.upper }
        </div>

        <div style={ { height: '2px' } } />

        <div onMouseEnter={ () => openModal(2) }
             className={ 'table__body__row__td-container--hoverable' }
             onClick={ () => setHoldChartOpen(!holdChartOpen) }
             onMouseLeave={ holdChartOpen ? null : () => closeModal() }>
          { (value?.lower === 0) ? '' : value?.lower }
        </div>
      </div>
      <DropDown value={ value }
                columnNumber={ columnNumber } />
    </td>;
  else
    return <td key={ dataIndex } />;
};

RainDataColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  object: shape({}),
  setHoveredRowObject: func.isRequired,
  columnNumber: number,
  setShowModal: func.isRequired
};

const TransEvapTotalsColumn = ({ dataIndex, value }) => {
  return <td onClick={ noOp() }
             key={ generateId() }>
    <div className={ 'table__body__row__td-container--centered' }>
      { value }
    </div>
  </td>;
};

TransEvapTotalsColumn.propTypes = {
  dataIndex: number.isRequired,
  value: number
};

const DropDown = ({ value, columnNumber, onClick }) => {
  return (
    <div className="table__body__row--dropdown">
      { value?.sublande?.map((item) => {
        return (
          <div className={ getClassNames('table__body__row--dropdown__icon', { left: (columnNumber === 0) }) }
               onClick={ onClick }
               key={ generateId() }>
            { (() => {
              switch (columnNumber) {
                case 0:
                  return item?.name;
                case 2:
                  return item?.pers;
                case 9:
                  return (item?.['aanb 1'] !== 0) ? item?.['aanb 1'] : '';
                case 10:
                  return (item?.['aanb 2'] !== 0) ? item?.['aanb 2'] : '';
                case 11:
                  return (item?.['aanb 3'] !== 0) ? item?.['aanb 3'] : '';
                case 12:
                  return (item?.['aanb 4'] !== 0) ? item?.['aanb 4'] : '';
                case 13:
                  return (item?.['aanb 5'] !== 0) ? item?.['aanb 5'] : '';
                case 14:
                  return (item?.['aanb 6'] !== 0) ? item?.['aanb 6'] : '';
                case 15:
                  return (item?.['aanb 7'] !== 0) ? item?.['aanb 7'] : '';
                case 21:
                  return (item?.['30d'] !== 0) ? item?.['30d'] : '';
                case 22:
                  return (item?.['Total'] !== 0) ? item?.['Total'] : '';
              }
            })() }
          </div>);
      }) }
    </div>
  );
};

DropDown.propTypes = {
  value: shape({}),
  columnNumber: number,
  onClick: func
};
