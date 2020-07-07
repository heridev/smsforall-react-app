import FuseHighlight from '@fuse/core/FuseHighlight';
import React from 'react';
import { useSelector } from 'react-redux';

const CurlCode = () => {
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div>
      <FuseHighlight component="pre" className="language-shell my-16">
        {`
curl -X POST \\
  https://api.smsparatodos.com/v2/sms/create \\
  -H "Content-Type: application/json" \\
  -H 'Authorization-Token: Bearer ${authorizationToken}' \\
  -H 'Authorization-Client: ${authorizationClient}' \\
  -d '{"sms_number":"+523121231517","sms_content":"smsparatodos.com es increíble","sms_type":"standard_delivery","sms_customer_reference_id":"123456789","mobile_hub_id":"6d5be464-xxxx-xxxx-xxxx-90c7242c70d7"}'
				`}
      </FuseHighlight>
    </div>
  );
};

export default CurlCode;
