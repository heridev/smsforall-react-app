import {
  ADD_BACKEND_VALIDATION_ERRORS,
  CLEAR_BACKEND_VALIDATION_ERRORS,
} from './utils.actions';

const initialState = {
  validationErrors: []
};

const utilsReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BACKEND_VALIDATION_ERRORS: {
      return {
        ...state,
        validationErrors: action.payload
      };
    }
    case CLEAR_BACKEND_VALIDATION_ERRORS: {
      return {
        ...state,
        validationErrors: []
      };
    }
    default: {
      return state;
    }
  }
};

export default utilsReducers;
