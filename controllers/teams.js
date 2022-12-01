const pool = require ("../data/config.js");

function getTeams(request, response, next) {
	pool.query("SELECT team_id, game_id, team.name, email, game.name AS gamename FROM team JOIN game USING (game_id)", (error, result) => {
		if(error) {
			throw error;
		}
		
		console.log(result)
		
		response.render("../views/pages/teams/teams", {
			title: "Teams",
			teamArray: result
		})
	})
}

function renderAddTeam(request, response, next) {
	pool.query("SELECT game_id, game.name FROM game", (error, result) => {
		if (error) {
			throw error;
		}
		
		response.render("../views/pages/teams/add", {
			gamesArray: result
		})
	})
}

function renderEditTeam(request, response, next) {
	const id = request.params.id;
	
	pool.query("SELECT * FROM team WHERE team_id = ?", id, (error, result) => {
		if (error) {
			throw error;
		}
		
		pool.query("SELECT game_id, game.name FROM game", (gameError, gameResult) => {
			if (gameError) {
				throw gameError;
			}
			
			response.render("../views/pages/teams/edit", {
				team: result[0],
				gamesArray: gameResult
			});
		})
	})
}

function editTeam(request, response, next) {
	const body = {
		"game_id": request.body.game_id,
		"name": request.body.name,
		"email": request.body.email
	}
	
	console.log(request.body);
	
	pool.query(`UPDATE team SET ? WHERE team_id = ${request.body.team_id}`, body, (error, result) => {
		if (error) {
			throw error;
		}
		
		response.redirect("/teams")
	})
}

function addTeam(request, response, next) {
	pool.query("INSERT INTO team SET ?", request.body, (error, result) => {
		if(error) {
			throw error;
		}
		
		response.redirect("/teams")
	})
}

module.exports = {
	getTeams,
	renderAddTeam,
	renderEditTeam,
	addTeam,
	editTeam
}