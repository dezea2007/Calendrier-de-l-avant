const mongoose = require("mongoose");

const Question = new mongoose.Schema({
	titre: String,
	color: String,
	reponses: [
		{
			rep: String,
			correct: Boolean,
		},
	],
});

module.exports = Question;
