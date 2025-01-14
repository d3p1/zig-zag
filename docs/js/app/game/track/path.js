/**
 * @description Track path
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        Analyze if it is better to handle all logic related
 *              to the path and the player inside the game entity
 *              that works as a manager
 */
export default class Path {
  /**
   * @type {number}
   */
  width

  /**
   * @type {number}
   */
  height

  /**
   * @type {number}
   */
  x

  /**
   * @type {number}
   */
  y

  /**
   * @type {string}
   */
  color

  /**
   * Constructor
   *
   * @param {number} width
   * @param {number} height
   * @param {number} x
   * @param {number} y
   * @param {string} color
   */
  constructor(width, height, x, y, color = 'blue') {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.color = color
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  /**
   * Check if player is container in path
   *
   * @param   {Player}  player
   * @returns {boolean}
   */
  isPlayerContained(player) {
    const left = this.x + player.radius
    const right = this.x + this.width - player.radius
    const top = this.y + player.radius
    const bottom = this.y + this.height - player.radius

    return (
      player.x >= left &&
      player.x <= right &&
      player.y >= top &&
      player.y <= bottom
    )
  }
}
