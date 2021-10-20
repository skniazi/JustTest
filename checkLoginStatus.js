const ExpertUser = require('./models/Expert_User');

module.exports = {
	checkLoginStatus: async (req, res, next) => {
		console.log(req.params.userId);
		let user_id = req.params.userId;
		await ExpertUser.findOne({ user: user_id }).populate('user').then((resolved) => {
			console.log(resolved);

			if (resolved.isLoggedIn) {
				resolved.user.expertMode = true;
				next();
			} else {
				throw 'Access not allowed';
			}
		});
	}
};
