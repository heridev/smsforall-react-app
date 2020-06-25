import i18next from 'i18next';
import Example from './Example';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const ExampleConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth    : authRoles.admin,//['admin']
  routes: [
    {
      path: '/example',
      component: Example
    }
  ]
};

export default ExampleConfig;
