const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const User = require('./models/User');
require('dotenv').config();
passport.use(
	new googleStrategy(
		{
			clientID: '778728956391-painhhq9gm8lp31sbeonvdckj7ts1itf.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: 'http://localhost:5002/auth/google/callback'
		},
		async (accessToken, refreshToken, profile, done) => {
			// console.log(accessToken);
			console.log(profile);
			const name = profile.displayName;
			const profilePicture = profile._json.picture;
			console.log(profilePicture);
			// const token = accessToken;
			const email = profile.emails[0].value;
			const googleId = profile.id;
			// check if user already exists
			const currentUser = await User.findOne({ email: email });
			console.log(currentUser);
			if (currentUser) {
				return done(null, currentUser);
			} else {
				const newUser = await new User({
					name: name,
					email: email,
					googleId: googleId,
					profileImage: profilePicture
				}).save();
				return done(null, newUser);
			}
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(async function(googleId, done) {
	await User.findOne(googleId, function(err, user) {
		done(null, user);
	});
});
