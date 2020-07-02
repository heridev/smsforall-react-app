import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import authRoutesConfig from 'app/main/auth/authRoutesConfig';
import Error404PageConfig from 'app/main/pages/Error404PageConfig';
import DashboardPagesConfig from 'app/main/dashboard/DashboardPagesConfig';
import mobileHubConfig from 'app/main/mobile_hubs/mobileHubConfig';
import messageRoutesConfig from 'app/main/messages/messageRoutesConfig';

const routeConfigs = [...authRoutesConfig, Error404PageConfig, DashboardPagesConfig, mobileHubConfig, messageRoutesConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    component: () => <Redirect to="/pages/error-404" />
  }
];

export default routes;
