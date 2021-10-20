let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Basic User Schema for Google Authentication
const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	token: {
		type: String
	},
	googleId: {
		type: String,
		default: null
	},
	profileImage: {
		type: String,
		unique: true,
		default: null
	},
	joinedAt: {
		type: Date,
		default: Date.now()
	},
	expertMode: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('User', userSchema);
