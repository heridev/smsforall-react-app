import { authRoles } from 'app/auth';
import Dashboard from './Dashboard';
import HowItWorks from './HowItWorks';

const DashboardPagesConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.customer,
  routes: [
    {
      path: '/',
      exact: true,
      component: Dashboard
    },
    {
      path: '/how-it-works',
      component: HowItWorks
    }
  ]
};

export default DashboardPagesConfig;
