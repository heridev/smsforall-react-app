import FuseHighlight from '@fuse/core/FuseHighlight';
import React from 'react';
import { useSelector } from 'react-redux';

const CNetCode = () => {
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div>
      <FuseHighlight component="pre" className="language-javascript my-16">
        {`
var client = new RestClient("https://api.smsparatodos.com/v2/sms/create");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json; charset=utf-8");
request.AddHeader("Authorization-Token", "Bearer ${authorizationToken}");
request.AddHeader("Authorization-Client", "${authorizationClient}");
request.AddParameter("sms_content", "smsparatodos.com es increíble");
request.AddParameter("sms_number", "+523121231517");
request.AddParameter("sms_type", "standard_delivery");
request.AddParameter("sms_customer_reference_id", "123456789");
request.AddParameter("mobile_hub_id", "6d5be464-xxxx-xxxx-xxxx-90c7242c70d7");
IRestResponse response = client.Execute(request);
				`}
      </FuseHighlight>
    </div>
  );
};

export default CNetCode;
