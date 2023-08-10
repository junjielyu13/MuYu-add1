import Sprite from '../base/sprite'
import One from './one'
import DataBus from '../databus'
import Music from '../runtime/music'

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const PLAYER_IMG_SRC = 'img/fz_cont_ps.png';
const PLAYER_WIDTH = 70;
const PLAYER_HEIGHT = 250;

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
        // this.setAirPosAcrossFingerPosZ(x, y)

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        // Calculate the distance moved
        const deltaX = currentX - this.startTouchX;
        const deltaY = currentY - this.startTouchY;
        this.distance = deltaY;
        //Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        //console.log('Moved distance X:', deltaX);
        //console.log('Moved distance Y:', deltaY);


        // Update the startTouchX and startTouchY for the next move event
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
    const oneX = getRandomInt(this.x, this.x + this.width);
    
    one.init(oneX, this.y - 10, 5);
    databus.score += 1;
    this.music.playFz();
    databus.ones.push(one);
  }

  render(ctx) {
    ctx.drawImage(
      PLAYER_IMG_SRC,
      0,
      0,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      this.x,
      this.y,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
    )

    console.log(this.y += this.distance,);

    ctx.drawImage(
      PLAYER_IMG_SRC,
      0,
      0,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      this.x,
      this.y -= this.distance,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
    )
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
