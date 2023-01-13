import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';

import { getRequestParams } from '../../../redux/endpoints';

import {
  CROP_FACTORS_TAB_NAME,
  FIELD_CHARTS_MODAL_VIEW,
  GENERAL_TAB_NAME,
  IRRISYS_TAB_NAME,
  PROBES_DETAILED_TAB_NAME,
  PROBES_SUMMARY_TAB_NAME,
  ROOTS_TAB_NAME,
  SENSORS_TAB_NAME
} from '../../../tools/general/system-variables.util';

import {
  requestFieldSetupList,
  SET_FIELD_SETUP_CROP_FACTORS_LIST,
  SET_FIELD_SETUP_GENERAL_LIST,
  SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST,
  SET_FIELD_SETUP_PROBES_DETAILED_LIST,
  SET_FIELD_SETUP_PROBES_LIST,
  SET_FIELD_SETUP_ROOTS_LIST,
  SET_FIELD_SETUP_SENSORS_LIST
} from '../../../redux/actions/field.action';

import Button from '../button/Button';
import Table from '../table/Table';

import './field-charts-modal.scss';

const FieldChartsModal = ({ setShowChartsModal }) => {

  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(380);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [originalX, setOriginalX] = useState(0);
  const [originalY, setOriginalY] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [activeTab, setActiveTab] = useState(GENERAL_TAB_NAME);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resizer')) {
      setIsResizing(true);
      setOriginalX(e.clientX);
      setOriginalY(e.clientY);
      setOriginalWidth(width);
      setOriginalHeight(height);
    } else {
      setIsDragging(true);
      setOriginalX(e.clientX - left);
      setOriginalY(e.clientY - top);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setLeft(e.clientX - originalX);
      setTop(e.clientY - originalY);
    }
    if (isResizing) {
      setWidth(originalWidth + (e.clientX - originalX));
      setHeight(originalHeight + (e.clientY - originalY));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  return (
    <div className={ 'field-charts-modal__container' }
         onMouseDown={ handleMouseDown }
         onMouseMove={ handleMouseMove }
         onMouseUp={ handleMouseUp }
         onMouseLeave={ handleMouseUp }>

      <div className={ 'field-charts-modal' }
           style={ {
             width,
             height,
             left,
             top
           } }>

        <TabButtons activeTab={ activeTab }
                    setActiveTab={ setActiveTab }
                    setShowChartsModal={ setShowChartsModal } />

        <ActiveTab activeTab={ activeTab }
                   setActiveTab={ setActiveTab } />
      </div>

      <div className={ 'resizer' }
           style={ {
             width: width + 120,
             height: + 480,
             left: left + 200,
             top: top - 20,
             position: 'absolute'
           } } />
    </div>
  );
};

FieldChartsModal.propTypes = {};

export default FieldChartsModal;

const TabButtons = ({ activeTab, setActiveTab, setShowChartsModal }) => {

  const handleTabClick = (selectedTab) => setActiveTab(selectedTab);

  return (
    <div className={ 'field-charts-modal__header' }>
      <Button label={ GENERAL_TAB_NAME }
              active={ (activeTab === GENERAL_TAB_NAME) }
              onClick={ () => handleTabClick(GENERAL_TAB_NAME) }
              tab />

      <Button label={ CROP_FACTORS_TAB_NAME }
              active={ (activeTab === CROP_FACTORS_TAB_NAME) }
              onClick={ () => handleTabClick(CROP_FACTORS_TAB_NAME) }
              tab />

      <Button label={ PROBES_SUMMARY_TAB_NAME }
              active={ (activeTab === PROBES_SUMMARY_TAB_NAME) }
              onClick={ () => handleTabClick(PROBES_SUMMARY_TAB_NAME) }
              tab />

      <Button label={ PROBES_DETAILED_TAB_NAME }
              active={ (activeTab === PROBES_DETAILED_TAB_NAME) }
              onClick={ () => handleTabClick(PROBES_DETAILED_TAB_NAME) }
              tab />

      <Button label={ ROOTS_TAB_NAME }
              active={ (activeTab === ROOTS_TAB_NAME) }
              onClick={ () => handleTabClick(ROOTS_TAB_NAME) }
              tab />

      <Button label={ IRRISYS_TAB_NAME }
              active={ (activeTab === IRRISYS_TAB_NAME) }
              onClick={ () => handleTabClick(IRRISYS_TAB_NAME) }
              tab />

      <Button label={ SENSORS_TAB_NAME }
              active={ (activeTab === SENSORS_TAB_NAME) }
              onClick={ () => handleTabClick(SENSORS_TAB_NAME) }
              tab />

      <Button label={ 'Close' }
              onClick={ () => setShowChartsModal(false) }
              tab />
    </div>
  );
};

