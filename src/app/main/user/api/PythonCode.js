import FuseHighlight from '@fuse/core/FuseHighlight';
import React from 'react';
import { useSelector } from 'react-redux';

const PythonCode = () => {
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div>
      <p>In order to run this example you need to install the requests dependency, just in the case you haven't installed it yet</p>
      <FuseHighlight component="pre" className="language-bash my-16">
        {`
          pip install requests
        `}
      </FuseHighlight>
      <p>Start a new interactive python console</p>
      <FuseHighlight component="pre" className="language-bash my-16">
        {`
          python
        `}
      </FuseHighlight>
      <p>Code example</p>
      <FuseHighlight component="pre" className="language-python my-16">
        {`
import requests

url = "https://api.smsparatodos.com/v2/sms/create"

payload = {
  'sms_number': '+523121231517',
  'sms_content': 'smsparatodos.com es increíble',
  'sms_customer_reference_id': '123456789',
  'mobile_hub_id': '6d5be464-xxxx-xxxx-xxxx-90c7242c70d7',
  'sms_type': 'standard_delivery'
}

headers = {
  'Authorization-Token': 'Bearer ${authorizationToken}',
  'Authorization-Client': '${authorizationClient}'
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)
				`}
      </FuseHighlight>
    </div>
  );
};

export default PythonCode;
