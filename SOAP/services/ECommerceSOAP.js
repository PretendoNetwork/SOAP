const SOAP = require('../SOAP');
const json2xml = require('json2xml');

class ECommerceSOAP extends SOAP {
	constructor(string) {
		super(string);
	}

	GetAccountStatus() {

		// This request seems to send a scope in the form of the `ServiceLevel` tag
		// The eShop sends with `ServiceLevel` set to "SHOP"
		// Seems to return different values based on scope

		let xml;

		switch (this.xml['SOAP-ENV:Body']['ecs:GetAccountStatus']['ecs:ServiceLevel']) {
			case 'SHOP':
				xml = '\
				<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\
					<soapenv:Body>\
							<GetAccountStatusResponse xmlns="urn:ecs.wsapi.broadon.com">\
							<Version>' + this.version + '</Version>\
							<DeviceId>' + this.device_id.toString() + '</DeviceId>\
							<MessageId>' + this.message_id + '</MessageId>\
							<TimeStamp>' + Date.now() + '</TimeStamp>\
							<ErrorCode>0</ErrorCode>\
							<ServiceStandbyMode>false</ServiceStandbyMode>\
							<AccountId>' + this.xml['SOAP-ENV:Body']['ecs:GetAccountStatus']['ecs:AccountId'] + '</AccountId>\
							<AccountStatus>R</AccountStatus>\
							<Balance>\
								<Amount>0</Amount>\
								<Currency>USD</Currency>\
							</Balance>\
							<EulaVersion>0</EulaVersion>\
							<Country>' + this.xml['SOAP-ENV:Body']['ecs:GetAccountStatus']['ecs:Country'] + '</Country>\
							<Region>' + this.xml['SOAP-ENV:Body']['ecs:GetAccountStatus']['ecs:Region'] + '</Region>\
							<AccountAttributes>\
								<Name>LOYALTY_LOGIN_NAME</Name>\
								<Value />\
							</AccountAttributes>\
							<TIV>1686923775444701.0</TIV>\
							<TIV>1525253552582617.0</TIV>\
							<TIV>1599213916864029.0</TIV>\
							<TIV>1407443630154988.0</TIV>\
							<TIV>1584974316633765.0</TIV>\
							<TIV>1559042506031332.0</TIV>\
							<TIV>1439362764886455.0</TIV>\
							<TIV>1606635314418717.0</TIV>\
							<TIV>1473290677795574.0</TIV>\
							<TIV>1433989242744440.0</TIV>\
							<ServiceURLs>\
								<Name>ContentPrefixURL</Name>\
								<URI>http://ccs.cdn.wup.shop.nintendo.net/ccs/download</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>UncachedContentPrefixURL</Name>\
								<URI>http://ccs.wup.shop.nintendo.net/ccs/download</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>SystemContentPrefixURL</Name>\
								<URI>http://nus.cdn.wup.shop.nintendo.net/ccs/download</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>SystemUncachedContentPrefixURL</Name>\
								<URI>http://ccs.wup.shop.nintendo.net/ccs/download</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>EcsURL</Name>\
								<URI>http://ecs.wup.shop.nintendo.net/ecs/services/ECommerceSOAP</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>IasURL</Name>\
								<URI>http://ias.wup.shop.nintendo.net/ias/services/IdentityAuthenticationSOAP</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>CasURL</Name>\
								<URI>http://cas.wup.shop.nintendo.net/cas/services/CatalogingSOAP</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>NusURL</Name>\
								<URI>http://nus.wup.shop.nintendo.net/nus/services/NetUpdateSOAP</URI>\
							</ServiceURLs>\
							<IVSSyncFlag>false</IVSSyncFlag>\
							<CountryAttribits>12</CountryAttribits>\
						</GetAccountStatusResponse>\
					</soapenv:Body>\
				</soapenv:Envelope>';
				break;
			case 'SYSTEM':
				xml = '\
				<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\
					<soapenv:Body>\
							<GetAccountStatusResponse xmlns="urn:ecs.wsapi.broadon.com">\
							<Version>' + this.version + '</Version>\
							<DeviceId>' + this.device_id.toString() + '</DeviceId>\
							<MessageId>' + this.message_id + '</MessageId>\
							<TimeStamp>' + Date.now() + '</TimeStamp>\
							<ErrorCode>0</ErrorCode>\
							<ServiceStandbyMode>false</ServiceStandbyMode>\
							<AccountStatus>R</AccountStatus>\
							<ServiceURLs>\
								<Name>ContentPrefixURL</Name>\
								<URI>http://ccs.cdn.wup.shop.nintendo.net/ccs/download</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>UncachedContentPrefixURL</Name>\
								<URI>http://ccs.wup.shop.nintendo.net/ccs/download</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>SystemContentPrefixURL</Name>\
								<URI>http://nus.cdn.wup.shop.nintendo.net/ccs/download</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>SystemUncachedContentPrefixURL</Name>\
								<URI>http://ccs.wup.shop.nintendo.net/ccs/download</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>EcsURL</Name>\
								<URI>http://ecs.wup.shop.nintendo.net/ecs/services/ECommerceSOAP</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>IasURL</Name>\
								<URI>http://ias.wup.shop.nintendo.net/ias/services/IdentityAuthenticationSOAP</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>CasURL</Name>\
								<URI>http://cas.wup.shop.nintendo.net/cas/services/CatalogingSOAP</URI>\
							</ServiceURLs>\
							<ServiceURLs>\
								<Name>NusURL</Name>\
								<URI>http://nus.wup.shop.nintendo.net/nus/services/NetUpdateSOAP</URI>\
							</ServiceURLs>\
							<IVSSyncFlag>false</IVSSyncFlag>\
							<CountryAttribits>12</CountryAttribits>\
						</GetAccountStatusResponse>\
					</soapenv:Body>\
				</soapenv:Envelope>';
				break;
			default:
				break;
		}

		return '<?xml version="1.0" encoding="utf-8"?>' + xml.trim();

		/*return json2xml({
			tag_attributes: {
				'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
				'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
				'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
			},
			'soapenv:Envelope': {
				'soapenv:Body': {
					tag_attributes: {
						xmlns: 'urn:ecs.wsapi.broadon.com'
					},
					GetAccountStatusResponse: {
						Version: this.version,
						DeviceId: this.device_id.toString(),
						MessageId: this.message_id,
						TimeStamp: Date.now(),
						ErrorCode: 0,
						ServiceStandbyMode: false,
						AccountStatus: 'R', // R = Retail maybe?
					}
				}
			}
		}, {
			attributes_key: 'tag_attributes'
		});*/
	}

