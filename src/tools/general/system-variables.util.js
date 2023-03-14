//ROUTES - NAVIGATETO
export const navigateTo = (screenName, history, groupName, clientName, probeNumber, fieldName) => {
  switch (screenName) {
    case CLIENT_FIELDS :
      return history.push(`/client/${ groupName }/${ clientName }`);
    case FIELD_CHARTS :
      return history.push(`/client/${ groupName }/${ clientName }/field-charts/${ probeNumber }/${ fieldName }`);
    case FIELD_TEMPERATURES :
      return history.push(`/client/${ groupName }/${ clientName }/field-temperatures/${ probeNumber }/${ fieldName }`);
    case FIELD_SETUP :
      return history.push(`/client/${ groupName }/${ clientName }/field-setup/general`);
  }
};

//SNACKBAR
export const SNACK_SUCCESS = 'snack--success';
export const SNACK_CRITICAL = 'snack--critical';
export const SNACK_INFO = 'snack--info';

//MIDBAR
export const MID_BAR_ASSISTANT = 'Assistant';
export const MID_BAR_OVERVIEW = 'Overview';
export const MID_BAR_MONITOR = 'Monitor Probes';
export const MID_BAR_LAST_READINGS = 'Find Last Readings';
export const MID_BAR_NEGLECTED_FIELDS = 'Neglected Fields';
export const MID_BAR_EMAIL_READINGS = 'Email Readings';
export const MID_BAR_CHART = 'Chart of Raw Readings';
export const MID_BAR_IRRICOMS = 'Check Irricoms (manual)';

//SPINNER
export const SPINNER_TEXT = 'Loading..';

//PROGRESSBAR
export const INITIAL_PROGRESS = '95';
export const COMPLETE_PROGRESS = '100';

//TOOLTIPS
export const EMAIL = 'Email Recommendations to any Email Address';
export const PRINT = 'Print';
export const OTHER_FARM = 'View Farms';
export const MAPS = 'Show Probes on Google Maps';
export const FIELD_SETUP_STRING = 'Field Setup';
export const RECOMMENDATION_LIST = 'Recommendation List';
export const WEATHER_STATION = 'Show Weather Station Data';
export const PROBES_MONITOR_STRING = 'Probes Monitor';
export const REPORT_PROBLEM = 'Report a problem to your agent';
export const LOG_OUT = 'Log out';

export const ACCURACY_ANALYSIS = 'Show Accuracy Analysis';
export const PREVIOUS_RECOMMENDATIONS = 'Show Previous Recommendations';

export const CAPTURE = 'Click to capture irrigation, rainfall or a note';
export const QUICK_VIEW = 'Quick view';
export const UNIT = 'Unit:';
export const HARVEST = 'Harvest date is today ';

export const TODAY = 'Viewed today';
export const GREEN = 'Viewed in less than 7 days ';
export const YELLOW = 'Viewed in less than 14 days';
export const ORANGE = 'Viewed in less than 30 days';
export const RED = 'Viewed in MORE than 30 days!';

//TOPBAR
export const EMAIL_RECOMMENDATIONS = 'email_recommendations';
export const PRINT_ICON = 'Print';
export const MAPS_ICON = 'maps';
export const WEATHER_STATION_ICON = 'weather_station';
export const REPORT_PROBLEM_ICON = 'report_problem';
export const PROFILE_ICON = 'profile';
export const LOG_OUT_ICON = 'log_out';

//MIDBAR
export const OVERVIEW_MIDBAR = 'overview_midbar';
export const CLIENT_FIELDS_MIDBAR = 'client_fields__midbar';
export const FIELD_CHART_MIDBAR = 'field_chart_midbar';
export const FIELD_TEMPERATURES_MIDBAR = 'field_temperatures_midbar';
export const FIELD_SETUP_MIDBAR = 'field_setup_midbar';

//TABLE_MIDBAR
export const PREVIOUS = 'previous';
export const BULLSEYE = 'bullseye';

//SIDEBAR
export const SEARCH = 'search';
export const SETTINGS_GEAR = 'settings_gear';
export const FAVORITES_STAR = 'favorites_star';
export const SEARCH_PLACEHOLDER = 'Filter clients';

