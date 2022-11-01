import {
  BILLING_ROUTE,
  CLIENT_DETAILS_ROUTE,
  CROP_DETAILS_ROUTE,
  CROP_FACTORS_ROUTE,
  FIELDS_SPLIT_ROUTE,
  GENERAL_ROUTE,
  IRRIDAY_ROUTE,
  IRRISYS_ROUTE,
  MAP_ROUTE,
  ML_FORECASTS_ROUTE,
  PHENOLOGICAL_ROUTE,
  PROBES_DETAILED_ROUTE,
  PROBES_SUMMARY_ROUTE,
  PUSH_WARNING_ROUTE,
  ROOTS_ROUTE,
  SASRI_ROUTE,
  SENSORS_ROUTE,
  SMS_RECOMMENDATION_ROUTE,
  SMS_WARNING_ROUTE,
  USERS_ROUTE,
  WEATHER_STATION_ROUTE
} from '../../../tools/general/system-variables.util';

export const mapSetupList = (activeScreen, generalList, probeSummaryList, probeDetailedList, sensorList, rootsList, cropFactorsList,
                             cropDetailsList, weatherStationList, irrigationSystemList, irrigationDaysList, pushWarningsList,
                             SMSWarningsList, splitValvesList, billingList, usersList, clientDetailsList, SMSRecommendationsList,
                             MLForecastList, SASRIList, phenologicalList, mapList, clientName, groupName) => {

  switch (activeScreen) {
    case GENERAL_ROUTE:
      return generalList?.lande?.map((field, index) => {
        return {
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
        };
      });
    case PROBES_SUMMARY_ROUTE:
      return probeSummaryList?.lande?.map(field => {
        return {
          ['']: `${ field?.land }*_*${ field?.probe }`,
          field: { name: field?.land },
          probe: { probe: field?.probe, color: '#6495ED' },
          [' ']: field?.status,
          latitude: field?.lat,
          longitude: field?.lon,
          cellNumber: field?.selnommer,
          network: field?.selnetwerke,
          wv: field?.warnvolts,
          wve: field?.warnvolts_early
        };
      });
    case PROBES_DETAILED_ROUTE:
      return probeDetailedList?.lande?.map(field => {
        return {
          ['']: `${ field?.land }*_*${ field?.probe }`,
          probe: { probe: field?.probe },
          depthMMEnd: field?.probe,
          VWK: field?.vwk,
          moistKoef: field?.mmkoef,
          tempKoef: field?.tkoef,
          tempKonst: field?.tkonst
        };
      });
    case SENSORS_ROUTE:
      return sensorList?.lande?.map(field => {
        return {
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
        };
      });
    case ROOTS_ROUTE:
      return rootsList?.lande?.map((field, index) => {
        return {
          ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
          field: { name: field?.land },
          startDepth: field?.beginworteldiepte,
          germinationDays: field?.ontkiemperiode,
          ['growthRate / Day']: field?.wortelgroeitempo,
          schedulingDepth: field?.skeduleringsdiepte,
          maxDepth: field?.maksworteldiepte,
          drawFromBottomSoil: field?.ontrekuitondergrond
        };
      });
    case CROP_FACTORS_ROUTE:
      return cropFactorsList?.lande?.map((field, index) => {
        return {
          ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
          field: { name: field?.land },
          lusern: field?.lusern,
          permanentCrop: field?.perm,
          plantingDate: field?.pdte,
          harvestDate: field?.odte
        };
      });
    case CROP_DETAILS_ROUTE:
      return cropDetailsList?.lande?.map((field, index) => {
        return {
          ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
          field: { name: field?.land },
          ['rock %']: field?.soil_rock,
          ['sand %']: field?.soil_sand,
          ['soil %']: field?.soil_clay,
          cropType: field?.croptype,
          cultivar: field?.cultivar,
          subCultivar: field?.subcultivar,
          yearPlanted: field?.yearplanted
        };
      });
    case WEATHER_STATION_ROUTE:
      return weatherStationList?.lande?.map((field, index) => {
        return {
          ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
          field: { name: field?.land },
          cultivar: field?.cultivar,
          rainGuageFactor: field?.weerstasie_reen_faktor,
          ETOFormula: field?.etoformula,
          ETOFactor: field?.etofaktor,
          yearPlanted: field?.yearplanted
        };
      });
    case IRRISYS_ROUTE:
      return irrigationSystemList?.lande?.map((field, index) => {
        return {
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
        };
      });
    case IRRIDAY_ROUTE:
      return irrigationDaysList?.lande?.map((field, index) => {
        return {
          ['']: `${ field?.land }*_*${ probeSummaryList?.lande[index]?.probe }`,
          field: { name: field?.land },
          monday: field?.ma,
          tuesday: field?.di,
          wednesday: field?.wo,
          thursday: field?.do,
          friday: field?.vr,
          saturday: field?.sa,
          sunday: field?.so
        };
      });
    case BILLING_ROUTE:
      return billingList?.lande?.map(field => {
        return {
          ['']: `${ field?.land }*_*${ field?.probe }`,
          field: { name: field?.land },
          probe: { probe: field?.probe },
          installationDate: field?.installasie,
          invoicedUntil: field?.invoicedate
        };
      });
    case CLIENT_DETAILS_ROUTE:
      const field = clientDetailsList?.client;
      return [{
        ['']: `${ field?.land }*_*${ field?.probe }`,
        databaseName: `${ groupName } - ${ clientName }`,
        createdBy: field?.created_by,
        createdOn: field?.created_ts,
        consultant: field?.consultant,
        clientName: field?.client_name,
        registeredBusinessName: field?.besigheid_naam,
        xeroClientCode: field?.klient_kode,
        VATNumber: field?.vat_number,
        postalAddress: field?.postal_address,
        contactPerson: field?.contact_name,
        contactTelephone: field?.contact_telephone,
        contactEmail: field?.contact_email,
        ['Area / Region']: field?.area,
        timeZone: field?.timezone,
        sendAnalysisReportOn: field?.sendAnalysisReportWhen,
        sendAnalysisReportTo: field?.sendAnalysisReportTo,
        warnWhenVoltsBelow: field?.warnvolts,
        showTransEvapForWeekWithRecommendations: field?.show_transp,
        ['4GeeSendInterval']: field?.ic_interval,
        showFrostWarnings: field?.frostwarning
      }];
    case SASRI_ROUTE:
    case USERS_ROUTE:
    case SMS_RECOMMENDATION_ROUTE:
    case SMS_WARNING_ROUTE:
    case PUSH_WARNING_ROUTE:
    case FIELDS_SPLIT_ROUTE:
    case MAP_ROUTE:
    case PHENOLOGICAL_ROUTE:
    case ML_FORECASTS_ROUTE:
  }
};
