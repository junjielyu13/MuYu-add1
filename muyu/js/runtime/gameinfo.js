
import {FONT_SIZE} from '../config/config'

export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = '#ffffff'
    ctx.font = FONT_SIZE + 'px Arial'

    ctx.fillText(
      score,
      10,
      30
    )
  }
}
