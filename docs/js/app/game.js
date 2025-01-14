/**
 * @description Game
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Track from './game/track.js'
import Player from './game/player.js'

export default class Game {
  /**
   * @type {Player}
   */
  player

  /**
   * @type {Track}
   */
  track

  /**
   * @type {CanvasRenderingContext2D}
   */
  context

  /**
   * @type {HTMLCanvasElement}
   */
  canvas

  /**
   * @type {boolean}
   */
  isGameOver = false

  /**
   * @type {Function}
   */
  #boundPlayerChangeDirection

  /**
   * Constructor
   *
   * @param   {CanvasRenderingContext2D} context
   * @param   {HTMLCanvasElement}        canvas
   * @returns {void}
   */
  constructor(context, canvas) {
    this.context = context
    this.canvas = canvas
    this.#initTrack()
    this.#initPlayer()
  }

  /**
   * Update
   *
   * @param   {number} deltaTime
   * @returns {void}
   */
  update(deltaTime) {
    this.player.update(deltaTime)

    const pathIndex = this.track.isPlayerOnTrack(this.player)
    if (pathIndex === false) {
      this.isGameOver = true
    } else {
      this.track.update(pathIndex)
    }
  }

  /**
   * Draw
   *
   * @returns {void}
   */
  draw() {
    this.context.save()
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2)
    this.context.rotate((-3 * Math.PI) / 4)
    this.context.translate(-this.player.x, -this.player.y)
    this.track.draw(this.context)
    this.player.draw(this.context)
    this.context.restore()
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.canvas.removeEventListener(
      'pointerdown',
      this.#boundPlayerChangeDirection,
    )
  }

  /**
   * Init player
   *
   * @returns {void}
   */
  #initPlayer() {
    this.player = new Player(
      this.track.pathHeight * 0.2,
      this.track.pathHeight * 0.5,
      this.track.pathHeight * 0.5,
    )

    this.#boundPlayerChangeDirection = () => {
      this.player.changeDirection()
    }

    this.canvas.addEventListener(
      'pointerdown',
      this.#boundPlayerChangeDirection,
    )
  }

  /**
   * Init track
   *
   * @returns {void}
   */
  #initTrack() {
    this.track = new Track(10, 300, 150)
  }
}
