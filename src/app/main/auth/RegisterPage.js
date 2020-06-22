import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { submitRegister } from 'app/auth/store/actions/register.actions';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import CountryAutocompleteSelect from 'app/common/CountryAutocompleteSelect';
import ButtonSubmitWithLoaderSpinner from 'app/common/ButtonSubmitWithLoaderSpinner';

const useStyles = makeStyles(theme => ({
  root: {
    background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.primary.contrastText
  }
}));

const RegisterPage = props => {
  const classes = useStyles();

  const { form, handleChange, handleChangeAutocomplete } = useForm({
    country_international_code: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    acceptTermsConditions: false
  });

  const isFormValid = () => {
    return (
      form.email.length > 0 &&
      form.password.length > 0 &&
      form.password.length > 3 &&
      form.mobile_number.length > 3 &&
      form.country_international_code.length > 0 &&
      form.password === form.passwordConfirm &&
      form.acceptTermsConditions
    );
  };

  const disableCheckerFn = () => {
    return !isFormValid() || props.isLoadingSpinnerVisible;
  };

  const onAutocompleteChange = (event, values) => {
    if (values && values.phone) {
      handleChangeAutocomplete('country_international_code', values.phone);
    }
  };

  const handleSubmit = ev => {
    const userData = {
      user: form
    };
    props.onSubmitRegister(userData);
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

              <Typography variant="h6" className="mt-16 mb-32">
                Crear nueva cuenta
              </Typography>

              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit}
              >
                <TextField
                  className="mb-16"
                  label="Nombre Completo"
                  autoFocus
                  type="name"
                  name="name"
                  value={form.name}
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
                  Utilizaremos este número para confirmación
                  <br />
                  <strong>Por favor incluye el código de área local</strong>
                </Typography>

                <TextField
                  className="mb-16"
                  label="Numero de Celular(solo números)"
                  type="mobile_number"
                  name="mobile_number"
                  value={form.mobile_number}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <TextField
                  className="mb-16"
                  label="Correo"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <TextField
                  className="mb-16"
                  label="Contraseña"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <TextField
                  className="mb-16"
                  label="Contraseña (Confirmación)"
                  type="password"
                  name="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <FormControl className="items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptTermsConditions"
                        checked={form.acceptTermsConditions}
                        onChange={handleChange}
                      />
                    }
                    label="He leído y acepto los términos y condiciones"
                  />
                </FormControl>

                <ButtonSubmitWithLoaderSpinner buttonLabel="Registrar cuenta" disableCheckerFn={disableCheckerFn} />
              </form>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">Ya tienes una cuenta?</span>
                <Link className="font-medium" to="/auth/login">
                  Iniciar sesión
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitRegister: userData => dispatch(submitRegister(userData)),
    onShowLoadingSpinner: () => dispatch(showLoadingSpinner())
  };
};

const mapStateToProps = state => {
  return {
    isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
