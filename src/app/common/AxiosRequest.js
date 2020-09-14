import axios from 'axios';
import ReduxStore from 'app/store';
import { logoutUser } from 'app/auth/store/actions/user.actions';
import { hideLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import { apiUrl } from '../apiRoutes';

export const API_V1_PATH = '/v1/';

const setupInterceptors = (axiosInstance, hideLoaderSpinner = true) => {
  axiosInstance.interceptors.response.use(
    response => {
      // We hide automatically any loading spinner by default
      if (hideLoaderSpinner) {
        ReduxStore.dispatch(hideLoadingSpinner());
      }

      return response;
    },
    err => {
      return new Promise((resolve, reject) => {
        // We hide automatically any loading spinner by default
        if (hideLoaderSpinner) {
          ReduxStore.dispatch(hideLoadingSpinner());
        }

        // err.status comes in the 422 status code eg: when creating a new mobile hub
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // we dispatch the action to log the user out
          ReduxStore.dispatch(logoutUser());
        }

        // the errors comes directly here eg: when creating a duplicated number mobile hub
        reject(err.response);
      });
    }
  );
};

export const AxiosPostRequest = (
  endpointUrl,
  dataParams,
  hideLoaderSpinner = true
) => {
  const authorizationClient = window.localStorage.getItem('authorizationClient');
  const authorizationToken = window.localStorage.getItem('authorizationToken');

  // axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}${API_V1_PATH}/`;
  axios.defaults.headers.common['authorization-client'] = authorizationClient;
  axios.defaults.headers.common['authorization-token'] = authorizationToken;

  const axiosInstance = axios.create();
  setupInterceptors(axiosInstance, hideLoaderSpinner);

  return axiosInstance.post(apiUrl(endpointUrl), dataParams);
};


export const AxiosGetRequest = (
  endpointUrl,
  dataParams,
  hideLoaderSpinner = true
) => {
  const authorizationClient = window.localStorage.getItem('authorizationClient');
  const authorizationToken = window.localStorage.getItem('authorizationToken');

  axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}${API_V1_PATH}/`;
  axios.defaults.headers.common['authorization-client'] = authorizationClient;
  axios.defaults.headers.common['authorization-token'] = authorizationToken;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const axiosInstance = axios.create();
  setupInterceptors(axiosInstance);

  return axiosInstance.get(endpointUrl, { params: dataParams });
};

export const AxiosDeleteRequest = (
  endpointUrl,
  dataParams,
  hideLoaderSpinner = true
) => {
  const authorizationClient = window.localStorage.getItem('authorizationClient');
  const authorizationToken = window.localStorage.getItem('authorizationToken');

  axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}${API_V1_PATH}/`;
  axios.defaults.headers.common['authorization-client'] = authorizationClient;
  axios.defaults.headers.common['authorization-token'] = authorizationToken;

  const axiosInstance = axios.create();
  setupInterceptors(axiosInstance);

  return axiosInstance.delete(endpointUrl, dataParams);
};
