import Typography from '@material-ui/core/Typography';
import FuseHighlight from '@fuse/core/FuseHighlight';
import React from 'react';
import { useSelector } from 'react-redux';

const RubyCode = () => {
  const userData = useSelector(({ auth }) => auth.user.data);
  const authorizationToken = userData.api_authorization_token;
  const authorizationClient = userData.api_authorization_client;

  return (
    <div>
      <p>You can create a new service class called</p>
      <FuseHighlight component="pre" className="language-python my-16">
        {`
					http_requester_service.rb
				`}
      </FuseHighlight>
      <p>with the following content</p>
      <Typography className="my-16" component="div">
        <ol>
          <li className="mb-16">
            <FuseHighlight component="pre" className="language-ruby my-16">
              {`
require 'uri'
require 'net/http'
require 'json'

class HttpRequesterService
  class << self
    def make(url, method, headers = {}, data = {})
      uri          = URI.parse(url)
      http         = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request      = Net::HTTP.const_get(method).new(uri.request_uri)
      request.body = data.to_json if method == 'Post'

      # enable/disable according to your needs
      # http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      set_headers request, headers
      http.request request
    end

    private
    def set_headers(request, headers = {})
      headers.each { |key, value| request[key] = value }
    end
  end
end
							`}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            <b>Prepare your data:</b>
            <FuseHighlight component="pre" className="language-ruby my-16">
              {`
body = {
  'sms_number': '+523121231517',
  'sms_content': 'smsparatodos.com es increíble',
  'sms_customer_reference_id': '123456789',
  'mobile_hub_id': '6d5be464-xxxx-xxxx-xxxx-90c7242c70d7',
  'sms_type': 'standard_delivery'
}

headers = {
  'Authorization-Token': 'Bearer ${authorizationToken}',
  'Authorization-Client': '${authorizationClient}',
  'Content-Type': 'application/json'
}
							`}
            </FuseHighlight>
          </li>
          <li className="mb-16">
            <b>It is time to make the request</b>
            <FuseHighlight component="pre" className="language-ruby my-16">
              {`
								 response = HttpRequesterService.make("https://api.smsparatodos.com/v2/sms/create", 'Post', headers, body)
								 puts response.read_body
							`}
            </FuseHighlight>
          </li>
        </ol>
      </Typography>
    </div>
  );
};

export default RubyCode;
