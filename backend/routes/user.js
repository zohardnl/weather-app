const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then(hash => {
		const user = new User({
			email: req.body.email,
			password: hash
		});
		user
			.save()
			.then(() => {
				res.status(201).json({
					created: true
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				});
			});
	});
});

router.post("/login", (req, res, next) => {
	let fetchedUser;
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res.status(401).json({
					login: false
				});
			}
			fetchedUser = user;
			return bcrypt.compare(req.body.password, user.password);
		})
		.then(result => {
			if (!result) {
				return res.status(401).json({
					login: false
				});
			}
			const token = jwt.sign(
				{ email: fetchedUser.email, userId: fetchedUser._id },
				"sadasd545646asd",
				{ expiresIn: "1h" }
			);
			res.status(200).json({
				token: token,
				expiresIn: 15000
			});
		})
		.catch(err => {
			return res.status(401).json({
				login: false
			});
		});
});

module.exports = router;
