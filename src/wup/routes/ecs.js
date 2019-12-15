// ECommerceSOAP

const router = require('express').Router();
const fs = require('fs-extra');
const xmlbuilder = require('xmlbuilder');
const logger = require('../../logger');

router.post('/', (request, response) => {
	const action = request.headers.soapaction.split('/').pop();
	const { body: requestBody } = request;
	const body = requestBody.get('SOAP-ENV:Envelope').get('SOAP-ENV:Body');

	console.log(body);
	console.log('[WUP - ECS]', action);

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
							TIV: [],
							ServiceURLs: [
								{
									Name: 'ContentPrefixURL',
									URI: 'http://ccs.cdn.wup.shop.nintendo.net/ccs/download'
								},
								{
									Name: 'UncachedContentPrefixURL',
									URI: 'https://ccs.wup.shop.nintendo.net/ccs/download'
								},
								{
									Name: 'SystemContentPrefixURL',
									URI: 'http://nus.cdn.wup.shop.nintendo.net/ccs/download'
								},
								{
									Name: 'SystemUncachedContentPrefixURL',
									URI: 'https://ccs.wup.shop.nintendo.net/ccs/download'
								},
								{
									Name: 'EcsURL',
									URI: 'https://ecs.wup.shop.nintendo.net/ecs/services/ECommerceSOAP'
								},
								{
									Name: 'IasURL',
									URI: 'https://ias.wup.shop.nintendo.net/ias/services/IdentityAuthenticationSOAP'
								},
								{
									Name: 'CasURL',
									URI: 'https://cas.wup.shop.nintendo.net/cas/services/CatalogingSOAP'
								},
								{
									Name: 'NusURL',
									URI: 'https://nus.wup.shop.nintendo.net/nus/services/NetUpdateSOAP'
								}
							],
							IVSSyncFlag: 'false',
							CountryAttribits: 12
						}
					}
				}
			};
			break;

		case 'AccountGetETickets':
			data = body.get('ecs:AccountGetETickets');
			const ticketId = data.get('ecs:TicketId')[0]; // THERE CAN BE MULTIPLE TICKET IDS. NEED TO SUPPORT LOOPING OVER THEM ALL

			let ticket;
			// TODO: Make this a database or something
			switch (ticketId) {
				case '1633213454495676':
					ticket = fs.readFileSync(__dirname + '/../../../titles/wup/title/0005000010102172/title.tik').toString('base64');
					break;
				case '1504125632659492':
					ticket = fs.readFileSync(__dirname + '/../../../titles/wup/title/00050000101999ff/title.tik').toString('base64');
					break;
				default:
					break;
			}

			actionResponse = {
				'soapenv:Envelope': {
					'@xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
					'@xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
					'@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			
					'soapenv:Body': {
						AccountGetETicketsResponse: {
							'@xmlns': 'urn:ecs.wsapi.broadon.com',

							Version: '2.0',
							DeviceId: data.get('ecs:DeviceId'),
							MessageId: `EC-${data.get('ecs:DeviceId')}-3038380129`,
							TimeStamp: Date.now(),
							ErrorCode: '0',
							ServiceStandbyMode: 'false',
							ETickets: [ ticket ],
							Certs: [
								'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'
							]
						}
					}
				}
			};
			break;
	
		default:
			logger.warn('[WUP - ECS] Unhandled SOAP action ' + action);
			break;
	}

	if (actionResponse) {
		response.send(xmlbuilder.create(actionResponse).end());
	} else {
		response.status(404);
	}
});

module.exports = router;