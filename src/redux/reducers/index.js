import { combineReducers } from 'redux';

import { systemReducer } from './system.reducer';
import { authReducer } from './auth.reducer';

const rootReducer = combineReducers({
  system: systemReducer,
  auth: authReducer
});

export default rootReducer;
