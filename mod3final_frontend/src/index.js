let timer = 0

document.addEventListener('DOMContentLoaded', function () {
  let canvas = document.getElementById("canvas")
  let jumpSound = document.getElementById("#jump")
  let pWidth = canvas.width
  let pHeight = canvas.height
  let width = canvas.width
  let height = canvas.height
  let ctx = canvas.getContext("2d")
  let modal = document.querySelector(".modalNEW")

  ctx.fillStyle = "red"

// sleep time expects milliseconds
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function showForm() {
    let modal = document.querySelector(".modalNEW")
    modal.classList.toggle("show-modalNEW")
    formActive = true
  }

//*************GAME STATE****************

  let state = {
    projectilePosition: {
      x: pWidth,
      y: 425
    },

    jumpmanPosition: {
      x: 60,
      y: 400
    }
  }

  let collision = false
  let projectileActive = true
  let jumping = false
  let gameEnd = false
  let demoState = true
  let gameSpeed = 15
  let formActive = false



  function checkCollision() {

    if (state.projectilePosition.x <= 150 && state.projectilePosition.x >= 50 && jumping == false) {
      collision = true
    }

    if (collision == true) {
      gameEnd = true
    }
  }


//*********CHANGE OF STATE**********

  function checkGameSpeed () {

    if (timer < 500){
      gameSpeed = 20

    } else if (timer >= 500 && timer < 1500) {
      gameSpeed = 25

    } else if (timer >= 1500 && timer < 3000)  {
      gameSpeed = 30

    } else if (timer >= 3000 && timer < 4500) {
      gameSpeed = 35

    } else if (timer >= 4500 && timer < 6000){
      gameSpeed = 40

    } else if (timer >= 6000 && timer < 7500){
      gameSpeed = 45

    } else if (timer >= 7500 && timer < 99999999999){
      gameSpeed = 55
    }
  }

  function projectileUpdate() {

    let myArray = [400, 500, 1000, 1200, 2000, 2500]
    let rand = myArray[Math.floor(Math.random() * myArray.length)]

    if (state.projectilePosition.x < -100) {
      if (projectileActive) {

        projectileActive = false
        timer +=  250

        sleep(rand).then(function() {
          state.projectilePosition.x = pWidth
          projectileActive = true
        })
      }

    } else {
      if (projectileActive == true) {
        state.projectilePosition.x -= gameSpeed
      }
    }
  }

  function projectileDemo() {
    let myArray = [400, 500, 1000, 1200, 2000, 2500, 2500, 2500]
    let rand = myArray[Math.floor(Math.random() * myArray.length)]

    if (state.projectilePosition.x < -55) {
      if (projectileActive) {
        projectileActive = false
        timer += 100
        sleep(rand).then(function() {
          state.projectilePosition.x = 650
          // drawProjectile()
          projectileActive = true
        })
      }

    } else {
      if (projectileActive == true) {
        state.projectilePosition.x -= 10
      }
    }
  }

  function jumpUP() {
    if(!jumping) {
      jumping = true
      state.jumpmanPosition.y -= 100
      setTimeout(land, 230)
    }
  }

  function land() {
    if(jumping){
      state.jumpmanPosition.y += 100
      jumping=false
    }
  }

//*********EVENT LISTENERS**************
  document.addEventListener("keyup", ev => {
    let keyPressed = ev.keyCode
    if (keyPressed === 74 && !gameEnd) {
     jumpUP()
     canvas.innerHTML += '<audio src="./src/images/jump.wav" autoplay="autoplay">'
   }
 })

  document.addEventListener("keydown", ev => {
   let keyPressed = ev.keyCode
   if (keyPressed === 78 && gameEnd && !formActive) {
     ctx.clearRect(0, 0, width, height)
    location.reload()
   }
  })

  document.addEventListener("keydown", ev => {
    let keyPressed = ev.keyCode
    if (keyPressed === 13 && !formActive) {
      console.log('key down detected, demoState is', demoState)
      state.projectilePosition.x = pWidth
     demoState = false
   }
  })

  document.addEventListener("keydown", ev => {
    let keyPressed = ev.keyCode
    if (keyPressed === 83 && gameEnd && !formActive) {
      showForm()
      console.log('showing form')
     demoState = false
   }
  })

  window.onclick = function(event) {
  if (event.target == modal) {
    formActive = false;
    modal.style.display = "none";
    location.reload()
  }
}

	//*********DRAW FUNCTIONS**************

	function drawProjectile() {
		ctx.drawImage(
			document.getElementById("dragon"),
			state.projectilePosition.x,
			state.projectilePosition.y,
			75,
			75
		)
	}

	function drawBackground() {
		ctx.drawImage(
			document.getElementById("background"),
			-9,
			0,
			pWidth + 20,
			pHeight
		)
	}

	function drawJumpman() {
		ctx.drawImage(
			document.getElementById("chibi"),
			state.jumpmanPosition.x,
			state.jumpmanPosition.y,
			100,
			100
		)
	}

	function drawInstructions() {
		ctx.drawImage(document.getElementById("text"), 200, 100, 600, 300)
	}

	function drawGameOver() {
		ctx.drawImage(document.getElementById("gameover"), 200, 100, 600, 300)
	}

	function drawEnd() {
		ctx.font = "16px Arial"
		ctx.fillStyle = "#0095DD"
		ctx.fillText("YOU LOSE SUCKER", 300, 150)
	}

	function drawScore() {
		ctx.font = "24px Arial"
		ctx.fillStyle = "#BC3429"
		ctx.fillText("Score: " + timer, 10, 30)
	}

	// ************GAME LOOP BEGIN**************
	function loop() {
		console.log("gamespeed is", gameSpeed)
		ctx.clearRect(0, 0, width, height)
		checkGameSpeed()
		drawBackground()
		drawJumpman()
		drawProjectile()
		checkCollision()
		drawScore()
		projectileUpdate()
		if (!gameEnd) {
			window.requestAnimationFrame(loop)
		} else if (gameEnd) {
			demoState = true
			drawGameOver()
			console.log("demoState is", demoState)
		}
	}

	function gameStartCountDown() {
		gameEnd = false
		ctx.clearRect(0, 0, width, height)
		drawBackground()
		drawJumpman()
		drawInstructions()
		projectileUpdate()
		if (demoState) {
			window.requestAnimationFrame(gameStartCountDown)
		}

		if (!demoState) {
			timer = 0
			ctx.clearRect(0, 0, width, height)
			window.requestAnimationFrame(loop)
		}
	}

	function gameDemoStart() {
		window.requestAnimationFrame(gameStartCountDown)
	}
	//**********************GAME INIT***********************
	gameDemoStart()
  adapter.getGames().then(games => {
		console.log(games)
    gamesArr = games
    gamesArr.sort(function(a,b){
      return b.timer - a.timer;
    })
		// render the games to the table
		const table = document.querySelector("#table-info")
		gamesArr.slice(0,10).forEach(game => {
			table.innerHTML += ` <td>${game.player.name}</td>
			  <td>${game.timer}</td>`
		})
	})

  })

//******************form code********

const formField = document.querySelector("form")
formField.addEventListener("submit", ev => {
	ev.preventDefault()
	const playerName = document.querySelector("#player-name").value
	function renderPlayerName(player) {
		const playerId = player.id
		formField.innerHTML = `<h2 id= data-id="${player.id}">
		${player.name} </h2>
		<h3 id="modal-title-text">Let it be known! Your score is: ${timer}</h3><br>
		`
		adapter.createGame(playerId, timer)
	}
	adapter.createPlayer(playerName).then(player => {
		renderPlayerName(player)
    formActive = false
	})
}) // end of the submit action
