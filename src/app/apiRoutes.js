export const API_V1_PATH = '/v1/';

export const apiUrl = path => {
	return `${process.env.REACT_APP_API_URL}${API_V1_PATH}${path}`;
};
