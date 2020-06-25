import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    '& .logo-icon': {
      width: 15,
      height: 15,
      transition: theme.transitions.create(['width', 'height'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut
      })
    },
    '& .react-badge, & .logo-text': {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut
      })
    }
  },
  reactBadge: {
    backgroundColor: '#121212',
    color: '#61DAFB'
  }
}));

function Logo() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, 'flex items-center')}>
      <img className="w-1/2" src="assets/images/logos/logo-pequeno-blanco.png" alt="logo smsparatodos" />
    </div>
  );
}

export default Logo;
