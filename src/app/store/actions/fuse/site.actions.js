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

