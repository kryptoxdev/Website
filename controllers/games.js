const pool = require("../data/config.js");

function getGames(request, response, next) {
	pool.query("SELECT * FROM game ORDER BY game.name", (error, result) => {
		if (error) {
			throw error;
		}
		
		response.render("../views/pages/games/games", {
			title: "Games",
			gameArray: result,
			query: request.query
		});
	})
}

function addGame(request, response, next) {
	pool.query("INSERT INTO game SET ?", request.body, (error, result) => {
		if (error) {
			throw error;
		} 
		
		response.redirect(`/games?name=${request.body.name}&success=true`)
	});
}

function renderEditGame(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT * FROM game WHERE game_id = ?", id, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.render("../views/pages/games/edit", {
			title: "Edit Game",
			game: result[0]
		})
	})
}

function renderDeleteGame(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT * FROM game WHERE game_id = ?", id, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.render("../views/pages/games/delete", {
			title: "Delete Game",
			game: result[0]
		})
		
	})
}

function editGame(request, response, next) {
	const body = {
		"name": request.body.name,
		"duration": request.body.duration,
		"team_size": request.body.team_size,
	}
	
	pool.query(`UPDATE game SET ? WHERE game_id = ${request.body.game_id}`, body, (error, result) => {
		if (error) {
			throw error;
		}
	
		response.redirect("/games");
	})
}

function deleteGame(request, response, next) {
	const id = request.body.game_id
	
	pool.query(`DELETE FROM game WHERE game_id = ?`, id, (error, result) => {
		if (error) {
			throw error;
		}
		response.redirect("/games")
	})
}

module.exports = {
	getGames,
	addGame,
	renderEditGame,
	renderDeleteGame,
	editGame,
	deleteGame
}