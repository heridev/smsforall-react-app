import i18next from 'i18next';
import { authRoles } from 'app/auth';
// import NewTextMessage from './NewTextMessage';
import ApiCredentials from './api/Credentials';
import ApiOverview from './api/Overview';
import AuthorizationKeys from './api/AuthorizationKeys';
import SuccessCodes from './api/SuccessCodes';
import ErrorCodes from './api/ErrorCodes';
import BodyParamsPage from './api/BodyParamsPage';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'userSettingAppTranslations', en);
i18next.addResourceBundle('es', 'userSettingAppTranslations', es);

const userRoutesConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.customer,
  routes: [
    {
      path: '/user/api/overview',
      component: ApiOverview
    },
    {
      path: '/user/api/authorization-keys',
      component: AuthorizationKeys
    },
    {
      path: '/user/api/credentials',
      component: ApiCredentials
    },
    {
      path: '/user/api/body-params',
      component: BodyParamsPage
    },
    {
      path: '/user/api/success_requests',
      component: SuccessCodes
    },
    {
      path: '/user/api/failed_requests',
      component: ErrorCodes
    },
    {
      path: '/user/settings',
      component: ApiCredentials
    }
  ]
};

export default userRoutesConfig;
