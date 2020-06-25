import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import { useForm } from '@fuse/hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import ButtonSubmitWithLoaderSpinner from 'app/common/ButtonSubmitWithLoaderSpinner';
import CountryAutocompleteSelect from 'app/common/CountryAutocompleteSelect';
import _ from '@lodash';
import { createSmsMobileHub } from './mobile_hubs.actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  layoutRoot: {
    paddingTop: '10px'
  },
  header: {
    minHeight: '0px',
    maxHeight: '75px'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '40%',
    left: '35%'
  }
}));

const MobileHubNew = props => {
  const classes = useStyles();
  const theme = useTheme();

  const { form, handleChange, handleChangeAutocomplete } = useForm({
    country_international_code: '',
    device_name: '',
    device_number: ''
  });

  const isFormValid = () => {
    const phoneRegex = /[0-9]{7,11}/;
    return (
      form.device_name.length > 0 &&
      form.country_international_code.length > 0 &&
      form.device_number &&
      form.device_number.length > 5 &&
      phoneRegex.test(form.device_number)
    );
  };

  const onAutocompleteChange = (event, values) => {
    if (values && values.phone) {
      handleChangeAutocomplete('country_international_code', values.phone);
    }
  };

  const disableCheckerFn = () => {
    return !isFormValid() || props.isLoadingSpinnerVisible;
  };

  const handleSubmit = ev => {
    const smsMobileHubData = {
      sms_mobile_hub: form
    };
    props.onCreateSmsMobileHub(smsMobileHubData);
    props.onShowLoadingSpinner();
    ev.preventDefault();
  };

  const hasValidationErrors = fieldName => {
    const result = _.find(props.validationErrors, function (value, key) {
      if (key === fieldName) {
        return true;
      }
    });

    return result;
  };

  const showValidationErrorMessage = fieldName => {
    const result = _.find(props.validationErrors, function (value, key) {
      if (key === fieldName) {
        return value;
      }
    });

    return result;
  };

  const mobileHubDetails = {};

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        header: classes.header
      }}
      header={
        <div className="flex flex-1 flex-col items-center sm:items-start">
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

          <div className="flex flex-col min-w-0 items-center sm:items-start">
            <FuseAnimate animation="transition.slideLeftIn" delay={50}>
              <Typography className="text-16 sm:text-20 truncate">Dar de alta nuevo dispositivo</Typography>
            </FuseAnimate>
          </div>
        </div>
      }
      content={
        <div className="p-24">
          <form
            name="registerForm"
            noValidate
            className="flex flex-col sm:w-full md:w-full lg:w-3/6"
            onSubmit={handleSubmit}
          >
            <TextField
              error={hasValidationErrors('device_name')}
              helperText={showValidationErrorMessage('device_name')}
              className="mb-16"
              label="Nombre del dispositivo"
              autoFocus
              type="name"
              name="device_name"
              value={form.device_name}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />

            <CountryAutocompleteSelect
              onAutocompleteChange={onAutocompleteChange}
              onDisableClearable
              labelProperty="Busca el código de tu país"
              className="mb-16"
            />

            <Typography className="mb-16" variant="body2">
              Utilizaremos este número para confirmar el dispositivo
              <br />
              <strong>Por favor incluye el código de área local</strong>
            </Typography>

            <TextField
              error={hasValidationErrors('device_number')}
              helperText={showValidationErrorMessage('device_number')}
              className="mb-16"
              label="Numero de Celular(solo números)"
              type="number"
              name="device_number"
              value={form.device_number}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />

            <ButtonSubmitWithLoaderSpinner buttonLabel="Dar de Alta" disableCheckerFn={disableCheckerFn} />
          </form>
        </div>
      }
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateSmsMobileHub: formData => dispatch(createSmsMobileHub(formData)),
    onShowLoadingSpinner: () => dispatch(showLoadingSpinner())
  };
};

const mapStateToProps = state => {
  return {
    isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible,
    validationErrors: state.mobileHubs.validationErrors
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileHubNew);
