import _ from '@lodash';
import jwtService from 'app/services/jwtService';
import history from '@history';
import { showMessage } from 'app/store/actions/fuse/message.actions';
import { hideLoadingSpinner } from 'app/store/actions/fuse/site.actions';

export const confirmPinNumber = userData => {
  return dispatch =>
    jwtService
      .confirmPinNumber(userData)
      .then(userResponse => {
        const message = userResponse.data && userResponse.data.data.message;
        history.push({
          pathname: '/'
        });
        dispatch(
          showMessage({
            message,
            variant: 'success',
            autoHideDuration: 3000
          })
        );
        dispatch(hideLoadingSpinner());
      })
      .catch(error => {
        const errorMessage = error.data && error.data.data && error.data.data.error;
        dispatch(showMessage({ message: errorMessage, variant: 'error', autoHideDuration: 3000 }));
        dispatch(hideLoadingSpinner());
      });
};
