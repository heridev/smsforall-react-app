import i18next from 'i18next';
import es from './navigation-i18n/es';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'OPTIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'my-devices',
        translate: 'MY_DEVICES',
        type: 'collapse',
        icon: 'phone_android',
        url: '/mobile-hubs/list',
        children: [
          {
            id: 'my-devices-list',
            translate: 'LIST_DEVICES',
            type: 'item',
            url: '/mobile-hubs/list'
          },
          {
            id: 'my-devices-new',
            translate: 'CREATE_NEW_DEVICE',
            type: 'item',
            url: '/mobile-hubs/new'
          }
        ]
      },
      {
        id: 'how-it-works',
        translate: 'HOW_IT_WORKS',
        type: 'item',
        icon: 'sim_card',
        url: '/how-it-works'
      },

      {
        id: 'sms-notifications',
        translate: 'MANAGE_TEXT_MESSAGES',
        type: 'collapse',
        icon: 'message',
        children: [
          {
            id: 'sms-notifications-lists',
            translate: 'LIST_TEXT_MESSAGES',
            type: 'item',
            url: '/sms-notifications/list/out'
          },
          {
            id: 'sms-notifications-new',
            translate: 'SEND_SMS_FORM',
            type: 'item',
            url: '/sms-notifications/new'
          }
        ]
      }
    ]
  },
  {
    id: 'pages',
    translate: 'DEVELOPERS_REST_API',
    type: 'group',
    icon: 'pages',
    children: [
      {
        id: 'overview-api',
        translate: 'OVERVIEW_API',
        type: 'item',
        url: '/user/api/overview',
        icon: 'vpn_key'
      },
      {
        id: 'sms-notifications-authorization-keys',
        translate: 'AUTHORIZATION_KEYS',
        type: 'item',
        url: '/user/api/authorization-keys',
        icon: 'vpn_key'
      },
      {
        id: 'sms-notifications-new',
        translate: 'CODE_EXAMPLES',
        type: 'item',
        url: '/user/api/credentials',
        icon: 'vpn_key'
      },
      {
        id: 'how-to-send-using-our-api',
        translate: 'API_DOCS',
        type: 'collapse',
        icon: 'vpn_key',
        children: [
          {
            id: 'api-body-params',
            translate: 'API_BODY_PARAMS',
            type: 'item',
            url: '/user/api/body-params'
          },
          {
            id: 'api-success-requests',
            translate: 'API_SUCCESS_REQUESTS',
            type: 'item',
            url: '/user/api/success_requests'
          },
          {
            id: 'api-failed-requests',
            translate: 'API_FAILED_REQUESTS',
            type: 'item',
            url: '/user/api/failed_requests'
          },
        ]
      }
    ]
  }
];

export default navigationConfig;
