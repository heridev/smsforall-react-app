import React from 'react';
import i18next from 'i18next';
import { authRoles } from 'app/auth';
import NewTextMessage from './NewTextMessage';
// import MobileHubDetails from './MobileHubDetails';
import TextMessageApp from './TextMessageApp';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'textMessagesAppTranslations', en);
i18next.addResourceBundle('es', 'textMessagesAppTranslations', es);

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
      exact: true,
      path: '/sms-notifications/list/out',
      component: () => <TextMessageApp kindOfNotification="out" />
    },
    {
      exact: true,
      path: '/sms-notifications/list/in',
      component: () => <TextMessageApp kindOfNotification="in" />
    }
    // {
    // exact: true,
    //  path: '/mobile-hubs/:mobileHubUid/details',
    //  component: MobileHubDetails
    // }
  ]
};

export default messageRoutesConfig;
