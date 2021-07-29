import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import { useForm } from '@fuse/hooks';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { showLoadingSpinner, httpRequestStarts } from 'app/store/actions/fuse/site.actions';
import ButtonSubmitWithLoaderSpinner from 'app/common/ButtonSubmitWithLoaderSpinner';
import CountryAutocompleteSelect from 'app/common/CountryAutocompleteSelect';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { createTextMessageFromPublic } from 'app/main/messages/text_messages.actions';
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

const HolaTu = props => {
  const CHARACTER_LIMIT = 1000;
  const classes = useStyles();
  const theme = useTheme();
  const [internationalCode, setInternationalCodeValue] = useState('52');
  const [submitted, setFormSubmitted] = useState('initial');
  const { t } = useTranslation('textMessagesAppTranslations');

  const { form, handleChange, handleChangeAutocomplete, resetForm } = useForm({
    country_international_code: internationalCode,
    sms_content: '',
    sms_number: ''
  });

  const isFormValid = () => {
    const phoneRegex = /[0-9]{7,11}/;
    return (
      form.sms_content.length > 0 &&
      internationalCode.length > 0 &&
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
      sms_notification: {
        sms_number: `+${form.country_international_code}${form.sms_number}`,
        sms_content: form.sms_content
      }
    };
    props.onShowLoadingSpinner();
    props.onHttpRequestStarts();
    props.onCreateTextMessage(smsTextMessageData);
    ev.preventDefault();
  };

  const smsContentValidationAndCharacterCounter = fieldName => {
    return `${form.sms_content.length}/${CHARACTER_LIMIT}`;
  };

  if (props.isLoadingSpinnerVisible) return <FuseLoading />;

  if (
    props.httpRequestResponseDetails.status !== undefined &&
    submitted !== props.httpRequestResponseDetails.status
  ) {
    resetForm();
    setFormSubmitted(props.httpRequestResponseDetails.status);
  }

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
              to="/auth/register"
              color="inherit"
            >
              <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
              <span className="mx-4">
                {t('REGISTER_AN_ACCOUNT')}
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
    onCreateTextMessage: formData => {
      return dispatch(createTextMessageFromPublic(formData));
    },
    onShowLoadingSpinner: () => dispatch(showLoadingSpinner()),
    onHttpRequestStarts: () => dispatch(httpRequestStarts())
  };
};

const mapStateToProps = state => {
  return {
    isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible,
    httpRequestResponseDetails: state.fuse.site.http_request_response_details,
    validationErrors: state.utilsReducers.validationErrors,
    userData: state.auth.user.data
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HolaTu);

