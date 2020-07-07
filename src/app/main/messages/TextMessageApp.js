import FusePageCarded from '@fuse/core/FusePageCarded';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import TextMessageDetails from './TextMessageDetails';
import TextMessageToolbar from './TextMessageToolbar';
import TextMessageHeader from './TextMessageHeader';
import TextMessageSidebarContent from './TextMessageSidebarContent';
import TextMessageSidebarHeader from './TextMessageSidebarHeader';
import TextMessageList from './TextMessageList';
import TextMessageListToolbar from './TextMessageListToolbar';

const TextMessageApp = (props) => {
  const { kindOfNotification } = props;

  const pageLayout = useRef(null);
  const routeParams = useParams();

  return (
    <FusePageCarded
      classes={{
        root: 'w-full',
        content: 'flex flex-col',
        // header: 'items-center min-h-72 h-400 sm:h-100 sm:min-h-100'
        header: 'min-h-0 mt-20 h-72',
        sidebarHeader: 'min-h-0 h-96'
      }}
      header={<TextMessageHeader pageLayout={pageLayout} />}
      contentToolbar={routeParams.mailId ? <TextMessageToolbar /> : <TextMessageListToolbar />}
      content={routeParams.mailId ? <TextMessageDetails /> : <TextMessageList kindOfNotification={kindOfNotification}/>}
      leftSidebarHeader={<TextMessageSidebarHeader />}
      leftSidebarContent={<TextMessageSidebarContent />}
      ref={pageLayout}
      innerScroll
    />
  );
}

export default TextMessageApp;
