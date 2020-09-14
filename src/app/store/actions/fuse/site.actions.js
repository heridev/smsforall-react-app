export const SHOW_LOADING_SPINNER = '[SPINNER] SHOW';
export const HIDE_LOADING_SPINNER = '[SPINNER] HIDE';

export const hideLoadingSpinner = () => dispatch => {
  return dispatch({
    type: HIDE_LOADING_SPINNER
  });
};

export const showLoadingSpinner = () => dispatch => {
  return dispatch({
    type: SHOW_LOADING_SPINNER
  });
};

export const HTTP_REQUEST_STARTS = '[HTTP_REQUEST] STARTS';
export const httpRequestStarts = () => dispatch => {
  return dispatch({
    type: HTTP_REQUEST_STARTS
  });
};

export const HTTP_REQUEST_FINISHES = '[HTTP_REQUEST] FINISHES';
export const httpRequestFinishes = (additionalData = {}) => dispatch => {
  return dispatch({
    type: HTTP_REQUEST_FINISHES,
    payload: additionalData
  });
};
