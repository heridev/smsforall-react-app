import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import authRoutesConfig from 'app/main/auth/authRoutesConfig';
import Error404PageConfig from 'app/main/pages/Error404PageConfig';
import PagesConfig from 'app/main/pages/PagesConfig';
import DashboardPagesConfig from 'app/main/dashboard/DashboardPagesConfig';
import mobileHubConfig from 'app/main/mobile_hubs/mobileHubConfig';
import messageRoutesConfig from 'app/main/messages/messageRoutesConfig';
import userRoutesConfig from 'app/main/user/userRoutesConfig';
import ConfirmPinNumberPageConfig from 'app/main/user/confirmationAccount/ConfirmPinNumberPageConfig';

const routeConfigs = [
  ...authRoutesConfig,
  Error404PageConfig,
  PagesConfig,
  DashboardPagesConfig,
  mobileHubConfig,
  messageRoutesConfig,
  userRoutesConfig,
  ConfirmPinNumberPageConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    component: () => <Redirect to="/pages/error-404" />
  }
];

export default routes;
