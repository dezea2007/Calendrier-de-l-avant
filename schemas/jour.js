const Question = require("./question.js");
const mongoose = require("mongoose");

const Jour = new mongoose.Schema({
	jour: String,
	valide: Boolean,
	score: Number,
	questions: [Question],
});

module.exports = mongoose.model("Jour", Jour);
