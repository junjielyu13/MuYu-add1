export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = '#ffffff'
    ctx.font = '20px Arial'

    ctx.fillText(
      score,
      10,
      30
    )
  }
}
