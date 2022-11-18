const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const locationSchema = new Schema({
	lat: { type: Number, default: 0 },
	lng: { type: Number, default: 0 }
});

const TeamSchema = new Schema({
	model: { type: String, default: 'Team' },
	description: {
		type: String,
		default: 'Just a team of people, trying to survive after the apocalypse'
	},
	conditions: [{ type: String, default: 'None' }], // TODO: might not be needed anymore with the new rules
	location: locationSchema
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = { Team };
