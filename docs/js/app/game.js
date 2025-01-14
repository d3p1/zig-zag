/* eslint-disable no-unused-vars */
/**
 * @description Game
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        For now, this entity works as a manager that handles
 *              interactions between the track and the player entities
 */
import Track from './game/track.js'
import TrackPath from './game/track/path.js'
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

    const pathIndex = this.#isPlayerOnTrack()
    if (pathIndex === false) {
      this.isGameOver = true
    } else {
      if (
        this.track.pathCollection.length &&
        pathIndex > Math.floor(this.track.pathCollection.length / 2) - 1
      ) {
        this.track.update()
      }
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
   * Check if player is on track.
   * If player is contained by one path element, then it is considered on track
   *
   * @returns {number|false}
   */
  #isPlayerOnTrack() {
    for (let i = 0; i < this.track.pathCollection.length; i++) {
      if (this.#isPlayerContainedInTrackPath(this.track.pathCollection[i])) {
        return i
      }
    }
    return false
  }

  /**
   * Check if player is contained in track path
   *
   * @param   {TrackPath} path
   * @returns {boolean}
   */
  #isPlayerContainedInTrackPath(path) {
    const left = path.x + this.player.radius
    const right = path.x + path.width - this.player.radius
    const top = path.y + this.player.radius
    const bottom = path.y + path.height - this.player.radius

    return (
      this.player.x >= left &&
      this.player.x <= right &&
      this.player.y >= top &&
      this.player.y <= bottom
    )
  }

  /**
   * Init player
   *
   * @returns {void}
   */
  #initPlayer() {
    this.player = new Player(
      this.track.pathShortSide * 0.2,
      this.track.pathShortSide * 0.5,
      this.track.pathShortSide * 0.5,
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