//TABLE
export const WARNING = 'warning';
export const DROPDOWN = 'dropdown';
export const DROPDOWN_ALL = 'dropdown_all';
export const CAMERA = 'camera';
export const PENCIL = 'pencil';
export const CHARTS = 'charts';
export const RAIN_CLOUDS = 'rain_clouds';
export const WATCH = 'watch';
export const HARVEST_ICON = 'harvest_tractor';
export const TABLE_SEARCH_PLACEHOLDER = 'Search field or probe number';
export const LOW_BATTERY = 'low_battery';
export const RENAME_FIELD = 'rename_field';
export const COPY_FIELD = 'copy_field';
export const ARCHIVE_FIELD = 'archive_field';
export const DELETE_FIELD = 'delete_field';
export const TOGGLE_ON = 'toggle_on';
export const TOGGLE_OFF = 'toggle_off';
export const FIX_READINGS = 'fix_readings';
export const REPLACE_PROBE_WITH_NEW = 'replace_probe';
export const ADD_PROBE = 'add_probe';
export const REMOVE_PROBE = 'remove_probe';
export const VIEW_CHARTS = 'view_charts';
export const EXCEL_ICON = 'excel';
export const LOCATION_PIN = 'location_pin';
export const VIEW_SIDEBAR = 'view_sidebar';
export const FIELD_SETTINGS = 'field_settings';
export const PROBES_MONITOR = 'probes_monitor';
export const TABLE_LIST = 'table_list';

//TABLENAMES
export const CLIENT_RECOMMENDATION_VIEW = 'recommendation_client_field_view';
export const FIELD_SETUP_VIEW = 'field_setup_view';
export const FIELD_REPORTS_VIEW = 'field_reports_view';
export const FIELD_CHARTS_MODAL_VIEW = 'field_charts_modal_view';
export const MONITOR_PROBES_VIEW = 'monitor_probes_view';
export const LAST_READINGS_VIEW = 'last_readings_view';

//EMOJI
export const VERY_SATISFIED = 'very_satisfied';
export const SATISFIED = 'satisfied';
export const NEUTRAL = 'neutral';
export const DISSATISFIED = 'dissatisfied';
export const VERY_DISSATISFIED = 'very_dissatisfied';

//WEATHER
export const SUNNY = 'sunny';
export const RAINING = 'raining';
export const PARTLY_CLOUDED = 'party_clouded';
export const CLOUDED = 'clouded';

//FIELD DETAIL NAMES (FIELD FIELD NAMES)
export const FORECAST = 'gebied';
export const GROUP = 'landgroep';
export const HA = 'ha';
export const ORDER = 'orde';
export const PLANT_DATE_ = 'plantdatum';
export const HARVEST_DATE_ = 'oesdatum';
export const UNIT_ = 'eenheid';
export const MAXMM = 'maxmm';

//OVERVIEW OPTIONS
export const FIELDS_LAST_VIEWED_QUESTION = 'When is the last time that you viewed your fields?';
export const FIELDS_MOISTURE_QUESTION = 'Are your fields too wet or too dry currently?';
export const FIELD_UP_TO_DATE_QUESTION = 'Which fields are up to date?';

//RADIO LABELS
export const TWO_WEEKS_LABEL = '2 weeks (fastest)';
export const FOUR_WEEKS_LABEL = '4 weeks (fast)';
export const TWO_MONTHS_LABEL = '2 months';
export const THREE_MONTHS_LABEL = '3 months';
export const SIX_MONTHS_LABEL = '6 months';
export const TWELVE_MONTHS_LABEL = '12 months';
export const FULL_VIEW_LABEL = 'Full View';

export const RADIO_GROUP = 'viewPeriod';

//DATE NUMBERS
export const TWO_WEEKS_DAYS = 7;
export const FOUR_WEEKS_DAYS = 14;
export const TWO_MONTHS_DAYS = 28;
export const THREE_MONTHS_DAYS = 60;
export const SIX_MONTHS_DAYS = 91;
export const TWELVE_MONTHS_DAYS = 182;
export const FULL_VIEW_DAYS = 365;

