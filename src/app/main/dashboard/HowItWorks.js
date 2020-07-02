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
          <Typography className="flex-1 text-20 mx-16">Como funciona smsparatodos.com</Typography>
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
                    <h1>Regístrate</h1>
                    <img className="w-256 m-32" src="assets/images/pages/registrate.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={2}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Registra un nuevo dispositivo móvil</h1>
                    <p>
                      Que cuente con un plan válido para envío de SMS (la gran mayoría de empresas de telefonía ofrecen
                      planes ilimitados)
                    </p>
                    <img className="w-256 m-32" src="assets/images/pages/how-it-works-part-2.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={3}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Descarga nuestra Android app</h1>
                    <p>Disponible en la Play Store</p>
                    <img className="w-256 m-32" src="assets/images/pages/disponible-playstore.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={4}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Ingresa el pin de activación</h1>
                    <p>El cual fue generado automáticamente después de crear un nuevo dispositivo, ej: OHcbTr</p>
                    <img className="w-256 m-32" src="assets/images/pages/ingreso-pin.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={5}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Validación de dispositivo</h1>
                    <p>Espera un momento para validar tu dispositivo</p>
                    <img className="w-256 m-32" src="assets/images/pages/validando-dispositivo.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={6}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Estado del dispositivo</h1>
                    <p>
                      Si todo salió correctamente podrás comenzar a enviar mensajes a través de nuestra API o desde
                      nuestro panel en smsparatodos.com
                    </p>
                    <img className="w-256 m-32" src="assets/images/pages/estado-dispositivo.jpg" alt="registro" />
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={7}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Integra smsparatodos.com en tu aplicación Web</h1>
                    <p>CRM, CMS, etc, o utiliza nuestro panel de usuario para envío de mensajes.</p>
                  </Paper>
                </div>

                <div className="flex justify-center pb-64 sm:p-2 sm:pb-2 md:p-2 md:pb-50" key={8}>
                  <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Comienza a enviar mensajes de textos grátis</h1>
                    <p>
                      Ahora podrás enviar mensajes de texto transaccionales y para campañas gratis, solo recuerda
                      mantener tu dispositivo siempre conectado a internet y con un plan de telefonía valido.
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
            <StepLabel classes={{ root: classes.stepLabel }}>Regístrate</StepLabel>
          </Step>

          <Step key={2} onClick={() => handleChangeActiveStep(2)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Registra un nuevo dispositivo</StepLabel>
          </Step>

          <Step key={3} onClick={() => handleChangeActiveStep(3)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Descarga nuestra Android app</StepLabel>
          </Step>

          <Step key={4} onClick={() => handleChangeActiveStep(4)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Ingresa el pin de activación</StepLabel>
          </Step>

          <Step key={5} onClick={() => handleChangeActiveStep(5)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Validación de dispositivo</StepLabel>
          </Step>

          <Step key={6} onClick={() => handleChangeActiveStep(6)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Estado del dispositivo</StepLabel>
          </Step>

          <Step key={7} onClick={() => handleChangeActiveStep(7)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Integra smsparatodos.com en tu aplicación</StepLabel>
          </Step>

          <Step key={8} onClick={() => handleChangeActiveStep(8)}>
            <StepLabel classes={{ root: classes.stepLabel }}>Comienza a enviar mensajes de textos grátis</StepLabel>
          </Step>
        </Stepper>
      }
      innerScroll
      ref={pageLayout}
    />
  );
};

export default Course;
