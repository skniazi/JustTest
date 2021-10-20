const express = require('express');
const app = express();
require('dotenv').config();
const passport = require('passport');
const port = 5002 || process.env.PORT;
const { connectDatabase } = require('./db');
const google_auth = require('./routes/google_auth');
const user_posts = require('./routes/user_posts');
const user_awards = require('./routes/user_awards');
const expert_mode = require('./routes/expert_mode');
const expert_mode_client = require('./routes/export_mode_client');
// require('dotenv').config();
// const url = process.env.API_URL;
connectDatabase();
require('./auth');
app.get('/', (req, res) => {
	res.json({ msg: 'server started' });
});
app.use(express.json({ useNewUrlParser: true }));
//auth routes
app.use(`/auth`, passport.initialize(), google_auth);
app.use(`/auth`, passport.initialize(), google_auth);
app.use('/verify', google_auth);
//user post routes
app.use('/user', user_posts);
//user awards routes
app.use('/user/awards', user_awards);
//user expert mode routes
app.use('/user/settings/expert_mode', expert_mode);
app.use('/user/clients/', expert_mode_client);
app.listen(port, function() {
	console.log('Express app listening on port 5002!' + this.address().port, app.settings.env);
});
