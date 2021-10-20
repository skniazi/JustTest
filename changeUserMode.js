const User = require('./models/User');
module.exports = {
	changeUserMode_False: async (req) => {
		await User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ expertMode: false },
			{ new: true }
		).then((resolve) => {
			console.log(resolve);
		});
	},
	changeUserMode_True: async (req) => {
		await User.findOneAndUpdate({ _id: req.params.userId }, { expertMode: true }, { new: true }).then((resolve) => {
			console.log(resolve);
		});
	}
};
