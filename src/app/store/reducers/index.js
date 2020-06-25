import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import mobileHubs from 'app/main/mobile_hubs/mobile_hubs.reducers';
import utilsReducers from 'app/common/utils.reducers';

const createReducer = asyncReducers =>
  combineReducers({
    auth,
    mobileHubs,
    utilsReducers,
    fuse,
    ...asyncReducers
  });

export default createReducer;
