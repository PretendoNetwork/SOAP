const SOAP = require('../SOAP');
const json2xml = require('json2xml');

class ECommerceSOAP extends SOAP {
	constructor(string) {
		super(string);
	}

	GetAccountStatus() {

		// This request seems to send a scope in the form of the `ServiceLevel` tag
		// The eShop sends with `ServiceLevel` set to "SHOP"
		// Seems to return different values based on scope

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

	AccountListETicketIds() {
		// I have no idea how to work with this on right now
		// Returns a list of `TIV` fields, which seem to be the IV's of the tickets
		// They are always the same for each request, and is in float values
	}
}

module.exports = ECommerceSOAP;