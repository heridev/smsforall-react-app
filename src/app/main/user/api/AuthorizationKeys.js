import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    padding: 24
  }
});

const AuthorizationKeys = () => {
  const classes = useStyles();
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div className={classes.root}>
      <h1 className="py-16">Your authorization Keys</h1>
      <p>
        <b>smsparatodos.com</b> expects two authorization keys to be included as a headers in all API requests to the server
      </p>
      <Typography className="my-16" component="div">
        <ol>
          <li className="mb-16">
            HEADERS
            <FuseHighlight component="pre" className="language-bash my-16">
              {`
                Authorization-Token: ${authorizationToken}
                Authorization-Client: ${authorizationClient}
							`}
            </FuseHighlight>
            <b>NOTE:</b> Remember to keep these credentials in a safe place :)
          </li>
        </ol>
      </Typography>
    </div>
  );
};

export default React.memo(AuthorizationKeys);
