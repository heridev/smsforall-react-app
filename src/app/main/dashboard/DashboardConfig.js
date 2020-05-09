import React from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';
import Dashboard from './Dashboard';

const DashboardConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.customer,
	// auth: null,
	routes: [
		{
			path: '/dashboard',
			component: Dashboard
		}
	]
};

export default DashboardConfig;
