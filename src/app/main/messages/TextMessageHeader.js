import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { getTextMessagesCollection, setTextMessageSearchParams } from './text_messages.actions';

const TextMessageHeader = props => {
  const dispatch = useDispatch();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [firstLoad, setFirstLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const debounceSearch = useRef(
    _.debounce(searchTerm => {
      const params = {
        text_searched: searchTerm
      };
      dispatch(setTextMessageSearchParams(params));
      dispatch(getTextMessagesCollection(params));
    }, 500)
  );

  useEffect(
    () => {
      if(firstLoad) {
        setFirstLoading(false);
      } else {
        debounceSearch.current(searchTerm);
      }
    },
    // if we add the firstLoad it will make two requests :(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm] // Only call effect if debounced search term changes
  );

  const { t } = useTranslation('textMessagesAppTranslations');

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="flex flex-1">
        <Paper
          className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8"
          elevation={1}
        >
          <Hidden lgUp>
            <IconButton onClick={ev => props.pageLayout.current.toggleLeftSidebar()} aria-label="open left sidebar">
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

          <Icon color="action">search</Icon>

          <Input
            placeholder={t('SEARCH_PLACEHOLDER')}
            className="px-16"
            disableUnderline
            fullWidth
            value={searchTerm}
            inputProps={{
              'aria-label': 'Search'
            }}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default TextMessageHeader;
