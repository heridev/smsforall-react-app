import ForgotPasswordPage from './ForgotPasswordPage';

const ForgotPasswordPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: null,
	routes: [
		{
			path: '/auth/forgot-password',
			component: ForgotPasswordPage
		}
	]
};

export default ForgotPasswordPageConfig;
