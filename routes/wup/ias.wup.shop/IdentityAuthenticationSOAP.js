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
routes.all('/', (request, response) => {
	response.set('Content-Type', 'text/xml;charset=utf-8');
	response.set('Transfer-Encoding', 'chunked');

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