//OTHER STRINGS
export const DASHBOARD = 'Dashboard';
export const CLIENT_FIELDS = 'ClientFields';
export const FIELD_CHARTS = 'FieldCharts';
export const FIELD_TEMPERATURES = 'FieldTemperatures';
export const FIELD_REPORTS = 'FieldReports';
export const FIELD_SETUP = 'ClientSetup';

//CHART TYPES
export const DEFICIT = 'deficit';
export const AGGREGATE = 'aggregate';
export const EXTENDED = 'extended';
export const DAILY = 'daily';
export const TEMPERATURE_MULTILINE = 'temperature';

//CHART NAMES
export const DEFICIT_100MM = 'deficit_100mm';
export const DEFICIT_200MM = 'deficit_200mm';
export const DEFICIT_300MM = 'deficit_300mm';
export const DEFICIT_400MM = 'deficit_400mm';
export const DEFICIT_600MM = 'deficit_600mm';
export const DEFICIT_800MM = 'deficit_800mm';

export const LINE_100MM = '100mm';
export const LINE_200MM = '200mm';
export const LINE_300MM = '300mm';
export const LINE_400MM = '400mm';
export const LINE_600MM = '600mm';
export const LINE_800MM = '800mm';

export const AGGREGATE_TOP_SOIL = 'aggregate_0 - 400mm';
export const AGGREGATE_BOTTOM_SOIL = 'aggregate_400 - 800mm';

export const DEFICIT_ETO = 'Deficit / ETo';
export const VOLT_READINGS = 'Volt Readings';
export const FLOW_DAILY = 'Flow Meter Daily';
export const FLOW_HOURLY = 'Flow Meter Hourly';
export const RAIN = 'Rain';
export const EC = 'EC Sensor Data (mS/cm)';
export const VPD = 'VPD (kPa) Readings';
export const ACTUAL_IRRIGATION = 'Actual Irrigation Data';
export const EXCEL = 'Excel Report';
export const ANALYSE_FIELD = 'Analyse Field';

export const DAILY_ETO = 'Daily ETo';

export const SOIL_TEMPERATURE = 'soil_temperature';
export const CANOPY_OUTSIDE_TEMPERATURE = 'canopy_outside_temperature';
export const RAIN_HUMIDITY = 'rain_humidity';

export const CANOPY_LINE = 'Canopy Temperatures';
export const OUTSIDE_LINE = 'Outside Temperatures';

export const RAIN_LINE = 'Rain';
export const HUMIDITY_LINE = 'Humidity';

//DROPDOWN
export const CHART_TOP_BAR_MENU = 'chart-top_bar_menu';
export const CHART_USAGE_MENU = 'chart_usage_menu';
export const CHART_USAGE_SASRI_MENU = 'chart_usage_sasri_menu';
export const CHART_ACTIVE_PERIOD = 'chart_active_period';
export const TOPBAR_OPTIONS = 'topbar_options';
export const SMALL_SCREEN_DROPDOWN = 'small_screen_dropdown';
export const FIELD_SETUP_LIST_CONTAINER = 'field_setup_list_container';
export const HIDDEN_MENU = 'empty_menu';
export const INFO_CIRCLE = 'info_circle';
export const MOBILE_MENU = 'mobile_menu';

export const DEFICIT_OPTION = 'Deficit / ETo';
export const VOLT_READINGS_OPTION = 'Volt Readings';
export const FLOW_DAILY_OPTION = 'Flow Meter Daily';
export const FLOW_HOURLY_OPTION = 'Flow Meter Hourly';
export const RAIN_OPTION = 'Rain_option';
export const EC_OPTION = 'EC Sensor Data (mS/cm)';
export const VPD_OPTION = 'VPD (kPa) Readings';
export const ACTUAL_IRRIGATION_OPTION = 'Actual Irrigation Data';
export const EXCEL_OPTION = 'Excel Report';
export const ANALYSE_FIELD_OPTION = 'Analyse Field';

//CHART ICONS
export const DOWN_ARROW = 'down_arrow';
export const OPEN_MENU = 'open_menu';
export const TOGGLE_YAXIS = 'toggle_y';
export const CIRCLE_DROPDOWN = 'circle_dropdown';
export const DOUBLE_DROPDOWN = 'double_dropdown';
export const SINGLE_DROPDOWN = 'single_dropdown';
export const NONE = 'none';

