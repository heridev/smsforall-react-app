import _ from '@lodash';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as Actions from '../store/actions';
import TextMessageListItem from './TextMessageListItem';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import { getTextMessagesCollection, setTextMessageSearchParams } from './text_messages.actions';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const TextMessageList = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('textMessagesAppTranslations');
  const classes = useStyles(props);
  const [currentPage, setPage] = useState(1);
  const { kindOfNotification } = props;

  useEffect(() => {
    dispatch(showLoadingSpinner());
    const params = {
      page_number: currentPage,
      kind_of_notification: kindOfNotification
    };
    dispatch(setTextMessageSearchParams(params));
    dispatch(getTextMessagesCollection(params));
  }, [dispatch, currentPage, kindOfNotification]);

  const isLoadingSpinnerVisible = useSelector(({ fuse }) => fuse.site.is_loading_spinner_visible);
  const textMessagesCollection = useSelector(({ textMessages }) => textMessages.textMessagesCollection);
  const textSearchParams = useSelector(({ textMessages }) => textMessages.textSearchParams);
  const filteredData = textMessagesCollection && textMessagesCollection.sms_notifications;
  const totPages = textMessagesCollection && textMessagesCollection.tot_pages;

  if (isLoadingSpinnerVisible) return <FuseLoading />;

  if (!filteredData) {
    return null;
  }

  const renderTextMessages = textMessages => {
    return textMessages.map(textMessage => {
      return <TextMessageListItem textMessage={textMessage} key={textMessage.id} />
    });
  }

  if (filteredData.length === 0) {
    return (
      <FuseAnimate delay={100}>
        <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            {t('NO_MESSAGES')}
          </Typography>
        </div>
      </FuseAnimate>
    );
  }

  const onChange = (event, newPage) => {
    const newTextSearch = _.merge({}, textSearchParams);
    setPage(newPage);
    newTextSearch.page_number = newPage;
    dispatch(setTextMessageSearchParams(newTextSearch));
    dispatch(getTextMessagesCollection(newTextSearch));
  };

  return (
    <List className="p-0">
      <div className={classes.pagination}>
        <Pagination
          page={currentPage}
          count={totPages}
          onChange={onChange}
          color="secondary" />
      </div>
      <FuseAnimateGroup
        enter={{
          animation: 'transition.slideUpBigIn'
        }}
      >
        {renderTextMessages(filteredData)}
      </FuseAnimateGroup>
      <div className={classes.pagination}>
        <Pagination
          page={currentPage}
          count={totPages}
          onChange={onChange}
          color="secondary" />
      </div>
    </List>
  );
}

export default withRouter(TextMessageList);
