import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    padding: 24
  }
});

const SuccessCodes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className="py-16">Success Codes</h1>
      <p>
				How a Successful request looks like
      </p>
      <Typography className="my-16" component="div">
        <ol>
          <li className="mb-16">
            Status code
            <FuseHighlight component="pre" className="language-bash my-16">
              {`
                 200
							`}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            Response body
            <FuseHighlight component="pre" className="language-bash my-16">
              {`
{
  "sms_customer_reference_id": "99999",
  "sms_content": "esta es una prueba",
  "mobile_hub_id": "6d5be464-xxxx-xxxx-xxxx-x0c7242c70d7",
  "api_version": "V2",
  "date_created": "2020-07-07T20:14:02Z",
  "status": "enqueued",
  "error_message": null,
  "sms_number": "+523121231517"
}
							`}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            The possibles values you can get from a successful request in the field
            <FuseHighlight component="pre" className="language-bash my-16">
              {`
                 status
							`}
            </FuseHighlight>
            <b>Are</b>
            <FuseHighlight component="pre" className="language-yml my-16">
              {`
                - queued
                - sending
                - sent
                - delivered
                - receiving
                - received
							`}
            </FuseHighlight>
          </li>
        </ol>
      </Typography>
    </div>
  );
};

export default React.memo(SuccessCodes);
