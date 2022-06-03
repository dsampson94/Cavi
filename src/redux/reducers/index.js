import { combineReducers } from 'redux';

import { systemReducer } from './system.reducer';
import { authReducer } from './auth.reducer';
import { clientReducer } from './client.reducer';

const rootReducer = combineReducers({
  system: systemReducer,
  auth: authReducer,
  client: clientReducer
});

export default rootReducer;
