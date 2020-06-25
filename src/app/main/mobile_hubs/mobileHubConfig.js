import { authRoles } from 'app/auth';
import MobileHubNew from './MobileHubNew';
import MobileHubDetails from './MobileHubDetails';
import MobileHubList from './MobileHubList';

const mobileHubConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.customer,
  routes: [
    {
      exact: true,
      path: '/mobile-hubs/new',
      component: MobileHubNew
    },
    {
      exact: true,
      path: '/mobile-hubs/list',
      component: MobileHubList
    },
    {
      exact: true,
      path: '/mobile-hubs/:mobileHubUid/details',
      component: MobileHubDetails
    }
  ]
};

export default mobileHubConfig;