const ActiveTab = ({ activeTab, setActiveTableData, selectedIndex, setSelectedIndex }) => {

  const dispatch = useDispatch();
  const { groupName, clientName, fieldName } = useParams();

  const generalList = useSelector(createSelector([state => state.field], field => field?.fieldSetupGeneralList));
  const probeSummaryList = useSelector(createSelector([state => state.field], field => field?.fieldSetupProbesList));
  const probeDetailedList = useSelector(createSelector([state => state.field], field => field?.fieldSetupProbesDetailedList));
  const sensorList = useSelector(createSelector([state => state.field], field => field?.fieldSetupSensorsList));
  const rootsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupRootsList));
  const cropFactorsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupCropFactorsList));
  const irrigationSystemList = useSelector(createSelector([state => state.field], field => field?.fieldSetupIrrigationSystemList));

  const request = getRequestParams({ groupName, clientName, fieldName });

  useEffect(() => {
    switch (activeTab) {
      case GENERAL_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupGeneralParams, SET_FIELD_SETUP_GENERAL_LIST));
        return;
      case CROP_FACTORS_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupCropFactorsParams, SET_FIELD_SETUP_CROP_FACTORS_LIST));
        return;
      case PROBES_SUMMARY_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupProbesParams, SET_FIELD_SETUP_PROBES_LIST));
        return;
      case PROBES_DETAILED_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupProbesDetailedParams, SET_FIELD_SETUP_PROBES_DETAILED_LIST));
        return;
      case ROOTS_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupRootsParams, SET_FIELD_SETUP_ROOTS_LIST));
        return;
      case IRRISYS_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupIrrigationSystemParams, SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST));
        return;
      case SENSORS_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupSensorParams, SET_FIELD_SETUP_SENSORS_LIST));
        return;
    }
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case GENERAL_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupGeneralParams, SET_FIELD_SETUP_GENERAL_LIST));
        return;
      case CROP_FACTORS_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupCropFactorsParams, SET_FIELD_SETUP_CROP_FACTORS_LIST));
        return;
      case PROBES_SUMMARY_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupProbesParams, SET_FIELD_SETUP_PROBES_LIST));
        return;
      case PROBES_DETAILED_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupProbesDetailedParams, SET_FIELD_SETUP_PROBES_DETAILED_LIST));
        return;
      case ROOTS_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupRootsParams, SET_FIELD_SETUP_ROOTS_LIST));
        return;
      case IRRISYS_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupIrrigationSystemParams, SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST));
        return;
      case SENSORS_TAB_NAME:
        dispatch(requestFieldSetupList(request.fieldSetupSensorParams, SET_FIELD_SETUP_SENSORS_LIST));
        return;
    }
  }, [activeTab]);

  const mappedFieldModalList = () => {
    return mapModalList(activeTab, generalList, cropFactorsList, probeSummaryList, probeDetailedList,
      rootsList, irrigationSystemList, sensorList, fieldName);
  };

  return (
    <div className="field-charts-modal__scroll">
      <Table tableName={ FIELD_CHARTS_MODAL_VIEW }
             activeTableData={ mappedFieldModalList() }
             setActiveTableData={ setActiveTableData }
             selectedIndex={ selectedIndex }
             setSelectedIndex={ setSelectedIndex } />
    </div>
  );
};

