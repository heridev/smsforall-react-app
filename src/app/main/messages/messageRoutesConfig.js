import { authRoles } from 'app/auth';
import NewTextMessage from './NewTextMessage';
// import MobileHubDetails from './MobileHubDetails';
import TextMessageList from './TextMessageList';

const messageRoutesConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.customer,
  routes: [
    {
      path: '/sms-notifications/new',
      component: NewTextMessage
    },
    {
      path: '/sms-notifications/list',
      component: TextMessageList
    }
    // {
    // exact: true,
    //  path: '/mobile-hubs/:mobileHubUid/details',
    //  component: MobileHubDetails
    // }
  ]
};

export default messageRoutesConfig;