//CONTEXT MENU
export const CONTEXT_MENU = 'contextMenu';

export const RECOMMENDATIONS_OPTION = 0;
export const PERIOD_OPTION = 1;
export const CALIBRATE_OPTION = 2;
export const IRRIGATION_OR_DELETE_OPTION = 3;
export const EXPORT_OPTION = 4;

export const MENU_0 = 'dropdown-menu-0';
export const MENU_1 = 'dropdown-menu-1';
export const MENU_2 = 'dropdown-menu-2';
export const MENU_3 = 'dropdown-menu-3';
export const MENU_4 = 'dropdown-menu-4';

export const MENU_2_INPUT = 'dropdown-menu-2-input';
export const MENU_2_INPUT_BUTTON = 'dropdown-menu-2-input-button';

// 'GETGRAPHSMORE' 'get' API STRINGS
export const VOLTS_STRING = 'volts';
export const FLOW_DAILY_STRING = 'flowdaily';
export const FLOW_HOURLY_STRING = 'flowhourly';
export const EC_STRING = 'ec';
export const VPD_STRING = 'vpd';
export const MOTTECH_STRING = 'mottech';
export const SOIL_TEMP = 'soiltemp';

// 'GETFIELDSETUP' 'g' API STRINGS
export const GENERAL_STRING = 'general';
export const SENSORS_STRING = 'sensors';
export const PROBES_STRING = 'probes';
export const PROBES_DETAILED_STRING = 'probesdet';
export const MAP_STRING = 'map';
export const ROOTS_STRING = 'roots';
export const CROP_FACTORS_STRING = 'cf';
export const CROP_DETAILS_STRING = 'cropdetails';
export const PHENOLOGICAL_STRING = 'phenological';
export const IRRISYS_STRING = 'irrisys';
export const IRRIDAY_STRING = 'irriday';
export const WEATHER_STATION_STRING = 'ws';
export const SASRI_STRING = 'sasri';
export const USERS_STRING = 'users';
export const SMS_RECOMMENDATION_STRING = 'smssending ';
export const SMS_WARNING_STRING = 'smswarning';
export const PUSH_WARNING_STRING = 'pushwarning';
export const FIELDS_SPLIT_STRING = 'fieldssplit';
export const CLIENT_DETAILS_STRING = 'clientdetails';
export const BILLING_STRING = 'billing';
export const ML_FORECASTS_STRING = 'mlforecasts';

//ROUTES
export const GENERAL_ROUTE = 'general';
export const PROBES_SUMMARY_ROUTE = 'probe-summary';
export const PROBES_DETAILED_ROUTE = 'probe-details';
export const SENSORS_ROUTE = 'sensors';
export const MAP_ROUTE = 'map';
export const ROOTS_ROUTE = 'roots';
export const CROP_FACTORS_ROUTE = 'cf';
export const CROP_DETAILS_ROUTE = 'cropdetails';
export const PHENOLOGICAL_ROUTE = 'phenological';
export const IRRISYS_ROUTE = 'irrisys';
export const IRRIDAY_ROUTE = 'irriday';
export const ADD_FIELD_ROUTE = 'create';
export const WEATHER_STATION_ROUTE = 'ws';
export const SASRI_ROUTE = 'sasri';
export const USERS_ROUTE = 'users';
export const SMS_RECOMMENDATION_ROUTE = 'smssending ';
export const SMS_WARNING_ROUTE = 'smswarning';
export const PUSH_WARNING_ROUTE = 'pushwarning';
export const FIELDS_SPLIT_ROUTE = 'fieldssplit';
export const CLIENT_DETAILS_ROUTE = 'clientdetails';
export const BILLING_ROUTE = 'billing';
export const ML_FORECASTS_ROUTE = 'mlforecasts';

//TAB STRINGS
export const GENERAL_TAB_NAME = 'General';
export const CROP_FACTORS_TAB_NAME = 'Crop Factors';
export const PROBES_SUMMARY_TAB_NAME = 'Probe Summary';
export const PROBES_DETAILED_TAB_NAME = 'Probe Detailed';
export const ROOTS_TAB_NAME = 'Roots';
export const IRRISYS_TAB_NAME = 'Irrigation System';
export const SENSORS_TAB_NAME = 'Sensors';

