import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  listItem: {
    color: 'inherit!important',
    textDecoration: 'none!important',
    height: 40,
    width: 'calc(100% - 16px)',
    borderRadius: '0 20px 20px 0',
    paddingLeft: 24,
    paddingRight: 12,
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: `${theme.palette.secondary.contrastText}!important`,
      pointerEvents: 'none',
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {
      fontSize: 16,
      width: 16,
      height: 16,
      marginRight: 16
    }
  },
  listSubheader: {
    paddingLeft: 24
  }
}));

const TextMessageSidebarContent = props => {
  const filters = [];

  const classes = useStyles();
  const { t } = useTranslation('textMessagesAppTranslations');

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={400}>
      <div className="flex-auto border-l-1">
        <div>
          <List>
            <ListSubheader className={classes.listSubheader} disableSticky>
              {t('MESSAGE_TYPES')}
            </ListSubheader>

            <ListItem
              button
              component={NavLinkAdapter}
              to="/sms-notifications/list/in"
              key={0}
              activeClassName="active"
              className={classes.listItem}
            >
              <Icon className="list-item-icon" color="action">
                inbox
              </Icon>
              <ListItemText primary={t('INBOX')} disableTypography />
            </ListItem>

            <ListItem
              button
              component={NavLinkAdapter}
              to="/sms-notifications/list/out"
              key={1}
              activeClassName="active"
              className={classes.listItem}
            >
              <Icon className="list-item-icon" color="action">
                send
              </Icon>
              <ListItemText primary={t('SENT')} disableTypography />
            </ListItem>
          </List>

          <List>
            <ListSubheader className={classes.listSubheader} disableSticky>
              {t('FILTERS')}
            </ListSubheader>

            {filters.length > 0 &&
              filters.map(filter => (
                <ListItem
                  button
                  component={NavLinkAdapter}
                  to={`/apps/mail/filter/${filter.handle}`}
                  activeClassName="active"
                  className={classes.listItem}
                  key={filter.id}
                >
                  <Icon className="list-item-icon" color="action">
                    {filter.icon}
                  </Icon>
                  <ListItemText primary={filter.translate ? t(filter.translate) : filter.title} disableTypography />
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    </FuseAnimate>
  );
};

export default TextMessageSidebarContent;
