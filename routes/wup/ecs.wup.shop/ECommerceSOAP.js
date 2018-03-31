const routes = require('express').Router();
const ECommerceSOAP = require('../../../SOAP/services/ECommerceSOAP');
const debug = require('../../../debugger');
const route_debugger = new debug('ECommerceSOAP');

route_debugger.success('Loading \'ECommerceSOAP\'');
/**
 * [POST]
 * Replacement for: https://nus.wup.shop.nintendo.net/nus/services/ECommerceSOAP
 * Description: Console related SOAP requests?
 */
routes.all('/', (request, response) => {
	response.set('Content-Type', 'text/xml;charset=utf-8');
	response.set('Transfer-Encoding', 'chunked');

	const SOAP = new ECommerceSOAP(request.xml);
	const action = request.headers.soapaction.split('/').pop();

	switch (action) {
		case 'AccountListETicketIds':
			response.send(SOAP.AccountListETicketIds());
			break;
		case 'GetAccountStatus':
			response.send(SOAP.GetAccountStatus());
			break;
		default:
			break;
	}
});

module.exports = routes;