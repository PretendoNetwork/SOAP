const SOAP = require('../SOAP');
const json2xml = require('json2xml');

class ECommerceSOAP extends SOAP {
	constructor(string) {
		super(string);
	}

	GetAccountStatus() {
		return json2xml({
			tag_attributes: {
				'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
				'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
				'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
			},
			'soapenv:Envelope': {
				'soapenv:Body': {
					tag_attributes: {
						xmlns: 'urn:nus.wsapi.broadon.com'
					},
					GetAccountStatusResponse: {
						Version: this.version,
						DeviceId: this.device_id,
						MessageId: this.message_id,
						TimeStamp: Date.now(),
						ErrorCode: 0,
						ServiceStandbyMode: false,
						AccountStatus: 'R', // R = Retail maybe?
					}
				}
			}
		}, {
			attributes_key: 'tag_attributes'
		});
	}
}

module.exports = ECommerceSOAP;