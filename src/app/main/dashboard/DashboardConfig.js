import { authRoles } from 'app/auth';
import Dashboard from './Dashboard';

const DashboardConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.customer,
  routes: [
    {
      path: '/',
      exact: true,
      component: Dashboard
    }
  ]
};

export default DashboardConfig;
