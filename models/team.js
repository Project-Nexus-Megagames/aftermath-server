const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const unitSchema = new Schema({
	submodel: { type: String, default: 'Unit' },
	name: { type: String, default: 'Default' },
	location: { type: String, default: '' }
});

const TeamSchema = new Schema({
	model: { type: String, default: 'Team' },
	units: [unitSchema],
	description: { type: String, default: 'Just a team of people, trying to survive after the apocalypse' },
	conditions: [{ type: String, default: 'None' }],
	location: { type: String, default: '' }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = { Team };