//CLIENT DETAILS LABELS
export const DATABASE_NAME = 'Database Name:';
export const CREATED_BY = 'Created By:';
export const CREATED_ON = 'Created On:';
export const CONSULTANT = 'Consultant:';
export const CLIENT_NAME = 'Client Name:';
export const REGISTERED_BUSINESS_NAME = 'Registered Business Name:';
export const XERO_CLIENT_CODE = 'Xero Client Code:';
export const VAT_NUMBER = 'Vat Number:';
export const POSTAL_ADDRESS = 'Postal Address:';
export const CONTACT_PERSON = 'Contact Person:';
export const CONTACT_TELEPHONE = 'Contact Telephone:';
export const CONTACT_EMAIL = 'Contact Email:';
export const AREA_REGION = 'Area / Region:';
export const TIME_ZOME = 'Time Zone:';
export const SEND_ANALYSIS_REPORT_ON = 'Send Analysis Report On:';
export const SEND_ANALYSIS_REPORT_TO = 'Send Analysis Report To:';
export const WARN_WHEN_VOLTS_BELOW = 'Warn Me When Volts Below:';
export const SHOW_TRANSP_EVAP = 'Show Trans / Evap for week with recommendations:';
export const SEND_INTERVAL_4G = '4G Send Interval:';
export const SHOW_FROST_WARNINGS = 'Show Frost Warnings:';
export const INTERVAL_CODE_VALUES_4G = '4G Interval Code Possible Values';
export const INTERVAL_CODE_1_4G = '4G Interval Code -1 = Default As Set Per Consultant (Highly Recommended)';
export const INTERVAL_CODE_2_4G = '4G Interval Code 2 = Send Every 2 Hours';
export const INTERVAL_CODE_4_4G = '4G Interval Code 4 = Send 4am & 4pm Daily';
export const INTERVAL_CODE_5_4G = '4G Interval Code 5 = Send Every Hour';
export const KML_FILE_FOR_MAPS = 'KML File For Google Maps';
export const DELETE_DATABASE_HERE = 'If this client has no fields set up, you can delete the database here';

//SMSWARNINGS LABELS
export const ADD_NEW_NUMBER_TO_RECEIVE = 'Add New Number To Receive SMS Warning';
export const ADD_WARNING = 'Add Warning';
export const NOTE_IRRICHECK = 'Note: Irricheck May Bill The Client For The SMS Sent';
export const NOTE_NOTIFICATIONS = 'Note: Notifications Will Only Work On Correctly Installed and Configured THT Sensors';
export const NOTE_IMPORTANT_SMS = 'IMPORTANT: Irricheck Takes No Responsibility For SMS Warnings Not Sent Out';
export const SMS_WARNINGS_FOR = 'SMS Warnings For ';

//PUSHNOTIFICATIONS LABELS
export const ADD_NEW_USER_LOGIN_TO_RECEIVE = 'Add New User Login To Receive Push Warnings';
export const NOTE_IMPORTANT_PUSH = 'IMPORTANT: Irricheck Takes No Responsibility For Push Warnings Not Sent Out';
export const THT_WARNINGS_FOR = 'THT Or EC Sensor Warnings For ';


//SPLITVALVE LABELS
export const ADD_NEW_SPLIT_VALVE = 'Add New Split Valve';
export const NO_SPLIT_VALVE_CREATED = 'No Split Valves Have Been Created For The Database Yet';
export const USE_THE_ABOVE_LIST = 'Use the Above Dropdown List to Create Your First Split Valve Now';

//CREATE NEW FIELD
export const ADD_NEW_FIELD_TODB = 'Add New Field To Database';
export const COPY_TIP = 'TIP: Try the COPY function under general to set up fields';

export const FIELD_NAME = 'Field Name';
export const FORECAST_AREA = 'Forecast Area ';
export const CROP = 'Crop';
export const PLANT_DATE = 'Plant Date';
export const HARVEST_DATE = 'Harvest Date';
export const IRRIGATION_SYSTEM = 'Irrigation System';
export const PROBE_NUMBER = 'Probe Number';
export const LENGTH = 'Length';

