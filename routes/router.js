const gameController = require("../controllers/games")

function router(app) {
	app.get("/", (request, response) => {
		response.render("../views/pages/home")
	});
	
	app.get("/games", gameController.getGames)
	
	app.get("/add/game", (request, response) => {
		response.render("../views/pages/games/add", {
			title: "Add Game"
		});
	});
	
	app.get("/edit/game/:id", gameController.renderEditGame);
	
	app.get("/delete/game/:id", gameController.renderDeleteGame);

	app.post("/add/game", gameController.addGame);
	
	app.post("/edit/game/:id", gameController.editGame);
	
	app.post("/delete/game/:id", gameController.deleteGame);
}

module.exports = router;