/**
 * @description Track
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        Analyze if it is better to handle all logic related
 *              to the track and the player inside the game entity
 *              that works as a manager
 */
import Path from './track/path.js'

export default class Track {
  /**
   * @type {number}
   */
  pathCount

  /**
   * @type {number}
   */
  pathWidth

  /**
   * @type {number}
   */
  pathHeight

  /**
   * @type {Path[]}
   */
  pathCollection = []

  /**
   * @type {number}
   * @note This property stores the `x` coordinate of the track end position
   */
  #x = 0

  /**
   * @type {number}
   * @note This property stores the `y` coordinate of the track end position
   */
  #y = 0

  /**
   * @type {number}
   * @note This property stores the index of the next path element
   * @note It is used to determine the next path element orientation
   */
  #index = 0

  /**
   * Constructor
   *
   * @param {number} pathCount
   * @param {number} pathWidth
   * @param {number} pathHeight
   */
  constructor(pathCount, pathWidth, pathHeight) {
    this.pathCount = pathCount
    this.pathWidth = pathWidth
    this.pathHeight = pathHeight

    this.#buildPath()
  }

  /**
   * Update
   *
   * @param   {number} currentPlayerPathIndex
   * @returns {void}
   */
  update(currentPlayerPathIndex) {
    if (
      this.pathCollection.length &&
      currentPlayerPathIndex > Math.floor(this.pathCollection.length / 2) - 1
    ) {
      this.#createPath()
      this.#dequeuePath()
    }
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    for (const path of this.pathCollection) {
      path.draw(context)
    }
  }

  /**
   * Check if player is on track.
   * If player is contained by one path element, then it is considered on track
   *
   * @param   {Player}       player
   * @returns {number|false}
   */
  isPlayerOnTrack(player) {
    for (let i = 0; i < this.pathCollection.length; i++) {
      const path = this.pathCollection[i]
      if (path.isPlayerContained(player)) {
        return i
      }
    }
    return false
  }

  /**
   * Build path
   *
   * @returns {void}
   */
  #buildPath() {
    for (let i = 0; i < this.pathCount; i++) {
      this.#createPath()
    }
  }

  /**
   * Create path
   *
   * @returns {void}
   */
  #createPath() {
    if (!(this.#index % 2)) {
      const [pathWidth, pathHeight] = [this.pathWidth, this.pathHeight]
      const path = new Path(pathWidth, pathHeight, this.#x, this.#y)
      this.#x += pathWidth - pathHeight
      this.#enqueuePath(path)
    } else {
      const [pathWidth, pathHeight] = [this.pathHeight, this.pathWidth]
      const path = new Path(pathWidth, pathHeight, this.#x, this.#y)
      this.#y += pathHeight - pathWidth
      this.#enqueuePath(path)
    }
  }

  /**
   * Enqueue path
   *
   * @param   {Path} path
   * @returns {void}
   * @todo    Improve the cohesion between this method
   *          and the create path method
   */
  #enqueuePath(path) {
    this.pathCollection.push(path)
    this.#index++
  }

  /**
   * Dequeue path
   *
   * @returns {void}
   */
  #dequeuePath() {
    this.pathCollection.shift()
  }
}