export const mapModalList = (activeTab, generalList, cropFactorsList, probeSummaryList, probeDetailedList,
                             rootsList, irrigationSystemList, sensorList, fieldName) => {

  let activeTabList = [];

  switch (activeTab) {
    case GENERAL_TAB_NAME:
      generalList?.lande?.forEach((field, index) => {
        if (fieldName === field?.land)
          activeTabList.push({
            ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
            field: { name: field?.land, color: (field?.kleur === 'blou') ? '#6495ED' : field?.kleur },
            currentCrop: field?.gewas,
            forecast: field?.gebied,
            group: field?.landgroep,
            ha: field?.ha,
            order: field?.orde,
            plantingDate: field?.plantdatum,
            harvestDate: field?.oesdatum,
            unit: field?.eenheid,
            maxMM: field?.maxmm
          });
      });
      return activeTabList;
    case CROP_FACTORS_TAB_NAME:
      cropFactorsList?.lande?.forEach((field, index) => {
        if (fieldName === field?.land)
          activeTabList.push({
            ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
            field: { name: field?.land },
            lusern: field?.lusern,
            permanentCrop: field?.perm,
            plantingDate: field?.pdte,
            harvestDate: field?.odte
          });
      });
      return activeTabList;
    case PROBES_SUMMARY_TAB_NAME:
      probeSummaryList?.lande?.forEach(field => {
        if (fieldName === field?.land)
          activeTabList.push({
            [' ']: `${ field?.land }*_*${ field?.probe }`,
            field: { name: field?.land },
            probe: { probe: field?.probe },
            status: field?.status,
            latitude: field?.lat,
            longitude: field?.lon
          });
      });
      return activeTabList;
    case PROBES_DETAILED_TAB_NAME:
      probeDetailedList?.lande?.forEach(field => {
        if (fieldName === field?.land)
          activeTabList.push({
            probe: { probe: field?.probe },
            field: field?.land,
            depthMMEnd: field?.dieptemm,
            depthMMLength: field?.dikte,
            VWK: field?.vwk,
            moistKonst: field?.mmkonst,
            moistKoef: field?.mmkoef,
            tempKoef: field?.tkoef,
            tempKonst: field?.tkonst,
            DT: field?.dt,
            status: field?.active
          });
      });
      return activeTabList;
    case ROOTS_TAB_NAME:
      rootsList?.lande?.forEach((field, index) => {
        if (fieldName === field?.land)
          activeTabList.push({
            ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
            [' ']: '',
            field: { name: field?.land },
            startDepth: field?.beginworteldiepte,
            germinationDays: field?.ontkiemperiode,
            ['growthRate / Day']: field?.wortelgroeitempo,
            schedulingDepth: field?.skeduleringsdiepte,
            maxDepth: field?.maksworteldiepte,
            drawFromBottomSoil: field?.ontrekuitondergrond
          });
      });
      return activeTabList;
    case IRRISYS_TAB_NAME:
      irrigationSystemList?.lande?.forEach((field, index) => {
        if (fieldName === field?.land)
          activeTabList.push({
            ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
            field: { name: field?.land },
            systemType: field?.besproeiingstelsel,
            ['irrigationRate (mm)']: field?.besprtoedientempo,
            ['profileUsed (%)']: field?.besprprofielbenutting,
            ['surfaceWetting (%)']: field?.besproppervlakbenatting,
            ['cropWetting (%)']: field?.besprgewasbenatting,
            ['effective (%)']: field?.besprdoeltreffendheid,
            ['irrigated @ 100% (mm)']: field?.besprmmby100,
            fasterMore: field?.besprondermeer,
            ['Hrs for 1 circle']: field?.bespromlooptyd,
            showVolume: field?.showvolume
          });
      });
      return activeTabList;
    case SENSORS_TAB_NAME:
      sensorList?.lande?.forEach(field => {
        if (fieldName === field?.land)
          activeTabList.push({
            ['']: `${ field?.land }*_*${ field?.probe }`,
            field: { name: field?.land },
            ['tipsSensor (port 1)']: field?.reentipe,
            ['tipsFactor (port 1)']: field?.tips,
            ['tipsYearStart (port 1)']: field?.rainstart,
            ['tipsSensor (port 2)']: field?.reentipe2,
            ['tipsFactor (port 2)']: field?.tips2,
            ['tipsYearStart (port 2)']: field?.rainstart2,
            THTSensor: field?.nvm,
            THTIrricomNumber: field?.nvm_irricom
          });
      });
      return activeTabList;
    default:
      return activeTabList;
  }
};
