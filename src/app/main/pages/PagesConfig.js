import HolaTu from './HolaTu';

const PagesConfig = {
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
  auth: null,
  routes: [
    {
      path: '/holatu',
      component: HolaTu
    }
  ]
};

export default PagesConfig;
