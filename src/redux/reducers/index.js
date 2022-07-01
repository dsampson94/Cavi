import { combineReducers } from 'redux';

import { systemReducer } from './system.reducer';
import { authReducer } from './auth.reducer';
import { clientReducer } from './client.reducer';
import { fieldReducer } from './field.reducer';

const appReducer = combineReducers({
  system: systemReducer,
  auth: authReducer,
  client: clientReducer,
  field: fieldReducer
});

const rootReducer = (state, action) => {
  if (action.type === '[AUTH_STORE] Logout')
    return appReducer(undefined, action);
  else
    return appReducer(state, action);
};

export default rootReducer;
