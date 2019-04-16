
console.log('hello world')

document.addEventListener('DOMContentLoaded', function () {
  let canvas = document.getElementById("canvas")
  let p_width = canvas.width
  let p_height = canvas.height-15
  let width = canvas.width
  let height = canvas.height
  let ctx = canvas.getContext("2d")
  ctx.fillStyle = "red"




//   function draw_projectile() {
//        var canvas = document.getElementById('canvas');
//        if (canvas.getContext) {
//          var ctx = canvas.getContext('2d');
//
//          ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
//          ctx.fillRect(p_width, p_height, 25, 25);
// //
// //            ctx.clearRect(0, 0, width, height)
// //
// // ctx.fillRect(state.x - 5, state.y - 5, 10, 10)
// //
//        }
//      }

// sleep time expects milliseconds
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

// // Usage!
// sleep(500).then(() => {
//     // Do something after the sleep!
// });

// class Projectile {
//   constructor(width, height, ctx){
//     this.width = width
//     this.height = height
//     this.speedX = -10
//     this.ctx = ctx
//     this.update = function() {
//       ctx.fillRect(this.x, this.y, 25, 25)
//     }
//     this.newPos = function () {
//       this.x - this.speedX
//     }
//   }
//
//   updateGameArea() {
//     this.ctx.clearRect(0, 0, width, height)
//
//   }

    // projectile(width, height, color, x, y) {
    // this.width = width;
    // this.height = height;
    // this.speedX = 0;
    // this.speedY = 0;
    // this.x = x;
    // this.y = y;
    // this.update = function() {
    //   ctx = myGameArea.context;
    //   ctx.fillStyle = color;
    //   ctx.fillRect(this.x, this.y, this.width, this.height);
    // }
    // this.newPos = function() {
    //   this.x += this.speedX;
    //   this.y += this.speedY;
    // }
  //
  // draw_projectile() {
  //   this.ctx.clearRect(0, 0, width, height)
  //   this.ctx.fillRect(this.width, this.height, 25, 25)
  //   this.width -= 10
  //
  //   if (this.width > 0) requestAnimationFrame(draw_projectile)
  //   }


  // }
  //
  // projectile1 = new Projectile(p_width, p_height, ctx)
  // projectile1.draw_projectile()

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

// function update (speed) {
  //   state.p_x -= speed
  //   if (state.p_x < 0) {
    //     // sleep(3000).then(() => {
      //     // state.p_x += p_width
      //     // // window.setTimeout(reset, 1000)
      //   }
      // }
    let state = {
      projectile_position: {
        x: p_width,
        y: 285
      },

      jumpman_position: {
        x: 60,
        y: 250
      }
    }

    let collision = false



    function checkCollision() {
      console.log("jumping", jumping)
      console.log("passing", (state.projectile_position.x <= state.jumpman_position.x+40))

      if (state.projectile_position.x <= 80 && state.projectile_position.x >= 50 &&
        jumping == false) {
          collision = true
          console.log("jumping", jumping)
          console.log("passing", (state.projectile_position.x <= state.jumpman_position.x+40))

      }

      if (collision === true) {
        game_end = true
        alert('collision detected')
        // state.projectile_position.x = 650
      }

    }

    let projectile_active = true

    // function reset() {
    //   state.p_x += p_width
    // }

    function draw_projectile() {

      ctx.fillRect(state.projectile_position.x, state.projectile_position.y, 15, 15)

    }

    let jumping = false

    function draw_jumpman() {

      if (!jumping) {
       thing2 = ctx.fillRect(state.jumpman_position.x, state.jumpman_position.y, 50, 50)
      }

      if (jumping) {
       thing2 = ctx.fillRect(state.jumpman_position.x, state.jumpman_position.y, 50, 50)
      }
    }
    //
    // function random() {
    //   return Math.floor(Math.random() * 1500 + 200)
    // }

    function projectile_update() {
      let myArray = [400, 500, 1000, 1200, 2000, 2500]
      let rand = myArray[Math.floor(Math.random() * myArray.length)]

      if (state.projectile_position.x < -15) {
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
          state.projectile_position.x -= 15
        }
      }
    }


    let game_end = false

    // function update_jumpman() {
    //
    //   if(!jumping) {
    //     jumping = true
    //     setTimeout(land, 500)
    //   }
    // }

    function jump_up() {
      if(!jumping) {
        jumping = true
        state.jumpman_position.y -= 50
        setTimeout(land, 200)
      }
    }

    function land() {
      if(jumping){
        state.jumpman_position.y += 50
        jumping=false
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

    let timer = 0
   function drawScore() {
       ctx.font = "16px Arial"
       ctx.fillStyle = "#0095DD"
       ctx.fillText("Score: " + timer, 8, 20)
   }
    // ************GAME LOOP BEGIN**************
    function loop() {
      ctx.clearRect(0, 0, width, height)
      projectile_update()
      checkCollision()
      draw_projectile()
      // update_jumpman()
      draw_jumpman()
      drawScore()


      //check for coxllision
      if (!game_end){
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
	const playerName = document.querySelector("#player-name").value

	function renderPlayerName(player) {
		formField.remove()
		let nameSpan = document.querySelector("span")
		nameSpan.innerHTML = `<h2 data-id="${player.id}">
		${player.name} </h2>
		`
	}
	adapter.createPlayer(playerName)
	.then(renderPlayerName)
	// app.startgame

}) // end of the submit action

const endGame = document.querySelector("#end-game")
endGame.addEventListener("click", ev => {
	// userID
	adapter.createGame(userID, timer)
	// render the game again via canvas or via rendinring the whole page
})
