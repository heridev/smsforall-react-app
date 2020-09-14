import { showMessage } from 'app/store/actions/fuse/message.actions';
import { AxiosPostRequest, AxiosGetRequest } from 'app/common/AxiosRequest';
// import { AxiosPostRequest } from 'app/common/AxiosRequest';
// import history from '@history';
import { addBackendValidationErrors } from 'app/common/utils.actions';
import { hideLoadingSpinner, httpRequestFinishes } from 'app/store/actions/fuse/site.actions';

// export const ADD_BACKEND_VALIDATION_ERRORS = '[FORM_VALIDATION] ADD';
// export const CLEAR_BACKEND_VALIDATION_ERRORS = '[FORM_VALIDATION] CLEAR';
export const SET_TEXT_MESSAGE_DETAILS = '[TEXT_MESSAGE] SET';
export const SET_TEXT_MESSAGES_COLLECTION = '[TEXT_MESSAGE] SET_COLLECTION';
export const SET_CREATE_TEXT_MESSAGE_AS_SUCCESS = '[TEXT_MESSAGE] CREATE_TEXT_SUCESS';
export const SET_TEXT_MESSAGE_SEARCH = '[TEXT_MESSAGE] SET_TEXT_SEARCH';
export const SET_TEXT_MESSAGE_SEARCH_PARAMS = '[TEXT_MESSAGE] SET_TEXT_SEARCH_PARAMS';

export const setTextMessagesCollection = textMessageList => dispatch => {
  return dispatch({
    type: SET_TEXT_MESSAGES_COLLECTION,
    payload: textMessageList
  });
};

export const setTextSearch = searchText => dispatch => {
  return dispatch({
    type: SET_TEXT_MESSAGE_SEARCH,
    payload: searchText
  });
};

export const setTextMessageSearchParams = params => dispatch => {
  return dispatch({
    type: SET_TEXT_MESSAGE_SEARCH_PARAMS,
    payload: params
  });
};
// export const setTextMessageData = textMessageDetails => dispatch => {
//   return dispatch({
//     type: SET_MOBILE_HUB_DATA,
//     payload: hubDetails
//   });
// };

export const createTextMessage = dataParams => {
  const hideLoaderSpinnerAutomatically = false;
  return dispatch =>
    AxiosPostRequest('sms_notifications', dataParams, hideLoaderSpinnerAutomatically)
      .then(response => {
        dispatch(
          showMessage({
            message: 'El mensaje se ha creado correctamente, en breve será procesado',
            variant: 'success',
            autoHideDuration: 4000
          })
        );
        dispatch(hideLoadingSpinner());
        const {
          data: { data: smsNotificationData }
        } = response;
        dispatch(httpRequestFinishes({ status: `success_${smsNotificationData.id}` }));
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
        dispatch(hideLoadingSpinner());
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
export const getTextMessagesCollection = (params) => {
  return dispatch =>
    AxiosGetRequest('sms_notifications', params)
      .then(response => {
        const {
          data: { data: textMessagesCollection }
        } = response;
        return dispatch(setTextMessagesCollection(textMessagesCollection));
      })
      .catch(errorResponse => {
        dispatch(
          showMessage({
            message: 'An error ocurred when fetching text messages',
            variant: 'error',
            autoHideDuration: 4000
          })
        );
      });
};
