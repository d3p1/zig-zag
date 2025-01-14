/**
 * @description Player
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
const DIRECTION_X = 'DIRECTION_X'
const DIRECTION_Y = 'DIRECTION_Y'

export default class Player {
  /**
   * @type {number}
   */
  radius

  /**
   * @type {number}
   */
  x

  /**
   * @type {number}
   */
  y

  /**
   * @type {number}
   */
  speed

  /**
   * @type {string}
   */
  direction

  /**
   * @type {string}
   */
  color

  /**
   * Constructor
   *
   * @param {number} radius
   * @param {number} x
   * @param {number} y
   * @param {number} speed
   * @param {string} direction
   * @param {string} color
   */
  constructor(
    radius,
    x,
    y,
    speed = 150,
    direction = DIRECTION_X,
    color = 'red',
  ) {
    this.radius = radius
    this.x = x
    this.y = y
    this.speed = speed
    this.direction = direction
    this.color = color
  }

  /**
   * Update
   *
   * @param   {number} deltaTime
   * @returns {void}
   */
  update(deltaTime) {
    if (this.direction === DIRECTION_X) {
      this.x += this.speed * deltaTime
    } else {
      this.y += this.speed * deltaTime
    }
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    context.fillStyle = this.color
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.fill()
  }

  /**
   * Change direction
   *
   * @returns {void}
   */
  changeDirection() {
    this.direction = this.direction === DIRECTION_X ? DIRECTION_Y : DIRECTION_X
  }
}
