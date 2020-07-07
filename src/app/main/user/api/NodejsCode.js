import FuseHighlight from '@fuse/core/FuseHighlight';
import React from 'react';
import { useSelector } from 'react-redux';

const NodejsCode = () => {
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div>
      <p>Using Axios</p>
      <FuseHighlight component="pre" className="language-javascript my-16">
        {`
// Using https://unpkg.com/axios/dist/axios.min.js
// https://www.npmjs.com/package/axios

axios
  .post(
    "https://api.smsparatodos.com/v2/sms/create",
    {
      sms_content: "smsparatodos.com es increíble",
      sms_number: "+523121231517",
      sms_type: "standard_delivery",
      sms_customer_reference_id: "123456789",
      mobile_hub_id: "6d5be464-xxxx-xxxx-xxxx-90c7242c70d7"
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization-Token": "Bearer ${authorizationToken}",
        "Authorization-Client": "${authorizationClient}"
      }
    }
  )
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
				`}
      </FuseHighlight>
    </div>
  );
};

export default NodejsCode;
