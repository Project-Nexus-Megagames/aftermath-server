const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server
const nexusEvent = require('../../middleware/events/events'); // Local event triggers
const validateObjectId = require('../../middleware/util/validateObjectId');

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const { Poi } = require('../../models/poi');

const httpErrorHandler = require('../../middleware/util/httpError');
const nexusError = require('../../middleware/util/throwError');

// @route   GET api/locations
// @Desc    Get all locations
// @access  Public
router.get('/', async function (req, res, next) {
	logger.info('GET Route: api/pois requested: get all');
	if (req.timedout) {
		next();
	} else {
		try {
			const poi = await Poi.find(); // TODO add .populate('creator', 'characterName username playerName')
			res.status(200).json(poi);
		} catch (err) {
			logger.error(err.message, { meta: err.stack });
			res.status(500).send(err.message);
		}
	}
});

// @route   GET api/locations/:id
// @Desc    Get a single Location by ID
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/poi/:id requested...');
	const id = req.params.id;
	try {
		const poi = await Poi.findById(id); // TODO add .populate('creator', 'characterName username playerName')
		if (poi != null) {
			res.status(200).json(poi);
		} else {
			nexusError(`The location with the ID ${id} was not found!`, 404);
		}
	} catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   POST api/locations
// @Desc    Post a new location
// @access  Public
router.post('/', async function (req, res, next) {
	logger.info('POST Route: api/poi call made...');
	if (req.timedout) {
		next();
	} else {
		const { data } = req.body;
		console.log(req.body);
		try {
			let newElement = new Poi(data);
			const docs = await Poi.find({ title: data.title });

			if (docs.length < 1) {
				newElement = await newElement.save();
				const poi = await Poi.findById(newElement._id);
				logger.info(`Location "${newElement.title}" created.`);
				res.status(200).json(poi);
			} else {
				nexusError(`An POI with title ${newElement.title} already exists!`, 400);
			}
		} catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

// @route   DELETE api/locations/:id
// @Desc    Delete an location
// @access  Public
// DEPRECIATED
router.delete('/:id', async function (req, res, next) {
	logger.info('DEL Route: api/agent:id call made...');
	if (req.timedout) {
		next();
	} else {
		try {
			const id = req.params.id;
			let element = await Poi.findById(id);
			if (element != null) {
				element = await Poi.findByIdAndDelete(id);

				logger.info(`Poi with the id ${id} was deleted!`);
				nexusEvent.emit('updatePois');
				res.status(200).send(`Poi with the id ${id} was deleted!`);
			} else {
				nexusError(`No poi with the id ${id} exists!`, 400);
			}
		} catch (err) {
			httpErrorHandler(res, err);
		}
	}
});

// @route   PATCH api/locations/deleteAll
// @desc    Delete All locations
// @access  Public

router.patch('/deleteAll', async function (req, res) {
	const data = await Poi.deleteMany();
	return res.status(200).send(`We wiped out ${data.deletedCount} Points of Interest`);
});

// router.post('/initLocations', async function (req, res) {
//	logger.info('POST Route: api/character call made...');

//	try {
//		for (const loc of pois) {
//			let newLocation = new Location(loc);
//			newLocation = await newLocation.save();
//		}
//		const locat = await Location.find();
//		res.status(200).json(locat);
//	} catch (err) {
//		httpErrorHandler(res, err);
//	}
// });

module.exports = router;
