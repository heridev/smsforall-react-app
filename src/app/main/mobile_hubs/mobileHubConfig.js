import { authRoles } from 'app/auth';
import MobileHubNew from './MobileHubNew';
import MobileHubDetails from './MobileHubDetails';
import MobileHubList from './MobileHubList';
import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'mobileHubTranslations', en);
i18next.addResourceBundle('es', 'mobileHubTranslations', es);

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
