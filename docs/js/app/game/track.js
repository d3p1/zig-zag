/**
 * @description Track
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
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
  pathLongSide

  /**
   * @type {number}
   */
  pathShortSide

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
   * @param {number} pathLongSide
   * @param {number} pathShortSide
   */
  constructor(pathCount, pathLongSide, pathShortSide) {
    this.pathCount = pathCount
    this.pathLongSide = pathLongSide
    this.pathShortSide = pathShortSide

    this.#buildPath()
  }

  /**
   * Update
   *
   * @returns {void}
   */
  update() {
    this.#enqueuePath()
    this.#dequeuePath()
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
   * Build path
   *
   * @returns {void}
   */
  #buildPath() {
    for (let i = 0; i < this.pathCount; i++) {
      this.#enqueuePath()
    }
  }

  /**
   * Enqueue path
   *
   * @returns {void}
   */
  #enqueuePath() {
    let path
    let pathWidth
    let pathHeight

    if (!(this.#index % 2)) {
      ;[pathWidth, pathHeight] = [this.pathLongSide, this.pathShortSide]
      path = new Path(pathWidth, pathHeight, this.#x, this.#y)
      this.#x += pathWidth - pathHeight
    } else {
      ;[pathWidth, pathHeight] = [this.pathShortSide, this.pathLongSide]
      path = new Path(pathWidth, pathHeight, this.#x, this.#y)
      this.#y += pathHeight - pathWidth
    }

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
