const pool = require("../data/config.js")

function getPlayerGames(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT * FROM gamespecialisation JOIN game USING (game_id) WHERE player_id = ?", id, (error, result) => {
		if(error) {
			throw error;
		}
		
		response.render("../views/pages/players/special/main", {
			playerGamesArray: result
		})
	})
}

function renderRemoveGame(request, response, next) {
	
}

module.exports = {
	getPlayerGames
}