import Sprite from '../base/sprite'
import One from './one'
import DataBus from '../databus'
import Music from '../runtime/music'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const PLAYER_IMG_SRC = 'img/muyu_ps.png'
const PLAYER_WIDTH = 125
const PLAYER_HEIGHT = 125
const databus = new DataBus()

export default class Muyu extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    this.x = screenWidth / 2 - this.width / 2;
    this.y = screenHeight - this.height - 30;

    this.touched = false;
    this.music = new Music();
    this.initEvent();
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
        this.x -= 25;
        this.y -= 25;
        this.addOne();
      }
    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      if (this.touched) {
        this.touched = false;
        this.width = 125;
        this.height = 125;
        this.x += 25;
        this.y += 25;
      }
    }))
  }

  addOne() {
    const one = databus.pool.getItemByClass('ones', One);

    var oneX = 0;
    if (getRandomInt(0,1)) {
      oneX = getRandomInt(0, screenWidth / 2 - 60);
    }else{
      oneX = getRandomInt(screenWidth / 2 + 35, screenWidth-20);
    }
    
    one.init(oneX, this.y, 5);
    databus.score += 1;
    this.music.playMuyu();
    databus.ones.push(one);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
