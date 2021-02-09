const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
	name: { type: String, required: true },
	key: { type: Number, required: true },
	day: { type: String, required: true },
	image: { type: String, required: true },
	temp: { type: Number, required: true },
	status: { type: String, required: true }
});

module.exports = mongoose.model("Weather", weatherSchema);
