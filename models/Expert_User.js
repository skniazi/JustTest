const mongoose = require('mongoose');

const ExpertUser = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	title: {
		type: String,
		enum: [ 'Not Assigned', 'Dr', 'MR', 'MRS', 'MISS' ],
		default: 'Not Assigned'
	},
	Full_Name: {
		type: String,
		default: null
	},
	Phone_Number: {
		type: Number,
		default: null
	},
	Occupation: {
		type: String,
		default: null
	},
	License_Number: {
		type: String,
		default: null
	},
	isLoggedIn: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('ExpertUser', ExpertUser);
