import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 21,
    borderRadius: 2,
    padding: '0 6px',
    fontSize: 11,
    backgroundColor: 'rgba(0,0,0,.08);'
  },
  color: {
    width: 8,
    height: 8,
    marginRight: 4,
    borderRadius: '50%'
  },
  mailItem: {
    borderBottom: `1px solid  ${theme.palette.divider}`,

    '&.unread': {
      background: 'rgba(0,0,0,0.03)'
    },
    '&.selected': {
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        display: 'block',
        height: '100%',
        width: 3,
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary[500]
  }
}));

const TextMessageListItem = props => {
  const {
    textMessage: { attributes: textMessageAttrs }
  } = props;
  const classes = useStyles(props);
  const checked = false;

  const renderProcessedBy = textMessageAttrs => {
    const processedBy = textMessageAttrs.processed_by_sms_mobile_hub;
    const decoratedStatus = textMessageAttrs.decorated_status;
    // if (decoratedStatus === 'delivered') return null;
    if (!(processedBy && processedBy.data)) return null;

    return `Processed by: ${processedBy.data.attributes.device_name}`;
  };

  return (
    <ListItem
      dense
      button
      onClick={
        () => console.log('something....')
        // props.history.push(
        //   toPath({
        //     ...routeParams,
        //     mailId: props.textMessage.attributes.id
        //   })
        // )
      }
    >
      <Checkbox
        tabIndex={-1}
        disableRipple
        checked={checked}
        onChange={() => console.log('on change checkbox')}
        onClick={ev => ev.stopPropagation()}
      />

      <div className="flex flex-1 flex-col relative overflow-hidden">
        <div className="flex items-center justify-between px-16 pb-8">
          <div className="flex items-center">
            <Typography variant="subtitle1">{textMessageAttrs.sms_number}</Typography>
          </div>

          <div className="flex items-center">
            <Typography variant="subtitle1">{renderProcessedBy(textMessageAttrs)}</Typography>
          </div>

          <div className="flex items-center">
            <Typography>{textMessageAttrs.decorated_delivered_at}</Typography>
          </div>
        </div>

        <div className="flex items-center justify-between px-16 pb-8">
          <div className="flex items-center">
            <Typography>{textMessageAttrs.sms_content}</Typography>
          </div>
        </div>

        <div className="flex justify-end pl-12">
          <div className="flex items-center pl-16 hidden">
            <Typography variant="subtitle1">{textMessageAttrs.sms_number}</Typography>
          </div>

          <div className="flex justify-end px-12">
            <div className={clsx(classes.labelContainer, 'mx-2 mt-4')}>
              <div className={classes.color} style={{ backgroundColor: '#388E3C' }} />
              <div>{textMessageAttrs.decorated_status}</div>
            </div>
          </div>
        </div>
      </div>
    </ListItem>
  );
};

export default TextMessageListItem;
