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
import { useTranslation } from 'react-i18next';

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
  },
  activationPin: {
    fontFamily: 'initial',
    fontSize: '50px'
  }
});

const MobileHubDetails = props => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('mobileHubTranslations');
  const mobileHubDetails = useSelector(({ mobileHubs }) => mobileHubs.mobileHubDetails);
  const routeParams = useParams();
  let mobileHubUuid = t('DEVICE_NEEDS_ACTIVATION');

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
      <DialogTitle id="responsive-dialog-title">
        {t('ARE_YOU_SURE_TO_DESTROY')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('WARNING_ABOUT_DESTROY')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          {t('CANCEL_BUTTON_DESTROY')}
        </Button>
        <Button onClick={destroyMobileHub} color="primary" autoFocus>
          {t('CONTINUE_BUTTON_DESTROY')}
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
                <span className="mx-4">{t('LIST_ALL_MY_DEVICES')}</span>
              </Typography>
            </FuseAnimate>

            <div className="flex min-w-0 items-center sm:items-start">
              <FuseAnimate animation="transition.slideLeftIn" delay={50}>
                <Typography className="text-16 sm:text-20 truncate">
                  {t('NAME_OF_DEVICE')} : {mobileHubDetails && mobileHubDetails.device_name}
                </Typography>
              </FuseAnimate>
            </div>
          </div>

          <div className="flex items-center">
            <Button className={classes.deleteHub} onClick={handleClickOpen} variant="contained">
              {t('DESTROY_BUTTON_LABEL')}
            </Button>
          </div>
          {renderShowModalDialog()}
        </div>
      }
      content={
        <div className="p-24">
          <h4>
            {t('ACTIVATION_PIN_NUMBER')}
          </h4>
          <h4 className={classes.activationPin}>
            <strong>{mobileHubDetails && mobileHubDetails.temporal_password}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
          <h4>
            {t('UNIQUE_DEVICE_IDENTIFIER')}: {' '}
            <strong>{mobileHubUuid}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
          <h4>
            {t('SMS_HUB_PHONE_NUMBER')}: {' '}
            <strong>{mobileHubDetails && mobileHubDetails.device_number}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
          <h4>
            {t('INTERNATIONAL_CODE')}: {' '}
            <strong>+{mobileHubDetails && mobileHubDetails.country_international_code}</strong>
          </h4>
          <Divider className={classes.dividerStyle} />
          <h4>
            {t('STATUS_DEVICE_HUB')}: {' '}
            <strong>{mobileHubDetails && mobileHubDetails.friendly_status_name}</strong>
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
