const pool = require("../data/config.js")

function getPlayerGames(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT game.name, duration, team_size, game_id, player_id FROM gamespecialisation JOIN game USING (game_id) JOIN player USING (player_id) WHERE player_id = ?", id, (error, result) => {
		if(error) {
			throw error;
		}
		
		
		response.render("../views/pages/players/special/main", {
			playerid: id,
			playerGamesArray: result
		})
	})
}

function renderAddGame(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT game_id, name FROM game", (error, result) => {
		if (error) {
			throw error;
		}
		
		response.render("../views/pages/players/special/add", {
			playerid: id,
			gamesArray: result
		})
	})
}

function renderRemoveGame(request, response, next) {
	const body = {
		"player_id": request.params.id,
		"game_id": request.params.id2
	}
	
	pool.query(`SELECT game.name, duration, team_size, game_id, player_id FROM gamespecialisation JOIN game USING (game_id) JOIN player USING (player_id) WHERE player_id = ${body.player_id} AND game_id = ${body.game_id}`, (error, result) => {
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
	
	console.log(gameid + playerid)
	
	pool.query(`DELETE FROM gamespecialisation WHERE game_id = ${gameid} AND player_id = ${playerid}`, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.redirect(`/player/games/${playerid}`);
	})
}

function addPlayerGame(request, response, next) {
	const body = {
		"player_id": request.body.player_id,
		"game_id": request.body.game_id
	}
	
	pool.query("INSERT INTO gamespecialisation SET ?", body, (error, result) => {
		if (error) {
			throw error;
		}

		response.redirect(`/player/games/${body.player_id}`);
	})
}

module.exports = {
	getPlayerGames,
	renderRemoveGame,
	renderAddGame,
	removePlayerGame,
	addPlayerGame
}