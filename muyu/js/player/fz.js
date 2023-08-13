import Sprite from '../base/sprite'
import One from './one'
import DataBus from '../databus'
import Music from '../runtime/music'

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const PLAYER_IMG_SRC = 'img/fz_din_ps.png';
const PLAYER_WIDTH = 70;
const PLAYER_HEIGHT = 270;

const databus = new DataBus()

export default class Fz extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

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
      oneX = getRandomInt(0, screenWidth / 2 - 60);
    }else{
      oneX = getRandomInt(screenWidth / 2 + 35, screenWidth-20);
    }
    
    const oneY =  this.y + this.height + this.distance;

    one.init(oneX, oneY, 5);
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
