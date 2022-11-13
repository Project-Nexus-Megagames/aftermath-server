const mongoose = require('mongoose');
const { logger } = require('../log/winston'); // Import of winston for error logging
const config = require('config');

const dbName = config.get('dbName');
// const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@candi.zx3mbs8.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gev25ke.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const mongo_options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
};

module.exports = function () {
	mongoose
		.connect(dbURI, mongo_options)
		.then(() => logger.info(`MongoDB Connected to ${dbName} database...`));
};
