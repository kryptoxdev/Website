const gameController = require("../controllers/games");
const playerController = require("../controllers/players");
const specialController = require("../controllers/special");

function router(app) {
	app.get("/", (request, response) => {
		response.render("../views/pages/home")
	});
	
	app.get("/games", gameController.getGames);
	
	app.get("/players", playerController.getPlayers);
	
	app.get("/player/games/:id", specialController.getPlayerGames);
	
	app.get("/add/game", (request, response) => {
		response.render("../views/pages/games/add", {
			title: "Add Game"
		});
	});
	
	app.get("/add/player", (request, response) => {
		response.render("../views/pages/players/add", {
			title: "Add Player"
		});
	});
	
	app.get("/player/games/add/:id", specialController.renderAddGame);
	
	app.get("/edit/game/:id", gameController.renderEditGame);
	
	app.get("/edit/player/:id", playerController.renderEditPlayer)
	
	app.get("/delete/game/:id", gameController.renderDeleteGame);
	
	app.get("/delete/player/:id", playerController.renderDeletePlayer);
	
	app.get("/player/games/remove/:id/:id2", specialController.renderRemoveGame);
	
	app.post("/add/game", gameController.addGame);
	
	app.post("/add/player", playerController.addPlayer)
	
	app.post("/edit/game/:id", gameController.editGame);
	
	app.post("/edit/player/:id", playerController.editPlayer)
	
	app.post("/delete/game/:id", gameController.deleteGame);
	
	app.post("/delete/player/:id", playerController.deletePlayer);
	
	app.post("/player/games/remove/:id/:id2", specialController.removePlayerGame);
	
	app.post("/player/games/add/:id", specialController.addPlayerGame);
}

module.exports = router;