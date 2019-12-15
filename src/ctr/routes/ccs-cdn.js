const router = require('express').Router();
const path = require('path');

// This endpoint seems to only be used for the TMD file
router.get('/download/:titleId/:file', (request, response) => {
	const { titleId, file } = request.params;
	const titleType = titleId.substring(0, 8);
	let titlePath = `${__dirname}/../../../titles/ctr`;
	let filePath;

	switch (titleType) {
		case '0004000C':
			titlePath = `${titlePath}/aoc/${titleId}`;
			break;

		case '0004000E':
			titlePath = `${titlePath}/patch/${titleId}`;
			break;

		case '00040000':
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
		response.setHeader('Last-Modified', 'Wed, 24 Oct 2018 17:14:26 GMT');
		response.setHeader('Content-Type', 'application/octet-stream');
		response.setHeader('Cache-Control', 'public, max-age=600');
		response.setHeader('Expires', 'Fri, 13 Dec 2019 02:17:36 GMT');
		response.setHeader('Date', 'Fri, 13 Dec 2019 02:07:36 GMT');
		response.setHeader('Connection', 'keep-alive');
		
		response.sendFile(path.resolve(filePath));
	}
});

module.exports = router;