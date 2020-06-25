export const ADD_BACKEND_VALIDATION_ERRORS = '[FORM_VALIDATION] ADD';
export const CLEAR_BACKEND_VALIDATION_ERRORS = '[FORM_VALIDATION] CLEAR';

export const addBackendValidationErrors = arrayWithErrors => dispatch => {
  return dispatch({
    type: ADD_BACKEND_VALIDATION_ERRORS,
    payload: arrayWithErrors
  });
};

export const removeBackendValidationErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_BACKEND_VALIDATION_ERRORS
  });
};
