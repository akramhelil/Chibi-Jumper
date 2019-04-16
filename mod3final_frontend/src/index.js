console.log('hello world')

document.addEventListener('DOMContentLoaded', function () {
  let canvas = document.getElementById("canvas")
  let p_width = canvas.width-25
  let p_height = canvas.height-25
  let width = canvas.width
  let height = canvas.height
  let ctx = canvas.getContext("2d")
  ctx.fillStyle = "red"
  let ctx2 = canvas.getContext("2d")
  ctx2.fillStyle = "red"


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


    let state = {
      p_x: p_width,
      p_y: p_height
    }

    function update (speed) {
      state.p_x -= speed
      if (state.p_x < 0) {
        // sleep(3000).then(() => {
        // state.p_x += p_width
        // // window.setTimeout(reset, 1000)
      }
    }

    function reset() {
      state.p_x += p_width
    }

    function draw_projectile() {
      ctx.clearRect(0, 0, width, height)
      ctx.fillRect(state.p_x, state.p_y, 25, 25)
    }

    function loop() {
      // let progress = timestamp - lastRender
      update(15)
      draw_projectile()
      window.requestAnimationFrame(loop)
    }

    // function player_unit() {
    //   // ctx2.clearRect(0, 0, width, height)
    //   ctx2.fillRect(150, 600, 25, 100)
    // }

    // lastRender = 0
    // window.requestAnimationFrame(loop)
    // player_unit()
    setInterval(loop, 2000)
    // window.setTimeout(loop, 2000)

})
