const express = require('express');
const router = express.Router();
const Client = require('../models/Clients');
const checkLoginStatus = require('../checkLoginStatus').checkLoginStatus;
const Clients = require('../models/Clients');
const Expert_User = require('../models/Expert_User');
const changeUserMode = require('../changeUserMode');

router.post('/create_client/:userId', checkLoginStatus, async (req, res) => {
	console.log('allowed to create client');
	let { ClientCode, ClientName } = req.body;
	await new Clients({ user: req.params.userId, ClientCode: ClientCode, ClientName: ClientName })
		.save()
		.then((resolved) => {
			res.status(200).json(resolved);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.get('/search_client/:userId', checkLoginStatus, async (req, res) => {
	let nameToSearch = req.query.client_name;
	let user_id = req.params.userId;
	await Client.find({
		$and: [ { name: { $regex: nameToSearch, $options: 'i' } }, { user: user_id } ]
	})
		.then((resolved) => {
			console.log(resolved);
			res.status(200).json(resolved);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.post('/logout/:userId', checkLoginStatus, async (req, res) => {
	changeUserMode.changeUserMode_False(req);
	await Expert_User.findOne({ user: req.params.userId }).then((resolved) => {
		Expert_User.findByIdAndUpdate({ _id: resolved._id }, { isLoggedIn: false }, { new: true }).then((resolve) => {
			res.status(200).json('Logged Out');
		});
	});
});

module.exports = router;
