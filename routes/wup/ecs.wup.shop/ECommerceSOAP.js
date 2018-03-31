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
routes.post('/', (request, response) => {
	response.set('Server', 'Apache/2.2.19');
	response.set('Keep-Alive', 'timeout=45, max=300');
	response.set('Connection', 'Keep-Alive');
	response.set('Transfer-Encoding', 'chunked');
	response.set('Content-Type', 'text/xml');

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