require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI);

app.use("/api", apiRoutes);
app.use("/", routes);
app.use((req, res, next) => {
	res.status(404);
	res.render("404");
	next();
});

app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${port}`);
});
