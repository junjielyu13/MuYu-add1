import Sprite from '../base/sprite'
import One from './one'
import DataBus from '../databus'
import Music from '../runtime/music'
import { 
  MUYU_HIGHT, 
  MUYU_IMG, 
  MUYU_WIDTH, 
  MUYU_SCALE_SIZE, 
  FZ_WIDTH, 
  FONT_SIZE, 
  ONE_SPEED
} from '../config/config';
import {getRandomInt} from '../libs/utils';

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const databus = new DataBus()

export default class Muyu extends Sprite {
  constructor() {
    super(MUYU_IMG, MUYU_WIDTH, MUYU_HIGHT)

    this.x = screenWidth / 2 - this.width / 2;
    this.y = screenHeight - this.height - this.height/3;

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
        this.width = MUYU_WIDTH + MUYU_SCALE_SIZE;
        this.height = MUYU_HIGHT + MUYU_SCALE_SIZE;
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
        this.width = MUYU_WIDTH;
        this.height = MUYU_HIGHT;
      }
    }))
  }

  addOne() {
    const one = databus.pool.getItemByClass('ones', One);

    var oneX = 0;
    if (getRandomInt(0,1)) {
      oneX = getRandomInt(0, screenWidth / 2 - FZ_WIDTH / 2 - FONT_SIZE);
    }else{
      oneX = getRandomInt(screenWidth / 2 + FZ_WIDTH / 2, screenWidth - FONT_SIZE);
    }

    one.init(oneX, this.y, ONE_SPEED);
    databus.score += 1;
    this.music.playMuyu();
    databus.ones.push(one);
  }
}


