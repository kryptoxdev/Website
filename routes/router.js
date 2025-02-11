const gameController = require("../controllers/games");
const playerController = require("../controllers/players");
const teamController = require("../controllers/teams");
const specialController = require("../controllers/special");

function router(app) {
	app.get("/", (request, response) => {
		response.render("../views/pages/home")
	});
	
	app.get("/games", gameController.getGames);
	
	app.get("/players", playerController.getPlayers);
	
	app.get("/teams", teamController.getTeams);
	
	app.get("/player/games/:id", specialController.getPlayerGames);
	
	app.get("/add/game", (request, response) => {
		response.render("../views/pages/games/add", {
			title: "Add Game",
			query: request.query
		});
	});
	
	app.get("/add/player", (request, response) => {
		response.render("../views/pages/players/add", {
			title: "Add Player"
		});
	});
	
	app.get("/add/team", teamController.renderAddTeam);
	
	app.get("/player/games/add/:id", specialController.renderAddGame);
	
	app.get("/edit/game/:id", gameController.renderEditGame);
	
	app.get("/edit/player/:id", playerController.renderEditPlayer)
	
	app.get("/edit/team/:id", teamController.renderEditTeam);
	
	app.get("/delete/game/:id", gameController.renderDeleteGame);
	
	app.get("/delete/player/:id", playerController.renderDeletePlayer);
	
	app.get("/delete/team/:id", teamController.renderDeleteTeam);
	
	app.get("/player/games/remove/:id/:id2", specialController.renderRemoveGame);
	
	app.post("/add/game", gameController.addGame);
	
	app.post("/add/player", playerController.addPlayer);
	
	app.post("/add/team", teamController.addTeam);
	
	app.post("/edit/game/:id", gameController.editGame);
	
	app.post("/edit/player/:id", playerController.editPlayer);
	
	app.post("/edit/team/:id", teamController.editTeam);
	
	app.post("/delete/game/:id", gameController.deleteGame);
	
	app.post("/delete/player/:id", playerController.deletePlayer);
	
	app.post("/delete/team/:id", teamController.deleteTeam);
	
	app.post("/player/games/remove/:id/:id2", specialController.removePlayerGame);
	
	app.post("/player/games/add/:id", specialController.addPlayerGame);
	
	app.get("*", (request, response) => {
		response.render("../views/pages/404", {
			title: "Page not found"
		})
	})
}

module.exports = router;