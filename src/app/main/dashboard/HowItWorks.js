import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles(theme => ({
  stepLabel: {
    cursor: 'pointer!important'
  },
  successFab: {
    background: `${green[500]}!important`,
    color: 'white!important'
  }
}));

const Course = props => {
  const theme = useTheme();
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [activeStep, setActiveStep] = useState(1);

  const handleChangeActiveStep = index => {
    setActiveStep(index);
  };

  const handleNext = event => {
    event.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleBack = event => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
  };

  return (
    <FusePageSimple
      classes={{
        content: 'flex flex-col flex-auto overflow-hidden',
        header: 'h-72 min-h-72'
      }}
      header={
        <div className="flex flex-1 items-center px-16 lg:px-24">
          <Hidden lgUp>
            <IconButton onClick={ev => pageLayout.current.toggleLeftSidebar()} aria-label="open left sidebar">
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>
          <IconButton to="/mobile-hubs/list" component={Link}>
            <Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
          </IconButton>
          <Typography className="flex-1 text-20 mx-16">How it works smsforall.org</Typography>
        </div>
      }
      content={
        true && (
          <div className="flex flex-1 relative overflow-hidden">
            <FuseScrollbars className="w-full overflow-auto">
              <SwipeableViews
                className="overflow-hidden"
                index={activeStep - 1}
                enableMouseEvents
                onChangeIndex={handleChangeActiveStep}
              >
                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={1}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Register a new account</h1>
                    <img className="w-256 m-32" src="assets/images/pages/registrate.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={2}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Register a new device</h1>
                    <p>
                      that has a valid plan to send SMS messages
                    </p>
                    <img className="w-256 m-32" src="assets/images/pages/register-new-device.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={3}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Download our APK </h1>
                    <p>You can test the functionality initially by installing the current APK that uses the https://api.smsforall.org API internally</p>
                    <p>Or you can download the source code and build your own version!</p>
                    <Link to={{ pathname: 'https://smsforall.org/download/' }} target="_blank">https://smsforall.org/download/</Link>
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={4}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Enter your activation code(pin)</h1>
                    <p>This one is generated after you add a new device and is a short pin, eg: OHcbTr</p>
                    <img className="w-256 m-32" src="assets/images/pages/activation-needed.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={5}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Validation of your device</h1>
                    <p>Wait a moemnt until we validate your device</p>
                    <img className="w-256 m-32" src="assets/images/pages/sending-test.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={6}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Device's status</h1>
                    <p>
                      If everything went well, you should be able to send SMS message through our API(https://api.smsforall.org)
                      or using our panel at https://app.smsforall.org
                    </p>
                    <img className="w-256 m-32" src="assets/images/pages/estado-dispositivo.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={7}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Integrate {' '}
                      <Link to={{ pathname: 'https://api.smsforall.org' }} target="_blank">https://api.smsforall.org</Link>
                      {' '}
                      in your custom application</h1>
                    <p>CRM, CMS, etc, o use our panel at {' '}
                      <Link to={{ pathname: 'https://app.smsforall.org' }} target="_blank">https://app.smsforall.org</Link>
                      {' '}
                      to send messages and manage them</p>
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={8}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Begin sending unlimited SMS messages</h1>
                    <p>
                      Starting now, you would be able to send transactional SMS and all you need to do is to keep
                      your device connected to internet, with a valid SMS plan and active(avoid the suspense mode).
                    </p>
                  </Paper>
                </div>
              </SwipeableViews>
            </FuseScrollbars>

            <div className="flex justify-center w-full absolute left-0 right-0 bottom-0 pb-16 md:pb-32">
              <div className="flex justify-between w-full max-w-xl px-8">
                <div>
                  {activeStep !== 1 && (
                    <Fab className="" color="secondary" onClick={handleBack}>
                      <Icon>{theme.direction === 'ltr' ? 'chevron_left' : 'chevron_right'}</Icon>
                    </Fab>
                  )}
                </div>
                <div>
                  {activeStep < 8 ? (
                    <Fab className="" color="secondary" onClick={handleNext}>
                      <Icon>{theme.direction === 'ltr' ? 'chevron_right' : 'chevron_left'}</Icon>
                    </Fab>
                  ) : (
                    <Fab className={classes.successFab} to="/mobile-hubs/list" component={Link}>
                      <Icon>check</Icon>
                    </Fab>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }
      leftSidebarContent={
        <Stepper classes={{ root: 'bg-transparent' }} activeStep={activeStep - 1} orientation="vertical">
          <Step key={1} onClick={() => handleChangeActiveStep(1)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Register a new account</StepLabel>
          </Step>

          <Step key={2} onClick={() => handleChangeActiveStep(2)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Register a new mobile device</StepLabel>
          </Step>

          <Step key={3} onClick={() => handleChangeActiveStep(3)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Download our Android application or build your own</StepLabel>
          </Step>

          <Step key={4} onClick={() => handleChangeActiveStep(4)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Enter the activation code</StepLabel>
          </Step>

          <Step key={5} onClick={() => handleChangeActiveStep(5)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Validate your device</StepLabel>
          </Step>

          <Step key={6} onClick={() => handleChangeActiveStep(6)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Device's status</StepLabel>
          </Step>

          <Step key={7} onClick={() => handleChangeActiveStep(7)}>
            <StepLabel classes={{ root: classes.stepLabel }}>How to integrate the https://api.smsforall.org API in your application</StepLabel>
          </Step>

          <Step key={8} onClick={() => handleChangeActiveStep(8)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Begin sending unlimited SMS messages</StepLabel>
          </Step>
        </Stepper>
      }
      innerScroll
      ref={pageLayout}
    />
  );
};

export default Course;
