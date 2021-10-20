const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	posts: [
		{
			datePosted: {
				type: Date,
				default: Date.now()
			},
			description: {
				type: String,
				required: true
			}
		}
	]
});

module.exports = mongoose.model('Post', postSchema);
