import * as Actions from 'app/store/actions/fuse';

const initialState = {
  is_loading_spinner_visible: false,
  http_request_in_progress: false,
  http_request_response_details: {}
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

    case Actions.HTTP_REQUEST_STARTS: {
      return {
        ...state,
        http_request_in_progress: true,
        http_request_response_details: {}
      };
    }
    case Actions.HTTP_REQUEST_FINISHES: {
      return {
        ...state,
        http_request_in_progress: false,
        http_request_response_details: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default site;
