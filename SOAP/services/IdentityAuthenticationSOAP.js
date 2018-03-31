const SOAP = require('../SOAP');
const json2xml = require('json2xml');

class IdentityAuthenticationSOAP extends SOAP {
	constructor(string) {
		super(string);
	}

	SetIVSData() {
		// I have no idea how to work with this on right now
		// The value is base64, and is always the same
		// For me it is always `RLYiHamaD+wFtYDf3bakWw==`
		// For now, ignore data and always respond the same

		return '<?xml version="1.0" encoding="utf-8"?>' + json2xml({
			tag_attributes: {
				'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
				'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
				'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
			},
			'soapenv:Envelope': {
				'soapenv:Body': {
					tag_attributes: {
						xmlns: 'urn:ias.wsapi.broadon.com'
					},
					SetIVSDataResponse: {
						Version: this.version,
						DeviceId: this.device_id.toString(),
						MessageId: this.message_id,
						TimeStamp: Date.now(),
						ErrorCode: 0,
						ServiceStandbyMode: false
					}
				}
			}
		}, {
			attributes_key: 'tag_attributes'
		}).trim();
	}
}

module.exports = IdentityAuthenticationSOAP;