const mongoose = require('mongoose');

require('dotenv').config();

module.exports = {
	connectDatabase: function connectDatabase() {
		const uri = process.env.MONGO_URI;
		mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		const connection = mongoose.connection;
		connection.once('open', () => {
			console.log('MongoDB database connection established successfully');
		});
	}
};
