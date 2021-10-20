const express = require('express');
const router = express.Router();
const passport = require('passport');
const authService = require('../authenticateToken');
router.get(
	'/google',
	passport.authenticate('google', {
		scope: [ 'profile', 'email' ]
	})
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
	try {
		const token = authService.signToken(req, res);
		req.user.token = token;
		console.log(req.user);
		res.status(200).json(req.user);
	} catch (err) {
		res.status(401).json({ err: 'error occured' });
	}
});

// route to check token with postman.
// using middleware to check for authorization header
router.get('/', authService.checkTokenMW, (req, res) => {
	authService.verifyToken(req, res);
	if (null === req.authData) {
		res.sendStatus(403);
	} else {
		res.json(req.authData);
	}
});

module.exports = router;
