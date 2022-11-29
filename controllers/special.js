const pool = require("../data/config.js")

function getPlayerGames(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT game.name, duration, team_size, game_id, player_id FROM gamespecialisation JOIN game USING (game_id) JOIN player USING (player_id) WHERE player_id = ?", id, (error, result) => {
		if(error) {
			throw error;
		}
		
		console.log(result)
		
		response.render("../views/pages/players/special/main", {
			playerGamesArray: result
		})
	})
}

function renderRemoveGame(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT game.name, duration, team_size, game_id, player_id FROM gamespecialisation JOIN game USING (game_id) JOIN player USING (player_id) WHERE player_id = ?", id, (error, result) => {
		if(error) {
			throw error;
		}
		
		response.render("../views/pages/players/special/remove", {
			game: result[0]
		})
	})
}

function removePlayerGame(request, response, next) {
	const playerid = request.body.player_id
	const gameid = request.body.game_id
	
	
	console.log(request.body)
	
	pool.query(`DELETE FROM gamespecialisation WHERE game_id = ${gameid} AND player_id = ${playerid}`, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.redirect(`/player/games/${playerid}`);
	})
}

module.exports = {
	getPlayerGames,
	renderRemoveGame,
	removePlayerGame
}