import HowItWorks from './HowItWorks';

const PagesConfig = {
  settings: {
    settings: {
      layout: {}
    },

  },
  auth: null,
  routes: [
    {
      path: '/how-it-works',
      component: HowItWorks
    }
  ]
};

export default PagesConfig;
