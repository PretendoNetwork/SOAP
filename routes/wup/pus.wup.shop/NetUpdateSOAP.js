const routes = require('express').Router();
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
	response.set('Content-Type', 'text/xml;charset=utf-8');

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