const { logger } = require('../middleware/log/winston'); // Import of winston for error logging
const bodyParser = require('body-parser'); // Body Parser Middleware
const cors = require('cors');

// Routes - Using Express
const home = require('../routes/public/home');
const poi = require('./api/pois');

// Route Function
module.exports = function (app) {
	app.use(cors());
	logger.info('Route Middleware Loaded...');
	app.use(bodyParser.json()); // Tells Express to use Body Parser for JSON

	app.use('/', home);
	app.use('/api/pois', poi);
};
