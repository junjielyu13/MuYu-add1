import Sprite from '../base/sprite'
import Bullet from './bullet'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'img/muyu_ps.png'
const PLAYER_WIDTH = 125
const PLAYER_HEIGHT = 125

const databus = new DataBus()

export default class Muyu extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight - this.height - 30

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []

    // 初始化事件监听
    this.initEvent()
  }

  checkIsFingerOnMuyu(x, y) {
    const deviation = 30

    return !!(x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation)
  }

  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()
      
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      if (this.checkIsFingerOnMuyu(x, y)) {
        this.touched = true;
        this.width = 150;
        this.height = 150;
      }
    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      this.touched = false;
      this.width = 125;
      this.height = 125;
    }))
  }

  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    const bullet = databus.pool.getItemByClass('bullet', Bullet)

    bullet.init(
      this.x + this.width / 2 - bullet.width / 2,
      this.y - 10,
      10
    )

    databus.bullets.push(bullet)
  }
}
