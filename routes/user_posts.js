const express = require('express');
const router = express.Router();
const authService = require('../authenticateToken');
const Post = require('../models/Posts');

router.post('/newPost/:userId', authService.checkTokenMW, async (req, res) => {
	try {
		authService.verifyToken(req, res);
		if (null === req.authData) {
			throw 'Error occured';
		} else {
			const user_id = req.authData.userId;
			const { posts } = req.body;
			const post = new Post({
				user: user_id,
				posts: posts
			});

			// console.log(post);
			const result = await Post.findOne({ user: user_id });
			if (result) {
				await Post.findById({ _id: result._id })
					.then((object) => {
						var myArray = object.posts;
						// console.log(post.posts[0]);
						const obj = {};
						obj['description'] = post.posts[0].description;
						obj['datePosted'] = post.posts[0].datePosted;
						obj['_id'] = post.posts[0]._id;
						myArray.push(obj);
						console.log(myArray);
						object
							.save()
							.then((savedObject) => {
								res.status(200).json(savedObject);
							})
							.catch((err) => {
								res.status(401).json(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				await post
					.save()
					.then((savedObject) => {
						res.status(200).json(savedObject);
					})
					.catch((err) => res.status(401).json({ error: err }));
			}
		}
	} catch (error) {
		res.json(error);
	}
});

router.put('/post/:userId', authService.checkTokenMW, async (req, res) => {
	try {
		authService.verifyToken(req, res);
		if (null === req.authData) {
			throw 'Error occured';
		} else {
			const id = req.params.userId;
			const { datePosted } = req.body;
			const date = new Date(datePosted);
			const req_date = date.toDateString();
			if (id.match(/^[0-9a-fA-F]{24}$/)) {
				// Yes, it's a valid ObjectId, proceed with call.
				await Post.findOne({ user: id })
					.then((postObject) => {
						console.log(postObject);
						let arr = [];
						for (const posts of postObject.posts) {
							// console.log(posts.datePosted);
							const datetrim = posts.datePosted.toDateString();
							console.log(datetrim);
							let obj = {};
							if (datetrim === req_date) {
								console.log(posts.description);
								obj['description'] = posts.description;
								arr.push(posts.description);
							} else {
								res.json('Nothing found');
							}
						}
						res.status(200).send(arr);
					})
					.catch((error) => {
						res.status(401).json(error);
					});
			}
		}
	} catch (error) {
		res.json(error);
	}
});
module.exports = router;
