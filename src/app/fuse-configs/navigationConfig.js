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
      // {
      //  id: 'send-sms',
      //  translate: 'SEND_SMS_FORM',
      //  type: 'item',
      //  icon: 'message',
      //  url: '/apps/academy'
      // },
      {
       id: 'how-it-works',
       translate: 'HOW_IT_WORKS',
       type: 'item',
       icon: 'sim_card',
       url: '/how-it-works'
      },
    ]
  },
  {
    id: 'pages',
    title: 'Desarrolladores',
    type: 'group',
    icon: 'pages',
    children: [
      {
        id: 'how-to-send-using-our-api',
        translate: 'HOW_TO_SEND_USING_OUR_API',
        type: 'collapse',
        icon: 'vpn_key',
        // children: [
        //   {
        //     id: 'authentication-lock-screen',
        //     title: 'Lock Screen',
        //     type: 'item',
        //     url: '#'
        //   },
        //   {
        //     id: 'authentication-mail-confirmation',
        //     title: 'Mail Confirmation',
        //     type: 'item',
        //     url: '/pages/auth/mail-confirm'
        //   }
        // ]
      }
    ]
  }
];

export default navigationConfig;
