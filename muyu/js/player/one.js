import Sprite from '../base/sprite'
import DataBus from '../databus'
import {ONES_WIDTH, ONES_HEIGHT, FONT_SIZE} from '../config/config'

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
    ctx.font = FONT_SIZE + "px Arial";
    ctx.fillText("+1", this.x, this.y);
  }


  update() {
    this.y -= this[__.speed]

    if (this.y < -this.height - 200) databus.removeOnes(this)
  }
}
