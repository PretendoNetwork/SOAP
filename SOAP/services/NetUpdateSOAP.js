const SOAP = require('../SOAP');
const json2xml = require('json2xml');

class NetUpdateSOAP extends SOAP {
	constructor(string) {
		super(string);
	}

	GetSystemTitleHash() {
		// The console doesnt accept the response unless the `?xml` tag is defined
		return json2xml({
			tag_attributes: {
				'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
				'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
				'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
			},
			'soapenv:Envelope': {
				'soapenv:Body': {
					tag_attributes: {
						xmlns: 'urn:nus.wsapi.broadon.com'
					},
					GetSystemTitleHashResponse: {
						Version: this.version,
						DeviceId: this.device_id.toString(),
						MessageId: this.message_id,
						TimeStamp: Date.now(),
						ErrorCode: 0,
						TitleHash: '00000000000000000000000000000000'
					}
				}
			}
		}, {
			attributes_key: 'tag_attributes'
		});
	}

	GetSystemUpdate() {
		/*
		We have to work with strings here. The console expects a list of titles in the format:
		<TitleVersion>
			<TitleId>0005000000000001</TitleId>
			<Version>0</Version>
			<FsSize>0</FsSize>
			<TicketSize>848</TicketSize>
			<TMDSize>0</TMDSize>
		</TitleVersion>
		<TitleVersion>
			<TitleId>0005000000000002</TitleId>
			<Version>0</Version>
			<FsSize>0</FsSize>
			<TicketSize>848</TicketSize>
			<TMDSize>0</TMDSize>
		</TitleVersion>

		Which cannot be represented in a way that json2xml, or any other object-to-xml parser, can work with
		*/
		let xml = '\
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\ xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\
			<soapenv:Body>\
				<GetSystemUpdateResponse xmlns="urn:nus.wsapi.broadon.com">\
					<Version>' + this.version + '</Version>\
					<DeviceId>' + this.device_id.toString() + '</DeviceId>\
					<MessageId>' + this.message_id + '</MessageId>\
					<TimeStamp>' + Date.now() + '</TimeStamp>\
					<ErrorCode>0</ErrorCode>\
					<TitleHash>00000000000000000000000000000000</TitleHash>\
					<ContentPrefixURL>http://ccs.cdn.wup.shop.pretendo.cc/ccs/download</ContentPrefixURL>\
					<UncachedContentPrefixURL>https://ccs.wup.shop.pretendo.cc/ccs/download</UncachedContentPrefixURL>\
					<UploadAuditData>1</UploadAuditData>\
					<TitleVersion>\
						<TitleId>0005000000000001</TitleId>\
						<Version>0</Version>\
						<FsSize>0</FsSize>\
						<TicketSize>848</TicketSize>\
						<TMDSize>0</TMDSize>\
					</TitleVersion>\
					<TitleVersion>\
						<TitleId>0005000000000002</TitleId>\
						<Version>0</Version>\
						<FsSize>0</FsSize>\
						<TicketSize>848</TicketSize>\
						<TMDSize>0</TMDSize>\
					</TitleVersion>\
				</GetSystemUpdateResponse>\
			</soapenv:Body>\
		</soapenv:Envelope>\
		';

		return xml;
	}
}

module.exports = NetUpdateSOAP;