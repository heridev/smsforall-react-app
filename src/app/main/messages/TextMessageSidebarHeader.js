import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TextMessageSidebarHeader = (props) => {
  const { t } = useTranslation('textMessagesAppTranslations');

  return (
    <div className="flex flex-col justify-center h-full p-24">
      <div className="flex items-center flex-1">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">mail</Icon>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <span className="text-18 mx-16">{t('APP_TITLE')}</span>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default TextMessageSidebarHeader;
