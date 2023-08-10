let instance

export default class Music {
  constructor() {
    if (instance) return instance
    instance = this
    
    this.muyuAudio = new Audio()
    this.muyuAudio.src = 'music/muyu.mp3'

    this.fzAudio = new Audio()
    this.fzAudio.src = 'music/fz.wav'
  }

  playMuyu(){
    this.muyuAudio.currentTime = 0
    this.muyuAudio.play()
  }

  playFz(){
    this.fzAudio.currentTime = 0
    this.fzAudio.play()
  }
}
