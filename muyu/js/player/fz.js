import Sprite from '../base/sprite'
import One from './one'
import DataBus from '../databus'
import Music from '../runtime/music'
import {
  FZ_HIGHT, 
  FZ_WIDTH, 
  FZ_IMG, 
  FONT_SIZE,
  ONE_SPEED,
  getRandomInt
} from '../config/config';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const databus = new DataBus()

export default class Fz extends Sprite {
  constructor() {
    super(FZ_IMG,  FZ_WIDTH, FZ_HIGHT)

    this.x = screenWidth / 2 - this.width / 2;
    this.y = 60;
    this.top = 0;

    this.touched = false
    this.startTouchX = null;
    this.startTouchY = null;
    this.distance = null;
    this.moveShift = null;
    this.music = new Music();

    this.initEvent()
  }

  checkIsFingerOnFz(x, y) {
    const deviation = 30
    return !!(x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation)
  }


  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      this.startTouchX = e.touches[0].clientX;
      this.startTouchY = e.touches[0].clientY;

      if (this.checkIsFingerOnFz( this.startTouchX, this.startTouchY)) {
        this.touched = true
        this.addOne();
      }
    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      if (this.touched){
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const deltaX = currentX - this.startTouchX;
        const deltaY = currentY - this.startTouchY;

        this.distance = deltaY;
        this.moveShift += this.distance;
        if(Math.abs(this.moveShift) > this.width){
          this.moveShift = 0;
        }

        this.startTouchX = currentX;
        this.startTouchY = currentY;
      } 
    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }))
  }

  addOne() {
    const one = databus.pool.getItemByClass('ones', One);

    var oneX = 0;
    if (getRandomInt(0,1)) {
      oneX = getRandomInt(0, screenWidth / 2 - this.width / 2 - FONT_SIZE);
    }else{
      oneX = getRandomInt(screenWidth / 2 + this.width / 2, screenWidth - FONT_SIZE);
    }
    
    const oneY =  this.y + this.height + this.distance;

    one.init(oneX, oneY, ONE_SPEED);
    databus.score += 1;
    this.music.playFz();
    databus.ones.push(one);
  }

  drawToCanvas(ctx) {

    ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x,
      this.y + this.moveShift,
      this.width,
      this.height
    );

    ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x,
      this.y - 2 + this.moveShift - this.height,
      this.width,
      this.height
    );
  }
}
