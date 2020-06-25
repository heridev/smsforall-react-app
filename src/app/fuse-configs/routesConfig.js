import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import authRoutesConfig from 'app/main/auth/authRoutesConfig';
import PagesConfig from 'app/main/pages/PagesConfig';
import Error404PageConfig from 'app/main/pages/Error404PageConfig';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import mobileHubConfig from 'app/main/mobile_hubs/mobileHubConfig';

const routeConfigs = [
  ...authRoutesConfig,
  Error404PageConfig,
  PagesConfig,
  DashboardConfig,
  mobileHubConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    component: () => <Redirect to="/pages/error-404" />
  }
];

export default routes;
