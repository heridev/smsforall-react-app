import _ from '@lodash';
import jwtService from 'app/services/jwtService';
import history from '@history';
import { showMessage } from 'app/store/actions/fuse/message.actions';
import { setUserDataTest } from './user.actions';
import { hideLoadingSpinner } from 'app/store/actions/fuse/site.actions';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister(userData) {
  return dispatch =>
    jwtService
      .createUser(userData)
      .then(userResponse => {
        dispatch(setUserDataTest(userResponse.userAttributes));

        history.push({
          pathname: '/'
        });

        dispatch(hideLoadingSpinner());
        return dispatch({
          type: REGISTER_SUCCESS
        });
      })
      .catch(error => {
        const errorMessages = error.data && error.data.data && error.data.data.errors;
        if (errorMessages) {
          _.forEach(errorMessages, function (messages, fieldName) {
            _.forEach(messages, function (message) {
              const formattedMessage = `${fieldName} ${message}`;
              dispatch(showMessage({ message: formattedMessage, variant: 'error', autoHideDuration: 3000 }));
            });
          });
        }
        dispatch(hideLoadingSpinner());
        return dispatch({
          type: REGISTER_ERROR,
          payload: 'Existen algunos errores de validación'
        });
      });
}
