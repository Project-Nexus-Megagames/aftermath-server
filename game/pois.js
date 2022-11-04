const { logger } = require('../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling
const { Poi } = require('../models/poi');
const nexusEvent = require('../middleware/events/events');

async function addPoi(data) {
	const { title, body, creator, location } = data;
	try {
		const poi = new Poi({
			creator,
			title,
			body,
			location
		});

		console.log('this is the data', data);
		const newPoi = await poi.save();
		// TODO await newPoi.populateMe();
		nexusEvent.emit('respondClient', 'create', [newPoi]);
		return { message: 'Poi Creation Success', type: 'success' };
	} catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `message : Server Error: ${err.message}`, type: 'error' };
	}
}
module.exports = {
	addPoi
};
