const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	achievementProgress: {
		type: String,
		enum: [ 'Just Started', 'First Day', 'First Week', 'Second Week', 'First Month' ]
	}
});

module.exports = mongoose.model('Awards', awardSchema);
