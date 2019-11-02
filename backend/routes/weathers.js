const express = require("express");
const Weather = require("../models/weather");
const checkAuth = require("../middleware/check-auth");
const data = require("../data/autoComplete");
const daily = require("../data/currentWeather");
const forecast = require("../data/forecast");
const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
	const weather = new Weather({
		name: req.body.name,
		key: req.body.key,
		day: req.body.day,
		image: req.body.image,
		temp: req.body.temp,
		status: req.body.status
	});

	weather.save().then(createdWeather => {
		res.status(201).json({
			message: "Weather added successfully",
			weatherId: createdWeather._id
		});
	});
});

router.get("", (req, res, next) => {
	Weather.find().then(documents => {
		res.status(200).json({
			message: "Weather fetched successfully!",
			weather: documents
		});
	});
});

router.get("/auto", (req, res, next) => {
	res.status(200).json(data);
});

router.get("/daily", (req, res, next) => {
	res.status(200).json(daily);
});

router.get("/forecast", (req, res, next) => {
	res.status(200).json(forecast);
});

router.delete("/:id", checkAuth, (req, res, next) => {
	Weather.deleteOne({ _id: req.params.id }).then(() => {
		res.status(200).json({ message: "Weather deleted!" });
	});
});

module.exports = router;
