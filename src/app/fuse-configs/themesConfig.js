import { fuseDark, skyBlue } from '@fuse/colors';
import { red } from '@material-ui/core/colors';

const themesConfig = {
  tech: {
    palette: {
      type: 'light',
      primary: {
        light: '#87EFFF',
        main: '#4DBCE9',
        dark: '#008CB7',
        contrastText: '#FFF'
      },
      secondary: {
        light: '#FFFF83',
        main: '#4DBCE9',
        dark: '#9DB516'
      },
      background: {
        paper: '#FFFFFF',
        default: '#F7F7F7'
      }
    }
  },
  defaultDark: {
    palette: {
      type: 'dark',
      primary: fuseDark,
      secondary: {
        light: skyBlue[100],
        main: skyBlue[500],
        dark: skyBlue[900]
      },
      background: {
        paper: '#1E2125',
        default: '#121212'
      },
      error: red
    },
    status: {
      danger: 'orange'
    }
  }
};

export default themesConfig;
