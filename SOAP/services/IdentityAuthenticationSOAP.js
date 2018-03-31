const SOAP = require('../SOAP');

class IdentityAuthenticationSOAP extends SOAP {
	constructor(string) {
		super(string);
	}
}

module.exports = IdentityAuthenticationSOAP;