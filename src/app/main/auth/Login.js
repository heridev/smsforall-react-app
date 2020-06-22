import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { submitLogin } from 'app/auth/store/actions/login.actions';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import ButtonSubmitWithLoaderSpinner from 'app/common/ButtonSubmitWithLoaderSpinner';

const useStyles = makeStyles(theme => ({
  root: {
    background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.primary.contrastText
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '40%',
    left: '35%'
  },
}));

const LoginPage = props => {
  // const dispatch = useDispatch();
  const classes = useStyles();

  const { form, handleChange } = useForm({
    email: '',
    password: '',
    remember: true
  });

  const isFormValid = () => {
    return form.email.length > 0 && form.password.length > 0;
  };

  const disableCheckerFn = () => {
    return !isFormValid() || props.isLoadingSpinnerVisible;
  };

  const handleSubmit = ev => {
    // dispatch(authActions.submitLogin(form));
    props.onSubmitLogin(form);
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
                Iniciar sesión
              </Typography>

              <form name="loginForm" noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
                <TextField
                  className="mb-16"
                  label="Email"
                  autoFocus
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
                  label="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <div className="flex items-center justify-between">
                  <Link className="font-medium" to="/auth/forgot-password">
                    Olvidaste tu contraseña?
                  </Link>
                </div>

                <ButtonSubmitWithLoaderSpinner disableCheckerFn={disableCheckerFn} />

              </form>

              <div className="my-24 flex items-center justify-center">
                <Divider className="w-32" />
                <span className="mx-8 font-bold">O</span>
                <Divider className="w-32" />
              </div>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">No tienes cuenta?</span>
                <Link className="font-medium" to="/auth/register">
                  Crear una cuenta
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
    onSubmitLogin: formData => dispatch(submitLogin(formData)),
    onShowLoadingSpinner: () => dispatch(showLoadingSpinner())
  };
};

const mapStateToProps = state => {
  return {
    isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