export const CHOOSE_CLOSEST = 'Choose area closest to the field location';
export const DATE_CROP_PLANTED = 'Probe readings from the date the crop was planted';
export const EXPECTED_HARVEST_DATE = 'Expected harvest date of crop. Probe readings after this date will not be imported.';
export const PROBE_EG = 'Eg. AC51234, AC11909, 17635, etc.';
export const LENGTH_OF_PROBE = 'Length of the probe, usually 800mm.';

//CLIENT DETAILS USERS LABELS
export const USERS_WITH_ACCESS_TO = 'Users With Access To: ';
export const ONLY_ADMINS_CAN_EDIT = 'Only Admins Can Edit The Users For: ';
export const CLIENT_DETAILS_HEADER = 'Client Details';
export const CLIENT_NAME_HEADER = 'Client Name: ';
export const CONTACT_EMAIL_HEADER = 'Contact Email: ';
export const CONTACT_AREA_HEADER = 'Area: ';
export const CLIENT_WAS_CREATED_ON_PULSE = 'Client Was Created in Pulse on ';

//SMS RECOMMENDATIONS LABELS
export const SMS_CONFIGURATION_FOR = 'Users With Access To: ';
export const NOTE_BILLING_SMS = 'Note: Irricheck May Bill The Client R1.00 Per SMS Sent. ';
export const CLICK_BUTTON_TO_ADD = 'Add New Number';

//SMS RECOMMENDATIONS LABELS
export const USE_THIS_SECTION_TO_MAINTAIN = 'Users with access to: ';
export const STEPS_TO_CREATE_A_NEW_STATION = 'Note: Irricheck may bill the client R1.00 per SMS sent. ';
export const STEP_1 = '1. While at the station physically, use the app to set up the GWS station. ';
export const STEP_2 = '2. Come back to this screen and give the station a proper forecast name that is not already in use. ';
export const STEP_3 = '3. After a few hours check back here to see if the station has calculated. ';
export const STEP_4 = '4. Link The fields to the forecast that will now appear under \'General -Forecast Areas\'. ';
export const STEP_5 = '5. Sick back and know you did something awesome! ';
export const EXISTING_STATIONS_CREATED = 'Existing stations that you have created: ';

//SUCCESS/ERROR MESSAGES
export const SUCCESSFULLY_RETRIEVED_OVERVIEW = 'Fields Overview Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_OVERVIEW = 'Fields Overview Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_FIELDS = 'Fields Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELDS = 'Field Data Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA = 'Rain Data Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA = 'Rain Data Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_PDF = 'Client PDF Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_PDF = 'Client PDF Not Retrieved';

export const SUCCESSFULLY_EMAILED_PDF = 'Client PDF Emailed Successfully';

export const SUCCESSFUL_SEARCH = 'Fields Retrieved Successfully ';
export const UNSUCCESSFUL_FIELD_SEARCH = 'Invalid search - No Fields Found';
export const UNSUCCESSFUL_CLIENT_SEARCH = 'Invalid search - No Clients Found';

export const SUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST = 'Field Charts Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST = 'Field Charts Not Retrieved';

export const SUCCESSFULLY_CALIBRATED_PROBE = 'Probe Calibrated Successfully ';
export const UNSUCCESSFULLY_CALIBRATED_PROBE = 'Probe Calibration Unsuccessful';

export const SUCCESSFULLY_RETRIEVED_FIELD_VOLT_CHART_LIST = 'Volts Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_VOLT_CHART_LIST = 'Volts Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_FIELD_FLOW_METER_CHART_LIST = 'Flow Meter Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_FLOW_METER_CHART_LIST = 'Flow Meter Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_FIELD_EC_CHART_LIST = 'EC Chart Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_EC_CHART_LIST = 'EC Chart Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_FIELD_VPD_CHART_LIST = 'VPD Chart Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_VPD_CHART_LIST = 'VPD Chart Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_FIELD_MOTTECH_CHART_LIST = 'MOTTECH Chart Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_MOTTECH_CHART_LIST = 'MOTTECH Chart Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_FIELD_SOIL_TEMP_CHART_LIST = 'Soil Temp Chart Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_SOIL_TEMP_CHART_LIST = 'Soil Temp Chart Not Retrieved';

export const SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST = 'Field setup list Retrieved Successfully';
export const UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST = 'Field setup list Not Retrieved';

