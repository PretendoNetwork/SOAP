const csv = require('csvjson');
const got = require('got');
const fs = require('fs');

const CONSOLES = {
	WIIU_US_552: {
		region: 'E',
		system: 'wup',
		url: 'https://yls8.mtheall.com/ninupdates/titlelist.php?date=07-17-17_08-05-09&sys=wup&reg=E&soap=1&csv=1'
	}
};

(async () => {
	for (let device in CONSOLES) {
		device = CONSOLES[device];
		
		const request = await got(device.url);
		const csv_data = csv.toObject(request.body);
		fs.writeFileSync('./title_id_lists/' + device.system + '-' + device.region + '.json', JSON.stringify(csv_data));
	}
})();