import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import DataBus from './databus'
import Muyu from './player/muyu'
import Fz from './player/fz'

const ctx = canvas.getContext('2d')
const databus = new DataBus()

export default class Main {
  constructor() {
    this.aniId = 0
    this.init()
  }

  init() {
    databus.init()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.muyu = new Muyu(ctx)
    this.fz = new Fz(ctx)
    this.gameinfo = new GameInfo()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    window.cancelAnimationFrame(this.aniId)

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    //this.fz.render(ctx)

    databus.ones
      .concat(databus.ones)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    this.fz.drawToCanvas(ctx)
    this.muyu.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)
  }

  update() {
    if (databus.gameOver) return

    databus.ones.forEach((item) => {
      item.update()
    })

    //if (databus.frame % 20 === 0) {
    //}
  }

  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
