import {MUYU_AUDIO, FZ_AUDIO} from '../config/config'

let instance

export default class Music {
  constructor() {
    if (instance) return instance;
    instance = this;
    
    this.muyuAudio = new Audio();
    this.muyuAudio.src = MUYU_AUDIO;

    this.fzAudio = new Audio();
    this.fzAudio.src = FZ_AUDIO;
  }

  playMuyu(){
    this.muyuAudio.currentTime = 0;
    this.muyuAudio.play();
  }

  playFz(){
    this.fzAudio.currentTime = 0;
    this.fzAudio.play();
  }
}
