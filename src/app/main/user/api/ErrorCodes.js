import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    padding: 24
  }
});

const ErrorCodes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className="py-16">Error Codes</h1>
      <p>
        How a failed request looks like
      </p>
      <Typography className="my-16" component="div">
        <ol>
          <li className="mb-16">
            Status code
            <FuseHighlight component="pre" className="language-bash my-16">
              {`
              422
							`}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            The <b>"status"</b> field will include one of the following values:
            <FuseHighlight component="pre" className="language-bash my-16">
              {`
              - failed
              - undelivered
							`}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            And the field
            <FuseHighlight component="pre" className="language-bash my-16">
              {`
              error_message
							`}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            Will include one of the following responses:
            <FuseHighlight component="pre" className="language-bash my-16">
              {`
              - There are some validation errors: xxx
              - The number of requests per minute was reached, please try again the next minute
              - The number of requests per day was reached, please try again the next day
              - You account has been suspended, please contact our support team
              - Your account has been blocked, please contact our support team
							`}
            </FuseHighlight>
          </li>
        </ol>
      </Typography>
    </div>
  );
};

export default React.memo(ErrorCodes);
