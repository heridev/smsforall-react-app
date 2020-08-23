import ConfirmPinNumberPage from './ConfirmPinNumberPage';
import { authRoles } from 'app/auth';

const ConfirmPinNumberPageConfig = {
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
  auth: authRoles.customer,
  routes: [
    {
      exact: true,
      path: '/user/confirm-pin-page',
      component: ConfirmPinNumberPage
    }
  ]
};

export default ConfirmPinNumberPageConfig;
