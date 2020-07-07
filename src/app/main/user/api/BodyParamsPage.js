import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BodyParamsTable from './BodyParamsTable';

const useStyles = makeStyles({
  root: {
    padding: 24
  }
});

const BodyParamsPage = () => {
  const classes = useStyles();
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div className={classes.root}>
      <h1 className="py-16">Body params</h1>
      <Typography className="my-16" component="div">
        <ol>
          <li className="mb-16">
            <h3>POST request to</h3>
            <br />

            <FuseHighlight component="pre" className="language-javascript my-16">
              {`
              https://api.smsparatodos.com/v2/sms/create
              `}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            <h3>Headers</h3>
            <br />

            <FuseHighlight component="pre" className="language-javascript my-16">
              {`
              Authorization-Token: '${authorizationToken}'
              Authorization-Client:i '${authorizationClient}'
              `}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            <h3>Body example</h3>
            <br />

            <FuseHighlight component="pre" className="language-javascript my-16">
              {`
{
  mobile_hub_id: 'xxxxx-xxxxxx-xxxxxx-xxxxxx',
  sms_number: '+523121231517',
  sms_type: 'standard_delivery', # o urgent_delivery
  sms_content: 'smsparatodos.com es increíble',
  sms_customer_reference_id: 'xxxxx'
}
              `}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            <h3>Body fields definition</h3>
            <br />
            <BodyParamsTable />
          </li>

          <li className="mb-16">
            <h3>If you want to see how a response look like</h3>
            <p>
              <Link to="/user/api/success_requests">Successful request</Link>
            </p>
            <p>
              <Link to="/user/api/failed_requests">Failed request</Link>
            </p>
          </li>
        </ol>
      </Typography>
    </div>
  );
};

export default React.memo(BodyParamsPage);
