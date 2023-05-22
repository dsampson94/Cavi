import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Routes } from '../../../routes';

import {
  EMAIL,
  EMAIL_RECOMMENDATIONS,
  FIELD_SETTINGS,
  FIELD_SETUP_STRING,
  GENERAL_ROUTE,
  MAPS,
  MAPS_ICON,
  PRINT,
  PRINT_ICON,
  PROBES_MONITOR,
  PROBES_MONITOR_STRING,
  RECOMMENDATION_LIST,
  TABLE_LIST,
  WEATHER_STATION,
  WEATHER_STATION_ICON
} from '../../../tools/general/system-variables.util';

import { setClientMonitorProbesList } from '../../../redux/actions/client.action';

import Button from '../button/Button';

import './top-bar.scss';

export const TopBarButtons = ({ getPDF, getPDFAndEmail, modal }) => {

  const { groupName, clientName } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className={ modal ? 'top-bar__left__buttons-modal' : 'top-bar__left__buttons' }>

      { (location?.pathname?.includes('chart') ||
          location?.pathname?.includes('setup') ||
          location?.pathname?.includes('report') ||
          location?.pathname?.includes('temperature')) &&
        <Button icon={ TABLE_LIST }
                tooltip={ RECOMMENDATION_LIST }
                onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) } /> }

      { !location?.pathname?.includes('dashboard') && !location?.pathname?.includes('setup') &&
        <Button icon={ FIELD_SETTINGS }
                tooltip={ FIELD_SETUP_STRING }
                onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-setup/${ GENERAL_ROUTE }`) } /> }

      { !location?.pathname?.includes('overview') && <>
        <Button icon={ PRINT_ICON }
                onClick={ getPDF }
                tooltip={ PRINT } />

        <Button icon={ EMAIL_RECOMMENDATIONS }
                onClick={ getPDFAndEmail }
                tooltip={ EMAIL } />


        <Button icon={ PROBES_MONITOR }
                tooltip={ PROBES_MONITOR_STRING }
                onClick={ () => {
                  dispatch(setClientMonitorProbesList([]));
                  history.push(Routes.MONITOR);
                } } />

        <Button icon={ WEATHER_STATION_ICON }
                tooltip={ WEATHER_STATION } />

        <Button icon={ MAPS_ICON }
                tooltip={ MAPS } />
      </> }

    </div>
  );
};
