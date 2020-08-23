// import { SET_MOBILE_HUB_DATA, SET_MOBILE_HUB_COLLECTION } from './mobile_hubs.actions';

const initialState = {
};

const confirmationAccount = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOMETHING: {
      return {
        ...state,
        myCollection: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default confirmationAccount;
