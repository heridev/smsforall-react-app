import {
  SET_MOBILE_HUB_DATA,
  SET_MOBILE_HUB_COLLECTION
} from './mobile_hubs.actions';

const initialState = {
  validationErrors: [],
  mobileHubCollection: [],
  mobileHubDetails: undefined
};

const mobileHubs = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOBILE_HUB_COLLECTION: {
      return {
        ...state,
        mobileHubCollection: action.payload
      };
    }
    case SET_MOBILE_HUB_DATA: {
      return {
        ...state,
        mobileHubDetails: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default mobileHubs;
