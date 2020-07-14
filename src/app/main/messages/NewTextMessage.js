import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import { useForm } from '@fuse/hooks';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import ButtonSubmitWithLoaderSpinner from 'app/common/ButtonSubmitWithLoaderSpinner';
import CountryAutocompleteSelect from 'app/common/CountryAutocompleteSelect';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getSmsMobileHubCollection } from 'app/main/mobile_hubs/mobile_hubs.actions';
import FuseLoading from '@fuse/core/FuseLoading';
import { createTextMessage, setTextMessageCreationAs } from './text_messages.actions';
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
  const CHARACTER_LIMIT = 160;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [internationalCode, setInternationalCodeValue] = useState(props.userData.country_international_code);
  const { t } = useTranslation('textMessagesAppTranslations');

  useEffect(() => {
    dispatch(showLoadingSpinner());
    dispatch(getSmsMobileHubCollection('/activated'));
  }, [dispatch]);

  const mobileHubCollection = useSelector(({ mobileHubs }) => mobileHubs.mobileHubCollection);

  const { form, handleChange, handleChangeAutocomplete, resetForm } = useForm({
  // const { setInForm, form, handleChange, handleChangeAutocomplete, resetForm } = useForm({
    country_international_code: internationalCode,
    sms_content: '',
    sms_number: '',
    sms_type: 'standard_delivery',
    mobile_hub_uuid: '',
    mobile_hub: undefined
  });

  const isFormValid = () => {
    const phoneRegex = /[0-9]{7,11}/;
    const validHubUid = form.mobile_hub_uuid || (mobileHubCollection.length > 0);
    return (
      form.sms_content.length > 0 &&
      internationalCode.length > 0 &&
      form.sms_type &&
      validHubUid &&
      form.sms_number &&
      form.sms_number.length > 5 &&
      phoneRegex.test(form.sms_number)
    );
  };

  const onAutocompleteChange = (event, values) => {
    if (values && values.phone) {
      setInternationalCodeValue(values.phone);
      handleChangeAutocomplete('country_international_code', values.phone);
    }
    event.preventDefault();
  };

  const disableCheckerFn = () => {
    return !isFormValid() || props.isLoadingSpinnerVisible;
  };

  const handleSubmit = ev => {
    const smsTextMessageData = {
      hub_uuid: form.mobile_hub_uuid || mobileHubCollection[0].attributes.uuid,
      sms_notification: {
        sms_type: form.sms_type,
        sms_number: `+${form.country_international_code}${form.sms_number}`,
        sms_content: form.sms_content
      }
    };
    props.onCreateTextMessage(smsTextMessageData);
    props.onShowLoadingSpinner();
    ev.preventDefault();
  };

  const smsContentValidationAndCharacterCounter = fieldName => {
    return `${form.sms_content.length}/${CHARACTER_LIMIT}`;
  };

  if (props.textMessageCreationStatus === 'success') {
    resetForm();
    props.onSetTextMessageCreationAs('');
  }

  if (props.isLoadingSpinnerVisible) return <FuseLoading />;

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
              <span className="mx-4">
                {t('VIEW_ALL_MESSAGES')}
              </span>
            </Typography>
          </FuseAnimate>

          <div className="flex flex-col min-w-0 items-center sm:items-start">
            <FuseAnimate animation="transition.slideLeftIn" delay={50}>
              <Typography className="text-16 sm:text-20 truncate">
                {t('SEND_NEW_TEXT_MESSAGE')}
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
            <CountryAutocompleteSelect
              onAutocompleteChange={onAutocompleteChange}
              onDisableClearable
              defaultIntCode={internationalCode}
              labelProperty={t('SEARCH_YOUR_COUNTRY_CODE')}
              className="mb-16"
            />

            <FormControl required variant="outlined">
              <InputLabel htmlFor="sms-type-native-required">
                {t('SELECT_DEVICE_FROM')}
              </InputLabel>
              <Select
                label={t('SELECT_DEVICE_FROM')}
                native
                value={form.mobile_hub_uuid}
                onChange={handleChange}
                className="mb-16"
                name="mobile_hub_uuid"
                inputProps={{
                  id: 'sms-type-native-required'
                }}
              >
                {mobileHubCollection.map(mobileHub=> {
                  return(<option key={mobileHub.attributes.uuid} value={mobileHub.attributes.uuid}>{`${mobileHub.attributes.device_name} - ${mobileHub.attributes.device_number}`}</option>)
                })}
              </Select>
            </FormControl>

            <FormControl required variant="outlined">
              <InputLabel htmlFor="sms-type-native-required">
                {t('SMS_TYPE_LABEL')}
              </InputLabel>
              <Select
                label={t('SMS_TYPE_LABEL')}
                native
                value={form.sms_type}
                onChange={handleChange}
                className="mb-16"
                name="sms_type"
                inputProps={{
                  id: 'sms-type-native-required'
                }}
              >
                <option value="standard_delivery">Entrega Estandard</option>
                <option value="urgent_delivery">Entrega inmediata</option>
              </Select>
            </FormControl>

            <TextField
              className="mb-16"
              label={t('SMS_HUB_PHONE_NUMBER')}
              type="number"
              name="sms_number"
              value={form.sms_number}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              helperText={smsContentValidationAndCharacterCounter('sms_content')}
              inputProps={{
                maxLength: CHARACTER_LIMIT
              }}
              className="mb-16"
              label={t('NEW_SMS_CONTENT')}
              autoFocus
              type="text"
              name="sms_content"
              value={form.sms_content}
              onChange={handleChange}
              variant="outlined"
              rows={4}
              multiline
              required
              fullWidth
            />

            <ButtonSubmitWithLoaderSpinner
              buttonLabel={t('SEND_SMS_BUTTON_LABEL')}
              disableCheckerFn={disableCheckerFn} />
          </form>
        </div>
      }
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateTextMessage: formData => dispatch(createTextMessage(formData)),
    onShowLoadingSpinner: () => dispatch(showLoadingSpinner()),
    onSetTextMessageCreationAs: (status) => dispatch(setTextMessageCreationAs())
  };
};

const mapStateToProps = state => {
  return {
    isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible,
    validationErrors: state.utilsReducers.validationErrors,
    userData: state.auth.user.data,
    textMessageCreationStatus: state.textMessages.textMessageCreationStatus
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileHubNew);
