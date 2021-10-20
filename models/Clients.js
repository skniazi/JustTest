const mongoose = require('mongoose');

const Client = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	ClientCode: {
		type: String,
		required: true
	},
	ClientName: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Client', Client);
