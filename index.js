const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./data/config.js")
const router = require("./routes/router.js");

const port = 3000;
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(express.static("primary"));

app.set("view engine", "ejs");

router(app);

// Start the server
const server = app.listen(port, (error) => {
	if (error) {
		return console.log(`Error: ${error}`);
	}
	console.log(`Server listening on port ${server.address().port}`);
});