import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
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
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Los datos de acceso son inválidos');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const authorizationTokens = this.getAccessToken();

		if (!(authorizationTokens.authorizationToken && authorizationTokens.authorizationClient)) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(authorizationTokens.authorizationToken)) {
      this.setAxiosHeaders(authorizationTokens);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					// this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post('http://localhost:3000/v1/user_sessions', {
					email,
					password
				})
				.then(response => {
					console.log('response headers');
					const {
						data: {
							data: { attributes: userAttributes }
						}
					} = response;

					if (userAttributes) {
						const authorizationToken = response.headers['authorization-token'];
						const authorizationClient = response.headers['authorization-client'];

						this.setSession({
							authorizationToken,
							authorizationClient
						});
						const userDataAndTokens = {
							userAttributes,
							responseHeaders: response.headers
						};
						resolve(userDataAndTokens);
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get('http://localhost:3000/v1/user_sessions/user_details_by_token', {
					data: {
						access_token: this.getAccessToken()
					}
				})
				.then(response => {
          const { data: { data: { attributes: userAttributes } } } = response;
					if (userAttributes) {
						// this.setSession(response.data.access_token);
						resolve(userAttributes);
					} else {
						this.logout();
						// Promise.reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					Promise.reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = responseHeaders => {
		if (!responseHeaders) {
			localStorage.removeItem('authorizationClient');
			localStorage.removeItem('authorizationToken');
			delete axios.defaults.headers.common['authorization-client'];
			delete axios.defaults.headers.common['authorization-token'];
			return false;
		}

		const { authorizationToken, authorizationClient } = responseHeaders;

		if (authorizationToken && authorizationClient) {
			localStorage.setItem('authorizationClient', authorizationClient);
			localStorage.setItem('authorizationToken', authorizationToken);
			axios.defaults.headers.common['authorization-client'] = `${authorizationClient}`;
			axios.defaults.headers.common['authorization-token'] = `Bearer ${authorizationToken}`;
		}
	};

	setAxiosHeaders = responseHeaders => {
		const { authorizationToken, authorizationClient } = responseHeaders;
		if (authorizationToken && authorizationClient) {
			axios.defaults.headers.common['authorization-client'] = `${authorizationClient}`;
			axios.defaults.headers.common['authorization-token'] = `Bearer ${authorizationToken}`;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		const authorizationClient = window.localStorage.getItem('authorizationClient');
		const authorizationToken = window.localStorage.getItem('authorizationToken');

		return {
			authorizationClient,
			authorizationToken
		};
	};
}

const instance = new JwtService();

export default instance;
