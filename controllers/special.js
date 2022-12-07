const pool = require("../data/config.js")

function getPlayerGames(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT game.name, duration, team_size, game_id, player_id, player.name AS playername FROM gamespecialisation JOIN game USING (game_id) JOIN player USING (player_id) WHERE player_id = ? ORDER BY game.name", id, (error, result) => {
		if(error) {
			throw error;
		}
		
		pool.query("SELECT name FROM player WHERE player_id = ?", id, function (nameError, nameResult) {
			if(nameError) {
				throw nameError;
			}
			
			response.render("../views/pages/players/special/main", {
				playername: nameResult[0].name,
				playerid: id,
				playerGamesArray: result
			})
		})
	})
}

function renderAddGame(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT game_id, game.name FROM game ORDER BY game.name", (error, result) => {
		if (error) {
			throw error;
		}
		
		pool.query("SELECT name FROM player WHERE player_id = ?", id, function (nameError, nameResult) {
			if (nameError) {
				throw nameError;
			}
			
			response.render("../views/pages/players/special/add", {
				playerid: id,
				playername: nameResult[0].name,
				gamesArray: result
			})
		})
	})
}

function renderRemoveGame(request, response, next) {
	const body = {
		"player_id": request.params.id,
		"game_id": request.params.id2
	}
	
	pool.query(`SELECT game.name AS gamename, duration, team_size, game_id, player_id, player.name FROM gamespecialisation JOIN game USING (game_id) JOIN player USING (player_id) WHERE player_id = ${body.player_id} AND game_id = ${body.game_id}`, (error, result) => {
		if(error) {
			throw error;
		}
		
		pool.query("SELECT name FROM player WHERE player_id = ?", body.player_id, function (nameError, nameResult) {
			if (nameError) {
				throw nameError;
			}
			
			response.render("../views/pages/players/special/remove", {
				playername: nameResult[0].name,
				game: result[0]
			})
		})
	})
}

function removePlayerGame(request, response, next) {
	const playerid = request.body.player_id
	const gameid = request.body.game_id
	
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