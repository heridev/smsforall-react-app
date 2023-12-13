import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
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

const ButtonSubmitWithLoaderSpinner = props => {
  const classes = useStyles();
  const defaultColor = props.buttonColor || 'primary';
  const defaultClassName = props.className || 'w-224 mx-auto mt-16';
  const defaultVariant = props.variantName || 'contained';
  const defaultButtonType = props.buttonType || 'submit';
  const defaultButtonLabel = props.buttonLabel || 'Log in';
  const defaultDisableFn = () => {
    return (props.disableCheckerFn && props.disableCheckerFn()) || false;
  };

  return (
    <div className={classes.wrapper}>
      <Button
        variant={defaultVariant}
        color={defaultColor}
        className={defaultClassName}
        aria-label={defaultButtonLabel}
        disabled={defaultDisableFn()}
        type={defaultButtonType}
      >
        {defaultButtonLabel}
      </Button>

      {props.isLoadingSpinnerVisible && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSubmitWithLoaderSpinner);
