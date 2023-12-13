import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import ButtonSubmitWithLoaderSpinner from 'app/common/ButtonSubmitWithLoaderSpinner';
import { confirmPinNumber } from './confirmation_account.actions';

const useStyles = makeStyles(theme => ({
  root: {
    background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.primary.contrastText
  }
}));

const ConfirmPinNumberPage = props => {
  const classes = useStyles();

  const { form, handleChange } = useForm({
    user_pin_number: ''
  });

  const isFormValid = () => {
    return form.user_pin_number.length > 0 && form.user_pin_number.length > 3;
  };

  const disableCheckerFn = () => {
    return !isFormValid() || props.isLoadingSpinnerVisible;
  };

  const handleSubmit = ev => {
    props.onConfirmPinNumber(form);
    props.onShowLoadingSpinner();
    ev.preventDefault();
  };

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img className="w-128 m-32" src="assets/images/logos/1x/smsparatodos.png" alt="logo smsparatodos" />

              <Typography variant="h6" className="mt-16">
                Confirmation token
              </Typography>

              <Typography variant="p" className="mt-10 mb-20">
                We sent an activation token to your phone {props.userData.find_international_number}, if you don't receive
                that SMS with the token in more than 5 minutes, please reach out to us via email to hi@smsforall.or
                or using the contact information at https://smsforall.org/about-sms-for-all/#contact-form
                <Link className="font-medium" to="https://smsforall.org/about-sms-for-all/#contact-formm">
                  {' '}
                  https://smsforall.org/about-sms-for-all/#contact-formm
                </Link>
              </Typography>

              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit}
              >
                <TextField
                  className="mb-16"
                  label="Ingresa el pin de 6 dígitos"
                  type="text"
                  name="user_pin_number"
                  value={form.user_pin_number}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <ButtonSubmitWithLoaderSpinner buttonLabel="Confirm token" disableCheckerFn={disableCheckerFn} />
              </form>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onConfirmPinNumber: userData => dispatch(confirmPinNumber(userData)),
    onShowLoadingSpinner: () => dispatch(showLoadingSpinner())
  };
};

const mapStateToProps = state => {
  return {
    userData: state.auth.user.data,
    isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPinNumberPage);
