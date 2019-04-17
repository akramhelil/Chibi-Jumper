console.log("hello world")

let timer = 0

document.addEventListener("DOMContentLoaded", function() {
	let canvas = document.getElementById("canvas")
	let p_width = canvas.width
	let p_height = canvas.height

	let width = canvas.width
	let height = canvas.height
	let ctx = canvas.getContext("2d")
	ctx.fillStyle = "red"

	// sleep time expects milliseconds
	function sleep(time) {
		return new Promise(resolve => setTimeout(resolve, time))
	}

	function showForm() {
		let modal = document.querySelector(".modal")
		modal.classList.toggle("show-modal")
	}

	//*****************working projectile loop code*************
	//
	// let state = {
	//   p_x: p_width,
	//   p_y: p_height
	// }
	//
	// function update () {
	//   state.p_x -= 10
	//   if (state.p_x < 0) {
	//
	//       state.p_x += p_width
	//
	//   }
	// }
	//
	// function draw_projectile() {
	//   ctx.clearRect(0, 0, width, height)
	//   ctx.fillRect(state.p_x, state.p_y, 25, 25)
	// }
	//
	// function loop() {
	//   // let progress = timestamp - lastRender
	//   update()
	//   draw_projectile()
	//   // window.requestAnimationFrame(loop)
	// }
	//
	// lastRender = 0
	// window.requestAnimationFrame(loop)

	//*****************projectile code begins*************

	//GAME STATES
	let state = {
		projectile_position: {
			x: p_width,
			y: 245
		},

		jumpman_position: {
			x: 50,
			y: 225
		}
	}

	let collision = false
	let projectile_active = true
	let jumping = false
	let game_end = false

	function checkCollision() {
		if (
			state.projectile_position.x <= 120 &&
			state.projectile_position.x >= 50 &&
			// if (state.projectile_position.x <= state.jumpman_position.x+50 && state.projectile_position.x >= 60 &&
			jumping == false
		) {
			drawEnd()
			console.log("timer is:", timer)
			collision = true

			console.log(
				"passing",
				state.projectile_position.x <= state.jumpman_position.x + 40
			)
		}

		if (collision === true) {
			game_end = true
			console.log(state.projectile_position.x)
			showForm()
			// state.projectile_position.x = 650
		}
	}

	// function reset() {
	//   state.p_x += p_width
	// }
	function draw_projectile() {
		// ctx.fillRect(state.projectile_position.x, state.projectile_position.y, 15, 15)
		ctx.drawImage(
			document.getElementById("dragon"),
			state.projectile_position.x,
			state.projectile_position.y,
			55,
			55
		)
	}

	function draw_background() {
		ctx.drawImage(
			document.getElementById("background"),
			0,
			0,
			p_width,
			p_height
		)
	}

	function draw_jumpman() {
		//  ctx.fillStyle = "blue"
		// thing2 = ctx.fillRect(state.jumpman_position.x, state.jumpman_position.y, 50, 50)
		ctx.drawImage(
			document.getElementById("chibi"),
			state.jumpman_position.x,
			state.jumpman_position.y,
			75,
			75
		)
	}

	function projectile_update() {
		let myArray = [400, 500, 1000, 1200, 2000, 2500]
		let rand = myArray[Math.floor(Math.random() * myArray.length)]

		if (state.projectile_position.x < -55) {
			if (projectile_active) {
				projectile_active = false
				timer += 100
				sleep(rand).then(function() {
					state.projectile_position.x = 650
					// draw_projectile()
					projectile_active = true
				})
			}
		} else {
			if (projectile_active == true) {
				state.projectile_position.x -= 30
			}
		}
	}

	// function update_jumpman() {
	//
	//   if(!jumping) {
	//     jumping = true
	//     setTimeout(land, 500)
	//   }
	// }

	function jump_up() {
		if (!jumping) {
			jumping = true
			state.jumpman_position.y -= 50
			setTimeout(land, 200)
		}
	}

	function land() {
		if (jumping) {
			state.jumpman_position.y += 50
			jumping = false
		}
	}

	document.addEventListener("keydown", ev => {
		let keyPressed = ev.keyCode
		if (keyPressed === 32) {
			jump_up()
			console.log("pressed down", jumping)
		}
	})

	// state.jumpman_position.y -= 10

	// if (state.jumpman_position.y < 200) {
	// state.jumpman_position.y += 10
	// }

	// } else if (state.jumpman_position.y <= 200) {
	//   state.jumpman_position.y += 10
	// }

	function drawEnd() {
		ctx.font = "16px Arial"
		ctx.fillStyle = "#0095DD"
		ctx.fillText("YOU LOSE SUCKER", 300, 150)
	}

	function drawScore() {
		ctx.font = "16px Arial"
		ctx.fillStyle = "red"
		ctx.fillText("Score: " + timer, 8, 20)
	}
	// ************GAME LOOP BEGIN**************
	function loop() {
		ctx.clearRect(0, 0, width, height)
		draw_background()
		draw_jumpman()
		draw_projectile()
		// update_jumpman()
		checkCollision()
		drawScore()

		projectile_update()

		//check for coxllision
		if (!game_end) {
			window.requestAnimationFrame(loop)
		}
	}

	//**********************GAME INIT***********************

	window.requestAnimationFrame(loop)
})

//******************form code********

const formField = document.querySelector("form")

formField.addEventListener("submit", ev => {
	ev.preventDefault()
	const modal = document.querySelector(".modal")
	const playerName = document.querySelector("#player-name").value

	function renderPlayerName(player) {
		const playerId = player.id
		formField.innerHTML = `<h2 data-id="${player.id}">
		${player.name} </h2>
		<h3>Your Score: ${timer}</h3>
		`
		adapter.createGame(playerId, timer)
	}
	adapter.createPlayer(playerName).then(player => {
		renderPlayerName(player)
		
	})
}) // end of the submit action
