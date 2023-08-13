import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance) return instance
    instance = this
    this.pool = new Pool()
    this.init()
  }

  init() {
    this.frame = 0
    this.score = 0
    this.bullets = []
    this.ones = []
    this.enemys = []
    this.animations = []
    this.gameOver = false
  }

  removeOnes(one) {
    const temp = this.ones.shift()
    temp.visible = false
    this.pool.recover('one', one)
  }
}
