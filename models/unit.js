const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const locationSchema = new Schema({
	lat: { type: Number, default: 0 },
	lng: { type: Number, default: 0 }
});

const UnitSchema = new Schema({
	model: { type: String, default: 'Unit' },
	description: {
		type: String,
		default: 'Grandmas with pitchforks'
	},
	conditions: [{ type: String, default: 'None' }],
	location: locationSchema,
	team: { type: ObjectId, ref: 'Team' }
});

const Unit = mongoose.model('Unit', UnitSchema);

module.exports = { Unit };
