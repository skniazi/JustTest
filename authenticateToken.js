const jwt = require('jsonwebtoken');
require('dotenv').config();
// check if Token exists on request Header and attach token to request as attribute
exports.checkTokenMW = (req, res, next) => {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		req.token = bearerHeader.split(' ')[1];
		next();
	} else {
		res.sendStatus(403);
	}
};

// Verify Token validity and attach token data as request attribute
exports.verifyToken = (req, res) => {
	try {
		jwt.verify(req.token, process.env.TOKEN_KEY, (err, authData) => {
			if (err) {
				res.sendStatus(403);
			} else {
				return (req.authData = authData);
			}
		});
	} catch (error) {
		res.json(error);
	}
};

// Issue Token
exports.signToken = (req, res) => {
	const token = jwt.sign({ userId: req.user._id }, process.env.TOKEN_KEY, { expiresIn: '7h' });
	return token;
};
