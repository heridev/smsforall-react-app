import { showMessage } from 'app/store/actions/fuse/message.actions';
import { AxiosPostRequest, AxiosGetRequest, AxiosDeleteRequest } from 'app/common/AxiosRequest';
import history from '@history';
import { addBackendValidationErrors, removeBackendValidationErrors } from 'app/common/utils.actions';

export const ADD_BACKEND_VALIDATION_ERRORS = '[FORM_VALIDATION] ADD';
export const CLEAR_BACKEND_VALIDATION_ERRORS = '[FORM_VALIDATION] CLEAR';
export const SET_MOBILE_HUB_DATA = '[MOBILE_HUB] SET';
export const SET_MOBILE_HUB_COLLECTION = '[MOBILE_HUB] SET_COLLECTION';

export const setMobileHubCollection = hubCollection => dispatch => {
  return dispatch({
    type: SET_MOBILE_HUB_COLLECTION,
    payload: hubCollection
  });
};

export const setMobileHubData = hubDetails => dispatch => {
  return dispatch({
    type: SET_MOBILE_HUB_DATA,
    payload: hubDetails
  });
};

export const createSmsMobileHub = mobileHubData => {
  return dispatch =>
    AxiosPostRequest('sms_mobile_hubs', mobileHubData)
      .then(response => {
        dispatch(removeBackendValidationErrors());
        const {
          data: {
            data: { attributes: hubAttributes }
          }
        } = response;

        history.push({
          pathname: `/mobile-hubs/${hubAttributes.uuid}/details`
        });
      })
      .catch(errorResponse => {
        dispatch(
          showMessage({
            message: 'Existen algúnos errores de validación, favor de corregirlos',
            variant: 'error',
            autoHideDuration: 4000
          })
        );
        dispatch(addBackendValidationErrors(errorResponse.data.data.errors));
      });
};

export const getSmsMobileHubDetails = uuid => {
  const urlWithUuid = `sms_mobile_hubs/${uuid}`;
  return dispatch =>
    AxiosGetRequest(urlWithUuid, {})
      .then(response => {
        const {
          data: {
            data: { attributes: hubAttributes }
          }
        } = response;
        return dispatch(setMobileHubData(hubAttributes));
      })
      .catch(errorResponse => {
        dispatch(
          showMessage({
            message: 'Ocurrió un error al momento de obtener los detalles del dispositivo',
            variant: 'error',
            autoHideDuration: 4000
          })
        );
      });
};

export const getSmsMobileHubCollection = () => {
  return dispatch =>
    AxiosGetRequest('sms_mobile_hubs', {})
      .then(response => {
        const {
          data: { data: smsHubsCollection }
        } = response;
        return dispatch(setMobileHubCollection(smsHubsCollection));
      })
      .catch(errorResponse => {
        dispatch(
          showMessage({
            message: 'Ocurrió un error al momento de consultar los dispositivos',
            variant: 'error',
            autoHideDuration: 4000
          })
        );
      });
};

export const destroySmsMobileHub = uuid => {
  const urlWithUuid = `sms_mobile_hubs/${uuid}`;
  return dispatch =>
    AxiosDeleteRequest(urlWithUuid, {})
      .then(response => {
        history.push({
          pathname: '/mobile-hubs/list'
        });

        dispatch(
          showMessage({
            message: response.data.data.message,
            variant: 'success',
            autoHideDuration: 4000
          })
        );
      })
      .catch(errorResponse => {
        dispatch(
          showMessage({
            message: 'Ocurrió un error al momento de eliminar el dispositivo, por favor recarga la página',
            variant: 'error',
            autoHideDuration: 4000
          })
        );
      });
};
