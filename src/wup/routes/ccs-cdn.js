const router = require('express').Router();
const path = require('path');

// This endpoint seems to only be used for the TMD file
router.get('/download/:titleId/:file', (request, response) => {
	const { titleId, file } = request.params;
	const titleType = titleId.substring(0, 8);
	let titlePath = `${__dirname}/../../../titles/wup`;
	let filePath;

	switch (titleType) {
		case '0005000C':
			titlePath = `${titlePath}/aoc/${titleId}`;
			break;

		case '0005000E':
			titlePath = `${titlePath}/patch/${titleId}`;
			break;

		case '00050000':
			titlePath = `${titlePath}/title/${titleId}`;
			break;
	
		default:
			console.log(`Unknown title ID type ${titleId}`);
			return response.status(404);
	}

	if (file.endsWith('.h3')) {
		filePath = `${titlePath}/${file}`;
	} else {
		filePath = `${titlePath}/${file}.app`;
	}

	if (filePath) {
		response.sendFile(path.resolve(filePath));
	}
});

module.exports = router;