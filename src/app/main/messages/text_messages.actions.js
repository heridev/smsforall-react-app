import { showMessage } from 'app/store/actions/fuse/message.actions';
// import { AxiosPostRequest, AxiosGetRequest, AxiosDeleteRequest } from 'app/common/AxiosRequest';
import { AxiosPostRequest } from 'app/common/AxiosRequest';
// import history from '@history';
import { addBackendValidationErrors, removeBackendValidationErrors } from 'app/common/utils.actions';

// export const ADD_BACKEND_VALIDATION_ERRORS = '[FORM_VALIDATION] ADD';
// export const CLEAR_BACKEND_VALIDATION_ERRORS = '[FORM_VALIDATION] CLEAR';
export const SET_TEXT_MESSAGE_DATA = '[TEXT_MESSAGE] SET';
export const SET_TEXT_MESSAGE_COLLECTION = '[TEXT_MESSAGE] SET_COLLECTION';
export const SET_CREATE_TEXT_MESSAGE_AS_SUCCESS = '[TEXT_MESSAGE] CREATE_TEXT_SUCESS';
export const SET_TEXT_MESSAGE_CREATION_AS = '[TEXT_MESSAGE] SET_CREATION_AS';

export const setTextMessageCreationAs = (status) => dispatch => {
  return dispatch({
    type: SET_TEXT_MESSAGE_CREATION_AS,
    payload: status
  });
};

// export const setTextMessageCollection = textMessageList => dispatch => {
//   return dispatch({
//     type: SET_MOBILE_HUB_COLLECTION,
//     payload: hubCollection
//   });
// };

// export const setTextMessageData = textMessageDetails => dispatch => {
//   return dispatch({
//     type: SET_MOBILE_HUB_DATA,
//     payload: hubDetails
//   });
// };

export const createTextMessage = dataParams => {
  return dispatch =>
    AxiosPostRequest('sms_notifications', dataParams)
      .then(response => {
        dispatch(setTextMessageCreationAs('success'));
        dispatch(
          showMessage({
            message: 'El mensaje se ha creado correctamente, en breve será procesado',
            variant: 'success',
            autoHideDuration: 4000
          })
        );
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

// export const getTextMessageDetails = uuid => {
//   const urlWithUuid = `sms_notifications/${uuid}`;
//   return dispatch =>
//     AxiosGetRequest(urlWithUuid, {})
//       .then(response => {
//         const {
//           data: {
//             data: { attributes: hubAttributes }
//           }
//         } = response;
//         return dispatch(setMobileHubData(hubAttributes));
//       })
//       .catch(errorResponse => {
//         dispatch(
//           showMessage({
//             message: 'Ocurrió un error al momento de obtener los detalles del dispositivo',
//             variant: 'error',
//             autoHideDuration: 4000
//           })
//         );
//       });
// };
//
// export const getSmsMobileHubCollection = () => {
//   return dispatch =>
//     AxiosGetRequest('sms_notifications', {})
//       .then(response => {
//         const {
//           data: { data: smsTextMessageCollection }
//         } = response;
//         return dispatch(setMobileHubCollection(smsTextMessageCollection));
//       })
//       .catch(errorResponse => {
//         dispatch(
//           showMessage({
//             message: 'Ocurrió un error al momento de consultar los dispositivos',
//             variant: 'error',
//             autoHideDuration: 4000
//           })
//         );
//       });
// };
