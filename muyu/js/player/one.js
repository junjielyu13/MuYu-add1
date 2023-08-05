import Sprite from '../base/sprite'
import DataBus from '../databus'


const ONES_WIDTH = 20
const ONES_HEIGHT = 20

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

export default class One extends Sprite {
  constructor() {
    super("", ONES_WIDTH, ONES_HEIGHT)
  }

  init(x, y, speed) {
    this.x = x
    this.y = y

    this[__.speed] = speed

    this.visible = true
  }


  drawToCanvas(ctx){
    if (!this.visible) return
    ctx.font = "30px Arial";
    ctx.fillText("+1", this.x, this.y);
  }

  // 每一帧更新子弹位置
  update() {
    this.y -= this[__.speed]

    // 超出屏幕外回收自身
    if (this.y < -this.height) databus.removeOnes(this)
  }
}
