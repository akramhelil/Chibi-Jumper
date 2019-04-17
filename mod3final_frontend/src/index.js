

let timer = 0
// console.log('hello world')

document.addEventListener('DOMContentLoaded', function () {
  let canvas = document.getElementById("canvas")
  let jump_sound = document.getElementById("#jump")
  let p_width = canvas.width
  let p_height = canvas.height
  let width = canvas.width
  let height = canvas.height
  let ctx = canvas.getContext("2d")

  ctx.fillStyle = "red"

// sleep time expects milliseconds
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
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

//*************GAME STATE****************

  let state = {
    projectile_position: {
      x: p_width,
      y: 425
    },

    jumpman_position: {
      x: 60,
      y: 400
    }
  }

  let collision = false
  let projectile_active = true
  let jumping = false
  let game_end = false
  let demoState = true
  let gameSpeed = 15



  function checkCollision() {

    if (state.projectile_position.x <= 150 && state.projectile_position.x >= 50 && jumping == false) {

      drawEnd()
      collision = true
    }

    if (collision == true) {
      game_end = true
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

  function projectile_update() {

    let myArray = [400, 500, 1000, 1200, 2000, 2500]
    let rand = myArray[Math.floor(Math.random() * myArray.length)]

    if (state.projectile_position.x < -100) {
      if (projectile_active) {

        projectile_active = false
        timer +=  250

        sleep(rand).then(function() {
          state.projectile_position.x = p_width
          // draw_projectile()
          projectile_active = true
        })
      }

    } else {
      if (projectile_active == true) {
        state.projectile_position.x -= gameSpeed
      }
    }
  }

  function projectile_demo() {
    let myArray = [400, 500, 1000, 1200, 2000, 2500, 2500, 2500]
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
        state.projectile_position.x -= 10
      }
    }
  }

  function jump_up() {
    if(!jumping) {
      jumping = true
      state.jumpman_position.y -= 100
      setTimeout(land, 230)
    }
  }

  function land() {
    if(jumping){
      state.jumpman_position.y += 100
      jumping=false
    }
  }

//*********EVENT LISTENERS**************
  document.addEventListener("keydown", ev => {

    let keyPressed = ev.keyCode
    ev.preventDefault()
    if (keyPressed === 32) {

     jump_up()
     canvas.innerHTML += '<audio src="./src/images/jump.wav" autoplay="autoplay">'
   }
 })

  document.addEventListener("keydown", ev => {
   let keyPressed = ev.keyCode

   if (keyPressed === 78) {
     ctx.clearRect(0, 0, width, height)
    location.reload()
   }
  })

  document.addEventListener("keydown", ev => {
    let keyPressed = ev.keyCode
    if (keyPressed === 13) {
      console.log('key down detected, demoState is', demoState)
      state.projectile_position.x = p_width
     demoState = false
   }
  })

  //*********DRAW FUNCTIONS**************

  function draw_projectile() {
    // ctx.fillRect(state.projectile_position.x, state.projectile_position.y, 15, 15)
    ctx.drawImage(document.getElementById("dragon"),state.projectile_position.x, state.projectile_position.y, 75, 75)
  }

  function draw_background() {
    ctx.drawImage(document.getElementById("background"),-9, 0, p_width+20, p_height)
  }

  function draw_jumpman() {
     //  ctx.fillStyle = "blue"
     // thing2 = ctx.fillRect(state.jumpman_position.x, state.jumpman_position.y, 50, 50)
     ctx.drawImage(document.getElementById("chibi"),state.jumpman_position.x, state.jumpman_position.y, 100, 100)
  }

  function drawInstructions(){
   ctx.drawImage(document.getElementById("text"),200, 100, 600, 300)
  }

  function drawGameOver(){
   ctx.drawImage(document.getElementById("gameover"),200, 100, 600, 300)
  }

  function drawEnd() {
      ctx.font = "16px Arial"
      ctx.fillStyle = "#0095DD"
      ctx.fillText("YOU LOSE SUCKER", 300, 150)
  }

 function drawScore() {
     ctx.font = "24px Arial"
     ctx.fillStyle = "#666"
     ctx.fillText("Score: " + timer, 10, 30)
 }


  // ************GAME LOOP BEGIN**************
  function loop() {
    console.log('gamespeed is', gameSpeed)
    ctx.clearRect(0, 0, width, height)
    checkGameSpeed()
    draw_background()
    draw_jumpman()
    draw_projectile()
    checkCollision()
    drawScore()
    projectile_update()
      if (!game_end){
      window.requestAnimationFrame(loop)
    } else if (game_end) {
      demoState = true
      drawGameOver()
      // location.reload()
      //animate losing frame
      // gameStartCountDown()
      console.log('demoState is', demoState)
    }
  }

  function gameStartCountDown () {
    game_end = false
    ctx.clearRect(0, 0, width, height)
    draw_background()
    draw_jumpman()
    drawInstructions()
    // draw_projectile()
    projectile_update()
   //  console.log('inside loop demostate is:', demoState)
    if (demoState){
      window.requestAnimationFrame(gameStartCountDown)
    }

    if (!demoState){
      timer = 0
      ctx.clearRect(0, 0, width, height)
      window.requestAnimationFrame(loop)
    }
}

  function gameDemoStart() {
    window.requestAnimationFrame(gameStartCountDown)
  }
//**********************GAME INIT***********************


    // window.requestAnimationFrame(loop)
    gameDemoStart()
})



//******************form code********

const formField = document.querySelector("form")

formField.addEventListener("submit", ev => {
	ev.preventDefault()
	// const modal = document.querySelector(".modal")
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
