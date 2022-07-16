const mongoose = require('mongoose');
const { logger } = require('../log/winston'); // Import of winston for error logging

module.exports = function() {
	mongoose
		.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true
		})
		.then(() => logger.info('MongoDB Connected to database...'));
};
