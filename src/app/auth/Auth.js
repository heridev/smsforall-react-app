import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import * as userActions from 'app/auth/store/actions';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		return Promise.all([this.jwtCheck()]);
	}

	jwtCheck = () => {
		new Promise(resolve => {
			jwtService.on('onAutoLogin', () => {
				this.props.showMessage({ message: 'Logging in with JWT' });
				jwtService
					.signInWithToken()
					.then(user => {
						this.props.setUserDataTest(user);
						this.setState({ waitAuthCheck: false });

						resolve();

						this.props.showMessage({ message: 'Logged in with JWT' });
					})
					.catch(error => {
						this.props.showMessage({ message: error });
						this.setState({ waitAuthCheck: false });

						resolve();
					});
			});

			jwtService.on('onAutoLogout', message => {
				if (message) {
					this.props.showMessage({ message });
				}

				this.props.logout();
        this.setState({ waitAuthCheck: false });

				resolve();
			});

			jwtService.on('onNoAccessToken', () => {
				resolve();
        this.setState({ waitAuthCheck: false });
			});

			jwtService.init();

			return Promise.resolve();
		});
	};

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(userActions.logoutUser),
		setUserData: () => dispatch(userActions.setUserData),
		setUserDataTest: user => dispatch(userActions.setUserDataTest(user)),
		showMessage: () => dispatch(Actions.showMessage),
		hideMessage: () => dispatch(Actions.hideMessage),
		showLoadingSpinner: () => dispatch(Actions.showLoadingSpinner),
		hideLoadingSpinner: () => dispatch(Actions.hideLoadingSpinner)
	};
};

const mapStateToProps = state => {
	return {
		isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
