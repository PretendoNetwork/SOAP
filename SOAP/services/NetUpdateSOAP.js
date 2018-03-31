const SOAP = require('../SOAP');
const json2xml = require('json2xml');
const fs= require('fs');

class NetUpdateSOAP extends SOAP {
	constructor(string) {
		super(string);
	}

	GetSystemTitleHash() {

		const xml_obj = {
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
						TitleHash: 'FE2CBA09C94D1F1AA7CF17297692F54F'
					}
				}
			}
		};

		if (this.virtual_device_type) {
			xml_obj['soapenv:Envelope']['soapenv:Body'].GetSystemTitleHashResponse
		}

		// The console doesnt accept the response unless the `?xml` tag is defined
		return '<?xml version="1.0" encoding="utf-8"?>' + json2xml(xml_obj, {
			attributes_key: 'tag_attributes'
		}).trim();
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

		// Check the requests POST data and switch-case this based on the region
		// Hard-coding for now because testing
		const tid_list = JSON.parse(fs.readFileSync(__dirname + '/../../title_id_lists/wup-E.json'));

		let xml = '\
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\ xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\
			<soapenv:Body>\
				<GetSystemUpdateResponse xmlns="urn:nus.wsapi.broadon.com">\
					<Version>' + this.version + '</Version>\
					<DeviceId>' + this.device_id.toString() + '</DeviceId>\
					<MessageId>' + this.message_id + '</MessageId>\
					<TimeStamp>' + Date.now() + '</TimeStamp>\
					<ErrorCode>0</ErrorCode>\
					<ContentPrefixURL>https://ccs.cdn.wup.shop.nintendo.net/ccs/download</ContentPrefixURL>\
					<UncachedContentPrefixURL>https://ccs.wup.shop.pretendo.cc/ccs/download</UncachedContentPrefixURL>\
		';

		for (const title of tid_list) {
			xml += '\
					<TitleVersion>\
						<TitleId>' + title.TitleID + '</TitleId>\
						<Version>' + title['Title versions'].split(' ').pop().substring(1) + '</Version>\
						<FsSize>0</FsSize>\
						<TicketSize>848</TicketSize>\
						<TMDSize>0</TMDSize>\
					</TitleVersion>\
				';
		}

		xml += '\
					<UploadAuditData>1</UploadAuditData>\
					<TitleHash>FE2CBA09C94D1F1AA7CF17297692F54F</TitleHash>\
				</GetSystemUpdateResponse>\
			</soapenv:Body>\
		</soapenv:Envelope>\
		';

		return '<?xml version="1.0" encoding="utf-8"?>' + xml.trim();
	}
}

module.exports = NetUpdateSOAP;