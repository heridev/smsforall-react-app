import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import authRoutesConfig from 'app/main/auth/authRoutesConfig';
import Error404PageConfig from 'app/main/pages/Error404PageConfig';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';

const routeConfigs = [
  ExampleConfig,
  ...authRoutesConfig,
  Error404PageConfig,
  DashboardConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />
  },

	{
		component: () => <Redirect to="/pages/error-404" />
	}
];

export default routes;
