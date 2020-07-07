import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import FuseLoading from '@fuse/core/FuseLoading';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { getSmsMobileHubDetails, destroySmsMobileHub } from './mobile_hubs.actions';

const useStyles = makeStyles({
  dividerStyle: {
    marginTop: '10px',
    marginBottom: '5px'
  },
  layoutRoot: {
    paddingTop: '10px'
  },
  header: {
    minHeight: '0px',
    maxHeight: '75px'
  },
  deleteHub: {
    color: 'white',
    background: 'red'
  }
});

const MobileHubDetails = props => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const mobileHubDetails = useSelector(({ mobileHubs }) => mobileHubs.mobileHubDetails);
  const routeParams = useParams();
  let mobileHubUuid = 'Needs to be activated first';

  if(mobileHubDetails && mobileHubDetails.status === 'activated') {
    mobileHubUuid = mobileHubDetails && mobileHubDetails.uuid;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const destroyMobileHub = () => {
    setOpen(false);
    dispatch(showLoadingSpinner());
    dispatch(destroySmsMobileHub(routeParams.mobileHubUid));
  };

  useEffect(() => {
    dispatch(showLoadingSpinner());
    dispatch(getSmsMobileHubDetails(routeParams.mobileHubUid));
  }, [dispatch, routeParams]);

  if (props.isLoadingSpinnerVisible) return <FuseLoading />;

  const renderShowModalDialog = () => (
    <Dialog fullScreen={false} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">Estás seguro de que deseas eliminar este dispositivo?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Al aceptar la eliminación de este dispositivo, aceptas que cualquier petición asociada a dicho
          dispositivo será eliminada de nuestro aplicación.
          Note: En caso de estar completamente seguro favor de confirmar en las siguientes opciones.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={destroyMobileHub} color="primary" autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        header: classes.header
      }}
      header={
        <div className="flex w-full">
          <div className="flex flex-col items-center sm:items-start w-10/12">
            <FuseAnimate animation="transition.slideRightIn" delay={50}>
              <Typography
                className="normal-case flex items-center sm:mb-12"
                component={Link}
                role="button"
                to="/mobile-hubs/list"
                color="inherit"
              >
                <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                <span className="mx-4">Ver todos mis dispositivos</span>
              </Typography>
            </FuseAnimate>

            <div className="flex min-w-0 items-center sm:items-start">
              <FuseAnimate animation="transition.slideLeftIn" delay={50}>
                <Typography className="text-16 sm:text-20 truncate">
                  Nombre del dispositivo: {mobileHubDetails && mobileHubDetails.device_name}
                </Typography>
              </FuseAnimate>
            </div>
          </div>

          <div className="flex items-center">
            <Button className={classes.deleteHub} onClick={handleClickOpen} variant="contained">
              Destruir
            </Button>
          </div>
          {renderShowModalDialog()}
        </div>
      }
      content={
        <div className="p-24">
          <h4>
            Pin de activación para aplicación Android:{' '}
            <strong>{mobileHubDetails && mobileHubDetails.temporal_password}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
          <h4>
            Identificador único: <strong>{mobileHubUuid}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
          <h4>
            Numero Móvil: <strong>{mobileHubDetails && mobileHubDetails.device_number}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
          <h4>
            Código Internacional: <strong>+{mobileHubDetails && mobileHubDetails.country_international_code}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
          <h4>
            Estado del dispositivo: <strong>{mobileHubDetails && mobileHubDetails.friendly_status_name}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
        </div>
      }
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileHubDetails);
