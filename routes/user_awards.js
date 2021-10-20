const express = require('express');
const router = express.Router();
const { differenceInDays } = require('date-fns');
const authService = require('../authenticateToken');
const Awards = require('../models/Awards');
const User = require('../models/User');

router.post('/:userId', authService.checkTokenMW, async (req, res) => {
	authService.verifyToken(req, res);
	if (null === req.authData) {
		return res.sendStatus(403);
	} else {
		const id = req.params.userId;
		await User.findOne({ _id: id }).then((userObject) => {
			const joinedAt = userObject.joinedAt;
			const presentDate = new Date();
			console.log(presentDate);
			console.log(joinedAt);
			// var diffTime = presentDate.getTime() - joinedAt.getTime();
			// var diffTime2 = date2.getTime() - date1.getTime();
			// var diffDays = diffTime / 1000 * 3600 * 24;
			// console.log(diffDays);
			const days = Math.abs(differenceInDays(joinedAt, presentDate));
			console.log(days);
			let justStarted = days === 0 && days < 1;
			let firstDay = days >= 1 && days < 7;
			let firstWeek = days >= 7 && days < 14;
			let secondWeek = days >= 14 && days < 30;
			let firstMonth = days >= 30 && days < 60;
			if (justStarted) {
				Awards.findOne({ user: id }).then((object) => {
					console.log(object);
					if (object) {
						// object.achievementProgress = 'First Day';
						Awards.findByIdAndUpdate(
							{ _id: object._id },
							{ achievementProgress: 'Just Started' },
							{ new: true }
						).then((resolved) => {
							res.status(200).json(resolved);
						});
					} else {
						const award = new Awards({
							user: id,
							achievementProgress: 'Just Started'
						});
						award
							.save()
							.then((resolved) => {
								res.status(200).json(resolved);
							})
							.catch((error) => {
								res.status(401).json(error);
							});
					}
				});
			}

			if (firstDay) {
				Awards.findOne({ user: id }).then((object) => {
					console.log(object);
					if (object) {
						// object.achievementProgress = 'First Day';
						Awards.findByIdAndUpdate(
							{ _id: object._id },
							{ achievementProgress: 'First Day' },
							{ new: true }
						).then((resolved) => {
							res.status(200).json(resolved);
						});
					}
				});
			}
			if (firstWeek) {
				console.log('Entered First Week');
				Awards.findOne({ user: id }).then((object) => {
					console.log(object);
					if (object) {
						let update = object.achievementProgress;

						update = 'First Week';
						console.log(update);
						Awards.findByIdAndUpdate(
							{ _id: object._id },
							{ achievementProgress: 'First Week' },
							{ new: true }
						).then((resolved) => {
							res.status(200).json(resolved);
						});
					}
				});
			}
			if (secondWeek) {
				console.log('Entered Second Week');
				Awards.findOne({ user: id }).then((object) => {
					console.log(object);
					if (object) {
						let update = object.achievementProgress;

						update = 'Second Week';
						console.log(update);
						Awards.findByIdAndUpdate(
							{ _id: object._id },
							{ achievementProgress: 'Second Week' },
							{ new: true }
						).then((resolved) => {
							res.status(200).json(resolved);
						});
					}
				});
			}
			if (firstMonth) {
				console.log('Entered First Month');
				Awards.findOne({ user: id }).then((object) => {
					console.log(object);
					if (object) {
						let update = object.achievementProgress;

						update = 'First Month';
						console.log(update);
						Awards.findByIdAndUpdate(
							{ _id: object._id },
							{ achievementProgress: 'First Month' },
							{ new: true }
						).then((resolved) => {
							res.status(200).json(resolved);
						});
					}
				});
			}
		});
	}
});
module.exports = router;
