const express = require('express');
const router = express.Router();
const authService = require('../authenticateToken');
const Expert_User = require('../models/Expert_User');
const changeUserMode = require('../changeUserMode');
const User = require('../models/User');

router.post('/create_details/:userId', authService.checkTokenMW, async (req, res) => {
	authService.verifyToken(req, res);
	if (null === req.authData) {
		throw 'Error Occurred';
	} else {
		let { user, title, Full_Name, Phone_Number, Occupation, License_Number, isLoggedIn } = req.body;
		user = req.authData.userId;
		await Expert_User.findOne({ user: user }).then((resolved) => {
			if (resolved) {
				Expert_User.findByIdAndUpdate({ _id: resolved._id }, { isLoggedIn: true }, { new: true })
					.then((resolved) => {
						// User.findByIdAndUpdate({ _id: user }, { expertMode: true }, { new: true });
						changeUserMode.changeUserMode_True(req);
						res.status(200).json(resolved);
					})
					.catch((error) => {
						res.json(error);
					});
			} else {
				Expert_User({
					user: user,
					title,
					Full_Name,
					Phone_Number,
					Occupation,
					License_Number,
					isLoggedIn: true || isLoggedIn
				})
					.save()
					.then((resolved) => {
						console.log(resolved);
						// User.findByIdAndUpdate({ _id: user }, { expertMode: true }, { new: true });
						changeUserMode.changeUserMode_True(req);
						res.status(200).json(resolved);
					})
					.catch((error) => {
						res.json(error);
					});
			}
		});
	}
});

module.exports = router;
