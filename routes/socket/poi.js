const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling
const { addPoi } = require('../../game/pois');

module.exports = {
	name: 'poi',
	async function(client, req) {
		try {
			logger.info(`${client.username} has made a ${req.action} request in the ${req.route} route!`);
			let response;
			switch (req.action) {
				case 'create': {
					response = await addPoi(req.data, client.username);
					response.type === 'success' ? client.emit('alert', { type: 'success', message: 'Poi added!' }) : null;
					break;
				}
				default: {
					const message = `No ${req.action} is in the ${req.route} route.`;
					throw new Error(message);
				}
			}
		} catch (error) {
			client.emit('alert', {
				type: 'error',
				message: error.message ? error.message : error
			});
			logger.error(error);
		}
	}
};
