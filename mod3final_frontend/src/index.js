console.log('hello world')

document.addEventListener('DOMContentLoaded', function () {
  let canvas = document.getElementById("canvas")
  let p_width = canvas.width-25
  let p_height = canvas.height-25
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

class Projectile {
  constructor(width, height, ctx){
    this.width = width
    this.height = height
    this.ctx = ctx
  }

    // let state = {
    //   p_x: p_width,
    //   p_y: p_height
    // }


  draw_projectile() {
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.fillRect(this.width, this.height, 25, 25)

  }

  update() {
    this.width -= 10
    // if(this.width < 0) {
    //   this.width += p_width
    }


  loop() {
    this.update()
    this.draw_projectile()

    // window.requestAnimationFrame(loop)
  }


  }

  projectile1 = new Projectile(p_width, p_height, ctx)
  projectile1.loop()


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

})
