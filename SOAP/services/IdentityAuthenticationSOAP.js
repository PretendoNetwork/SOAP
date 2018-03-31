const SOAP = require('../SOAP');

class IdentityAuthenticationSOAP extends SOAP {
	constructor(string) {
		super(string);
	}

	SetIVSData() {
		// I have no idea how to work with this on right now
		// The value is base64, and is always the same
		// For me it is always `RLYiHamaD+wFtYDf3bakWw==`
	}
}

module.exports = IdentityAuthenticationSOAP;