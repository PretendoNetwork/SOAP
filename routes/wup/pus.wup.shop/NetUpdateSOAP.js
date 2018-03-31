const routes = require('express').Router();
const json2xml = require('json2xml');
const NetUpdateSOAP = require('../../../SOAP/services/NetUpdateSOAP');
const debug = require('../../../debugger');
const route_debugger = new debug('NetUpdateSOAP');

route_debugger.success('Loading \'NetUpdateSOAP\'');
/**
 * [POST]
 * Replacement for: https://nus.wup.shop.nintendo.net/nus/services/NetUpdateSOAP
 * Description: Console related SOAP requests?
 */
routes.all('/', (request, response) => {
	response.set('Server', 'Apache/2.2.19');
	response.set('Keep-Alive', 'timeout=45, max=300');
	response.set('Connection', 'Keep-Alive');
	response.set('Transfer-Encoding', 'chunked');
	response.set('Content-Type', 'text/xml');

	const SOAP = new NetUpdateSOAP(request.xml);
	const action = request.headers.soapaction.split('/').pop();

	switch (action) {
		case 'GetSystemTitleHash':
			response.send(SOAP.GetSystemTitleHash());
			break;
		case 'GetSystemUpdate':
			response.send(SOAP.GetSystemUpdate());
			break;
		default:
			break;
	}
});

module.exports = routes;