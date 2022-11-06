const { logger } = require('../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling
const { Poi } = require('../models/poi');
const nexusEvent = require('../middleware/events/events');

async function addPoi(data) {
	const { title, body, creator, location, type } = data;
	try {
		const poi = new Poi({
			creator,
			title,
			body,
			location,
			type
		});
		const newPoi = await poi.save();
		// TODO await newPoi.populateMe();
		nexusEvent.emit('respondClient', 'create', [newPoi]);
		return { message: 'Poi Creation Success', type: 'success' };
	} catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `message : Server Error: ${err.message}`, type: 'error' };
	}
}

async function updatePoi(data) {
	const _id = data._id;
	const poi = await Poi.findById(_id);

	try {
		if (poi === null) {
			return { message: `Could not find a character for _id "${_id}"`, type: 'error' };
		} else if (poi.length > 1) {
			return { message: `Found multiple characters for _id ${_id}`, type: 'error' };
		} else {
			for (const el in data) {
				if (data[el] !== undefined && data[el] !== '' && el !== '_id' && el !== 'model') {
					poi[el] = data[el];
				} else {
					console.log(`Detected invalid edit: ${el} is ${data[el]}`);
				}
			}
			await poi.save();
			// TODO await newPoi.populateMe();
			nexusEvent.emit('respondClient', 'update', [poi]);
			return { message: `Character ${poi.title} edited`, type: 'success' };
		}
	} catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `message : Server Error: ${err.message}`, type: 'error' };
	}
}

async function deletePoi(data) {
	const _id = data;
	const poi = await Poi.findById(_id);

	try {
		if (poi === null) {
			return { message: `Could not find a character for _id "${_id}"`, type: 'error' };
		} else if (poi.length > 1) {
			return { message: `Found multiple characters for _id ${_id}`, type: 'error' };
		} else {
			await poi.delete();
			nexusEvent.emit('respondClient', 'delete', [poi]);
			return { message: `Character ${poi.title} edited`, type: 'success' };
		}
	} catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `message : Server Error: ${err.message}`, type: 'error' };
	}
}

module.exports = {
	addPoi,
	updatePoi,
	deletePoi
};
