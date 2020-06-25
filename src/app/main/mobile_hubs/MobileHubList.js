import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';
import FuseLoading from '@fuse/core/FuseLoading';
import { getSmsMobileHubCollection } from './mobile_hubs.actions';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'white',
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  board: {
    cursor: 'pointer',
    boxShadow: theme.shadows[0],
    transitionProperty: 'box-shadow border-color',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    background: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    '&:hover': {
      boxShadow: theme.shadows[6]
    }
  },
  newBoard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
    '&:hover': {
      borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
    }
  }
}));

const MobileHubList = props => {
  const dispatch = useDispatch();
  const boards = [];
  const mobileHubCollection = useSelector(({ mobileHubs }) => mobileHubs.mobileHubCollection);

  const classes = useStyles(props);

  useEffect(() => {
    dispatch(showLoadingSpinner());
    dispatch(getSmsMobileHubCollection());
  }, [dispatch]);

  if (props.isLoadingSpinnerVisible) return <FuseLoading />;

  return (
    <div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
      <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
        <FuseAnimate>
          <Typography className="mt-12 sm:mt-12 sm:py-24 text-32 sm:text-40 font-300" color="inherit">
            Mis servidores móviles de SMS
          </Typography>
        </FuseAnimate>

        <div>
          <FuseAnimateGroup
            className="flex flex-wrap w-full justify-center py-32 px-16"
            enter={{
              animation: 'transition.slideUpBigIn',
              duration: 300
            }}
          >
            {mobileHubCollection.map(board => (
              <div className="w-224 h-224 p-16" key={board.id}>
                <Link
                  to={`/mobile-hubs/${board.attributes.uuid}/details`}
                  className={clsx(
                    classes.board,
                    'flex flex-col items-center justify-center w-full h-full rounded py-24'
                  )}
                  role="button"
                >
                  <Icon className="text-56">phone_android</Icon>
                  <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
                    {board.attributes.device_name}
                  </Typography>
                  <Typography className="text-12 font-300 text-center pt-16 px-32" color="inherit">
                    {`+${board.attributes.country_international_code} ${board.attributes.device_number}`}
                  </Typography>
                </Link>
              </div>
            ))}
            <div className="w-224 h-224 p-16">
              <Link
                to={`/mobile-hubs/new`}
                className={clsx(
                  classes.board,
                  'flex flex-col items-center justify-center w-full h-full rounded py-24'
                )}
                role="button"
              >
                <Icon className="text-56">add_circle</Icon>
                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
                  Dar de alta nuevo dispositivo
                </Typography>
              </Link>
            </div>
          </FuseAnimateGroup>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileHubList);
