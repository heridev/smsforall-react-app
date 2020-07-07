import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import RubyCode from './RubyCode';
import CurlCode from './CurlCode';
import PhpCode from './PhpCode';
import PythonCode from './PythonCode';
import NodejsCode from './NodejsCode';
import CNetCode from './CNetCode';
import JavaCode from './JavaCode';

const useStyles = makeStyles({
  layoutRoot: {}
});

const Credentials = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
        toolbar: 'px-16 sm:px-24'
      }}
      contentToolbar={
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="off"
          className="w-full h-64 border-b-1"
        >
          <Tab className="h-64" label="Curl" />
          <Tab className="h-64" label="Ruby" />
          <Tab className="h-64" label="Php" />
          <Tab className="h-64" label="Python" />
          <Tab className="h-64" label="Node.js" />
          <Tab className="h-64" label="C#" />
          <Tab className="h-64" label="Java" />
        </Tabs>
      }
      content={
        <div className="p-24">
          {selectedTab === 0 && (
            <div>
              <CurlCode />
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              <RubyCode />
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <PhpCode />
            </div>
          )}
          {selectedTab === 3 && (
            <div>
              <PythonCode />
            </div>
          )}
          {selectedTab === 4 && (
            <div>
              <NodejsCode/>
            </div>
          )}
          {selectedTab === 5 && (
            <div>
              <CNetCode />
            </div>
          )}
          {selectedTab === 6 && (
            <div>
              <JavaCode />
            </div>
          )}
        </div>
      }
    />
  );
};

export default Credentials;
