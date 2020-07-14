import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import { useForm } from '@fuse/hooks';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import ButtonSubmitWithLoaderSpinner from 'app/common/ButtonSubmitWithLoaderSpinner';
import CountryAutocompleteSelect from 'app/common/CountryAutocompleteSelect';
import { createSmsMobileHub } from './mobile_hubs.actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { hasValidationErrors, showValidationErrorMessage } from 'app/common/UtilsCollection';
import { useTranslation } from 'react-i18next';

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
  const [internationalCode, setInternationalCodeValue] = useState(props.userData.country_international_code);
  const { t } = useTranslation('mobileHubTranslations');

  const { form, handleChange, handleChangeAutocomplete } = useForm({
    country_international_code: internationalCode,
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
      setInternationalCodeValue(values.phone);
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
              <span className="mx-4">{t('LIST_ALL_MY_DEVICES')}</span>
            </Typography>
          </FuseAnimate>

          <div className="flex flex-col min-w-0 items-center sm:items-start">
            <FuseAnimate animation="transition.slideLeftIn" delay={50}>
              <Typography className="text-16 sm:text-20 truncate">
                {t('ADD_NEW_HUB_DEVICE')}
              </Typography>
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
              error={hasValidationErrors(props.validationErrors, 'device_name')}
              helperText={showValidationErrorMessage(props.validationErrors, 'device_name')}
              className="mb-16"
              label={t('NAME_OF_DEVICE')}
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
              defaultIntCode={internationalCode}
              labelProperty={t('SEARCH_YOUR_COUNTRY_CODE')}
              className="mb-16"
            />

            <Typography className="mb-16" variant="body2">
              {t('WE_WILL_CONFIRM_NUMBER_PART_1')}
              <br />
              <strong>{t('PLEASE_INCLUDE_LOCAL_CODE')}</strong>
            </Typography>

            <TextField
              error={hasValidationErrors(props.validationErrors, 'device_number')}
              helperText={showValidationErrorMessage(props.validationErrors, 'device_number')}
              className="mb-16"
              label={t('SMS_HUB_PHONE_NUMBER_TWO')}
              type="number"
              name="device_number"
              value={form.device_number}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />

            <ButtonSubmitWithLoaderSpinner
              buttonLabel={t('CREATE_DEVICE_BUTTON_FORM')}
              disableCheckerFn={disableCheckerFn} />
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
    validationErrors: state.utilsReducers.validationErrors,
    userData: state.auth.user.data
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileHubNew);
