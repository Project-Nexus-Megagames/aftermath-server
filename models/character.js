const mongoose = require("mongoose"); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema
const ObjectId = mongoose.ObjectId; // Destructure of Object ID
const nexusEvent = require("../middleware/events/events"); // Local event triggers

const CharacterSchema = new Schema({
  model: { type: String, default: "Character" },
  playerName: { type: String, minlength: 1, maxlength: 50, required: true },
  characterName: { type: String, minlength: 2, maxlength: 50, required: true },
  username: { type: String, minlength: 2, maxlength: 50, required: true },
  characterTitle: { type: String, maxlength: 50, default: "None" },
  pronouns: { type: String },
  bio: { type: String },
  email: { type: String, required: true },
  wiki: { type: String, default: "" },
  timeZone: { type: String, default: "???" },
  tags: [{ type: String }],
  control: [{ type: String }],
  color: { type: String, default: "ffffff" },
  profilePicture: { type: String },
  team: { type: Schema.Types.ObjectId, ref: "Team" },
});

const Character = mongoose.model("Character", CharacterSchema);

module.exports = { Character };
