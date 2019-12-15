// IdentityAuthenticationSOAP

const router = require('express').Router();
const xmlbuilder = require('xmlbuilder');
const logger = require('../../logger');

router.post('/', (request, response) => {
	const action = request.headers.soapaction.split('/').pop();
	const { body: requestBody } = request;
	const body = requestBody.get('SOAP-ENV:Envelope').get('SOAP-ENV:Body');

	console.log(body);
	console.log('[WUP - IAS]', action);

	response.set('Content-Type', 'text/xml');

	let actionResponse;
	let data;

	switch (action) {
		case 'GetChallenge':
			data = body.get('ecs:GetChallenge');

			actionResponse = {
				'soapenv:Envelope': {
					'@xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
					'@xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
					'@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			
					'soapenv:Body': {
						GetChallengeResponse: {
							'@xmlns': 'urn:ecs.wsapi.broadon.com',
			
							Version: '2.0',
							DeviceId: data.get('ecs:DeviceId'),
							MessageId: `EC-${data.get('ecs:DeviceId')}-3038380129`,
							TimeStamp: Date.now(),
							ErrorCode: '0',
							ServiceStandbyMode: 'false',
							Challenge: '123456789' // TODO: Make a real challenge
						}
					}
				}
			};
			break;

		default:
			logger.warn('[WUP - IAS] Unhandled SOAP action ' + action);
			break;
	}

	if (actionResponse) {
		response.send(xmlbuilder.create(actionResponse).end());
	} else {
		response.status(404);
	}
});

module.exports = router;