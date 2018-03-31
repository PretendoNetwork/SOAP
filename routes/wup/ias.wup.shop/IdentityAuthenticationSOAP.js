const routes = require('express').Router();
const IdentityAuthenticationSOAP = require('../../../SOAP/services/IdentityAuthenticationSOAP');
const debug = require('../../../debugger');
const route_debugger = new debug('IdentityAuthenticationSOAP');

route_debugger.success('Loading \'IdentityAuthenticationSOAP\'');
/**
 * [POST]
 * Replacement for: https://nus.wup.shop.nintendo.net/nus/services/IdentityAuthenticationSOAP
 * Description: Console related SOAP requests?
 */
routes.post('/', (request, response) => {
	response.set('Server', 'Apache/2.2.19');
	response.set('Keep-Alive', 'timeout=45, max=300');
	response.set('Connection', 'Keep-Alive');
	response.set('Transfer-Encoding', 'chunked');
	response.set('Content-Type', 'text/xml');

	const SOAP = new IdentityAuthenticationSOAP(request.xml);
	const action = request.headers.soapaction.split('/').pop();

	switch (action) {
		case 'SetIVSData':
			response.send(SOAP.SetIVSData());
			break;
		default:
			break;
	}
});

module.exports = routes;