import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../../apiRoutes';
/* eslint-disable camelcase */

// TODO: to remove this class
class AxiosRequesterService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.emit('onAutoLogout', 'Los datos de acceso son inválidos');
            this.removeLocaStorageSession();
          }
          // Note: this will trigger the catch function on the promise
          throw(err.response);
        });
      }
    );
  };

  postRequest = (endpointUrl, dataForm) => {
    return new Promise((resolve, reject) => {
      axios.post(apiUrl(endpointUrl), dataForm);
    });
  };

  getRequest = (endpointUrl, dataParams) => {
    return new Promise((resolve, reject) => {
      axios.get(apiUrl(endpointUrl), dataParams);
    });
  };

  removeLocaStorageSession = () => {
    localStorage.removeItem('authorizationClient');
    localStorage.removeItem('authorizationToken');
    delete axios.defaults.headers.common['authorization-client'];
    delete axios.defaults.headers.common['authorization-token'];
    return false;
  };

  setAxiosHeaders = responseHeaders => {
    const authorizationClient = window.localStorage.getItem('authorizationClient');
    const authorizationToken = window.localStorage.getItem('authorizationToken');
    axios.defaults.headers.common['authorization-client'] = authorizationClient;
    axios.defaults.headers.common['authorization-token'] = `Bearer ${authorizationToken}`;
  };
}

const instance = new AxiosRequesterService();

export default instance;
