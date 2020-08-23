import jwtService from 'app/services/jwtService';
import history from '@history';
import { showMessage } from 'app/store/actions/fuse/message.actions';
import { hideLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import { setUserDataTest } from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ email, password }) {
  return dispatch =>
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then(userResponse => {
        dispatch(setUserDataTest(userResponse.userAttributes));

        let defaultRoute = '/';
        if (userResponse.userAttributes['pending_confirmation?']) defaultRoute = '/user/confirm-pin-page';

        history.push({
          pathname: defaultRoute
        });

        dispatch(hideLoadingSpinner());
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        const errorMsg = error.data && error.data.data && error.data.data.error;
        dispatch(showMessage({ message: errorMsg, variant: 'error', autoHideDuration: 3000 }));
        dispatch(hideLoadingSpinner());

        return dispatch({
          type: LOGIN_ERROR,
          payload: errorMsg
        });
      });
}
