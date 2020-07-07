import FuseHighlight from '@fuse/core/FuseHighlight';
import React from 'react';
import { useSelector } from 'react-redux';

const JavaCode = () => {
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div>
      <FuseHighlight component="pre" className="language-javascript my-16">
        {`
Map<String, String> headers = new HashMap<>();
headers.post("Content-Type", "application/json; charset=utf-8");
headers.post("Authorization-Token", "Bearer ${authorizationToken}");
headers.post("Authorization-Client", "${authorizationClient}");

Map<String, Object> fields = new HashMap<>();
fields.post("sms_content", "smsparatodos.com es increíble");
fields.post("sms_number", "+523121231517");
fields.post("sms_type", "standard_delivery");
fields.post("sms_customer_reference_id", "123456789");
fields.post("mobile_hub_id", "6d5be464-xxxx-xxxx-xxxx-90c7242c70d7");

HttpResponse<JsonNode> jsonResponse
  = Unirest.post("https://api.smsparatodos.com/v2/sms/create")
  .headers(headers).fields(fields)
  .asJson();
				`}
      </FuseHighlight>
    </div>
  );
};

export default JavaCode;
