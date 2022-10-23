const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const locationSchema = new Schema({
	lat: { type: Number, default: 0 },
	lng: { type: Number, default: 0 }
});

const PoiSchema = new Schema({
	model: { type: String, default: 'Poi' },
	type: { type: String, default: 'Note' },
	title: { type: String, default: 'There is something here' },
	body: [{ type: String, default: 'There is something here' }],
	location: locationSchema,
	creator: { type: ObjectId, ref: 'Character' }
});

const Poi = mongoose.model('Poi', PoiSchema);

module.exports = { Poi };
