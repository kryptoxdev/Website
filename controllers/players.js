const pool = require("../data/config.js");

function getPlayers(request, response, next) {
	pool.query("SELECT * FROM player ORDER BY player.name", (error, result) => {
		if(error) {
			throw error;
		}
		
		response.render("../views/pages/players/players", {
			title: "Players",
			playerArray: result
		});
	})
}

function addPlayer(request, response, next) {
	pool.query("INSERT INTO player SET ?", request.body, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.redirect("/players")
	})
}

function renderEditPlayer(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT * FROM player WHERE player_id = ?", id, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.render("../views/pages/players/edit", {
			title: "Edit Player",
			player: result[0]
		})
	})
}

function renderDeletePlayer(request, response, next) {
	const id =request.params.id;
	
	pool.query("SELECT * FROM player WHERE player_id = ?", id, (error, result) => {
		if(error) {
			throw error;
		}
		
		response.render("../views/pages/players/delete", {
			title: "Delete Player",
			player: result[0]
		})
	})
}

function editPlayer(request, response, next) {
	const body = {
		"name": request.body.name,
		"email": request.body.email
	}
	
	pool.query(`UPDATE player SET ? WHERE player_id = ${request.body.player_id}`, body, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.redirect("/players");
	})
}

function deletePlayer(request, response, next) {
	const id = request.body.player_id;
	
	pool.query(`DELETE FROM player WHERE player_id = ?`, id, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.redirect("/players");
	})
}

module.exports = {
	getPlayers,
	addPlayer,
	renderEditPlayer,
	renderDeletePlayer,
	editPlayer,
	deletePlayer
}