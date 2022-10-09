const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID

const CharacterSchema = new Schema({
	model: { type: String, default: 'Character' },
	playerName: { type: String, minlength: 1, maxlength: 50, required: true },
	characterName: { type: String, minlength: 2, maxlength: 50, required: true },
	username: { type: String, minlength: 2, maxlength: 50, required: true },
	characterTitle: { type: String, maxlength: 50, default: 'None' },
	pronouns: { type: String, default: '' },
	bio: { type: String, default: 'None' },
	email: { type: String, required: true, default: 'example@example.com' },
	wiki: { type: String, default: '' },
	timeZone: { type: String, default: '???' },
	tags: [{ type: String, default: '' }],
	control: [{ type: String, default: '' }],
	color: { type: String, default: 'ffffff' },
	profilePicture: { type: String, default: 'none' },
	team: { type: ObjectId, ref: 'Team' }
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = { Character };
