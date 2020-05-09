import React from 'react';
import RegisterPage from './RegisterPage';

const RegisterPageConfig = {
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
      path: '/auth/register',
			component: RegisterPage
		}
	]
};

export default RegisterPageConfig;
