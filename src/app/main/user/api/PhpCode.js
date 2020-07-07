import FuseHighlight from '@fuse/core/FuseHighlight';
import React from 'react';
import { useSelector } from 'react-redux';

const PhpCode = () => {
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div>
      <p>Php Example</p>
      <FuseHighlight component="pre" className="language-php my-16">
        {`
$fields = array(
    "sms_content" => "smsparatodos.com es increíble",
    "sms_number" => "+523121231517",
    "sms_type" => "standard_delivery",
    "sms_customer_reference_id" => "123456789",
    "mobile_hub_id" => "6d5be464-xxxx-xxxx-xxxx-90c7242c70d7",
);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.smsparatodos.com/v2/sms/create",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($fields),
  CURLOPT_HTTPHEADER => array(
    "Authorization-Token: Bearer ${authorizationToken}",
    "Authorization-Client: ${authorizationClient}",
    "cache-control: no-cache",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}

				`}
      </FuseHighlight>
    </div>
  );
};

export default PhpCode;
