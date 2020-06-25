import * as Actions from 'app/store/actions/fuse';

const initialState = {
  is_loading_spinner_visible: false
};

const site = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SHOW_LOADING_SPINNER: {
      return {
        ...state,
        is_loading_spinner_visible: true
      };
    }
    case Actions.HIDE_LOADING_SPINNER: {
      return {
        ...state,
        is_loading_spinner_visible: false
      };
    }
    default: {
      return state;
    }
  }
};

export default site;
