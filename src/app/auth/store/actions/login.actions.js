import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import history from '@history';
import * as UserActions from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ email, password }) {
	return dispatch =>
		jwtService
			.signInWithEmailAndPassword(email, password)
			.then(userResponse => {
				dispatch(UserActions.setUserDataTest(userResponse.userAttributes));

				history.push({
					pathname: '/dashboard'
				});

				return dispatch({
					type: LOGIN_SUCCESS
				});
			})
			.catch(error => {
				return dispatch({
					type: LOGIN_ERROR,
					payload: error
				});
			});
}
