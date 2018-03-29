const XML = require('pixl-xml');
const Long = require('long');

const console_names = require('./common/device_names');
const console_codenames = require('./common/device_codenames');

class SOAP {
	constructor(string) {
		this.string = string;
		this.xml = XML.parse(this.string);

		for (const key of Object.keys(this.xml)) {
			if (this.xml[key].startsWith('urn:')) {
				this.namespace = key.split(':')[1];
				break;
			}
		}

		this.version = objectFind(this.namespace + ':Version', this.xml);
		this.device_id = Long.fromNumber(objectFind(this.namespace + ':DeviceId', this.xml));
		this.message_id = objectFind(this.namespace + ':MessageId', this.xml);
		this.device_identifier = this.device_id.shiftRight(28).and(0xF8).toNumber();

		if (this.namespace == 'nus') {
			this.region_id = objectFind(this.namespace + ':RegionId', this.xml);
		}

		if (this.device_identifier == 0x50) {
			this.virtual_device_type = objectFind(this.namespace + ':VirtualDeviceType', this.xml);
		}

		this.device_name = console_names[this.device_identifier];
		this.device_codename = console_codenames[this.device_identifier];
	}
}

function objectFind(query, object) {
	function search(query, object) {
		for (const key in object) {
			if (key === query) {
				return object[key];
			} else if (object[key] instanceof Object) {
				return search(query, object[key]);
			}
		}

		return false;
	}

	return search(query, object);
};

module.exports = SOAP;