	AccountListETicketIds() {
		// I have no idea how to work with this on right now
		// Returns a list of `TIV` fields, which seem to be the IV's of the tickets
		// They are always the same for each request, and is in float values
		// For now, just always send the same thing

		const xml = '\
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\
			<soapenv:Body>\
				<AccountListETicketIdsResponse xmlns="urn:ecs.wsapi.broadon.com">\
					<Version>' + this.version + '</Version>\
					<DeviceId>' + this.device_id.toString() + '</DeviceId>\
					<MessageId>' + this.message_id + '</MessageId>\
					<TimeStamp>' + Date.now() + '</TimeStamp>\
					<ErrorCode>0</ErrorCode>\
					<ServiceStandbyMode>false</ServiceStandbyMode>\
					<TIV>1686923775444701.0</TIV>\
					<TIV>1525253552582617.0</TIV>\
					<TIV>1599213916864029.0</TIV>\
					<TIV>1407443630154988.0</TIV>\
					<TIV>1584974316633765.0</TIV>\
					<TIV>1559042506031332.0</TIV>\
					<TIV>1439362764886455.0</TIV>\
					<TIV>1606635314418717.0</TIV>\
					<TIV>1473290677795574.0</TIV>\
					<TIV>1433989242744440.0</TIV>\
				</AccountListETicketIdsResponse>\
			</soapenv:Body>\
		</soapenv:Envelope>';

		return '<?xml version="1.0" encoding="utf-8"?>' + xml.trim();
	}
}

module.exports = ECommerceSOAP;