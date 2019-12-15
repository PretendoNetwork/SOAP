// ECommerceSOAP

const router = require('express').Router();
const xmlbuilder = require('xmlbuilder');

router.post('/', (request, response) => {
	const action = request.headers.soapaction.split('/').pop();
	const { body: requestBody } = request;
	const body = requestBody.get('SOAP-ENV:Envelope').get('SOAP-ENV:Body');

	console.log(body);
	console.log('[CTR - ECS]', action);

	response.set('Content-Type', 'text/xml');

	let actionResponse;
	let data;

	switch (action) {
		case 'GetAccountStatus':
			data = body.get('ecs:GetAccountStatus');

			actionResponse = {
				'soapenv:Envelope': {
					'@xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
					'@xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
					'@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			
					'soapenv:Body': {
						GetAccountStatusResponse: {
							'@xmlns': 'urn:ecs.wsapi.broadon.com',
			
							Version: '2.0',
							DeviceId: data.get('ecs:DeviceId'),
							MessageId: `EC-${data.get('ecs:DeviceId')}-3038380129`,
							TimeStamp: Date.now(),
							ErrorCode: '0',
							ServiceStandbyMode: 'false',
							AccountId: data.get('ecs:AccountId'),
							//AccountId: '437151119', // triggers IAS request with action SetIVSData
							AccountStatus: 'R', // R = registered, U = unregistered (?)
							Balance: {
								Amount: '999',
								Currency: 'USD'
							},
							EulaVersion: '0',
							Country: 'US',
							Region: 'USA',
							AccountAttributes: {
								Name: 'LOYALTY_LOGIN_NAME',
								Value: ''
							},
							TIV: [], // List of ticket IDs here
							ServiceURLs: [
								{
									Name: 'ContentPrefixURL',
									URI: 'http://ccs.cdn.c.shop.nintendowifi.net/ccs/download'
								},
								{
									Name: 'UncachedContentPrefixURL',
									URI: 'https://ccs.c.shop.nintendowifi.net/ccs/download'
								},
								{
									Name: 'SystemContentPrefixURL',
									URI: 'http://nus.cdn.c.shop.nintendowifi.net/ccs/download'
								},
								{
									Name: 'SystemUncachedContentPrefixURL',
									URI: 'https://ccs.c.shop.nintendowifi.net/ccs/download'
								},
								{
									Name: 'EcsURL',
									URI: 'https://ecs.c.shop.nintendowifi.net/ecs/services/ECommerceSOAP'
								},
								{
									Name: 'IasURL',
									URI: 'https://ias.c.shop.nintendowifi.net/ias/services/IdentityAuthenticationSOAP'
								},
								{
									Name: 'CasURL',
									URI: 'https://cas.c.shop.nintendowifi.net/cas/services/CatalogingSOAP'
								},
								{
									Name: 'NusURL',
									URI: 'https://nus.c.shop.nintendowifi.net/nus/services/NetUpdateSOAP'
								}
							],
							IVSSyncFlag: 'false', // setting this to true will trigger an IAS request with action ReportIVSSync, but sends no data
							CountryAttribits: 15
						}
					}
				}
			};
			break;

		case 'AccountListETicketIds':
			data = body.get('ecs:AccountListETicketIds');

			actionResponse = {
				'soapenv:Envelope': {
					'@xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
					'@xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
					'@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			
					'soapenv:Body': {
						AccountListETicketIdsResponse: {
							'@xmlns': 'urn:ecs.wsapi.broadon.com',
			
							Version: '2.0',
							DeviceId: data.get('ecs:DeviceId'),
							MessageId: `EC-${data.get('ecs:DeviceId')}-3038380129`,
							TimeStamp: Date.now(),
							ErrorCode: '0',
							ServiceStandbyMode: 'false',
							TIV: [] // List of ticket IDs here
						}
					}
				}
			};
			break;
		default:
			break;
	}

	if (actionResponse) {
		response.send(xmlbuilder.create(actionResponse).end());
	} else {
		response.status(404);
	}
});

module.exports = router;