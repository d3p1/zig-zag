/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Game from './app/game.js'

export default class App {
  /**
   * @type {Game}
   */
  game

  /**
   * @type {CanvasRenderingContext2D}
   */
  context

  /**
   * @type {HTMLCanvasElement}
   */
  canvas

  /**
   * @type {string}
   */
  color

  /**
   * @type {number}
   */
  #animationId

  /**
   * @type {number}
   */
  #animationElapsedTime = 0

  /**
   * @type {Function}
   */
  #boundResizeCanvas

  /**
   * Constructor
   *
   * @param {string} canvasId
   * @param {string} color
   */
  constructor(canvasId, color = 'coral') {
    this.#initCanvas(canvasId)
    this.#initGame()
    this.color = color
  }

  /**
   * Run application
   *
   * @param   {number} t
   * @returns {void}
   */
  run(t = 0) {
    const seconds = t * 0.001
    const deltaTime = seconds - this.#animationElapsedTime
    this.#animationElapsedTime = seconds

    this.#clearCanvas()

    this.game.update(deltaTime)
    this.game.draw()

    if (this.game.isGameOver) {
      this.dispose()
      cancelAnimationFrame(this.#animationId)
      return
    }

    this.#animationId = requestAnimationFrame(this.run.bind(this))
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.game.dispose()
    window.removeEventListener('resize', this.#boundResizeCanvas)
  }

  /**
   * Clear canvas
   *
   * @returns {void}
   */
  #clearCanvas() {
    this.context.fillStyle = this.color
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * Init game
   *
   * @returns {void}
   */
  #initGame() {
    this.game = new Game(this.context, this.canvas)
  }

  /**
   * Init canvas
   *
   * @param   {string} canvasId
   * @returns {void}
   */
  #initCanvas(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.#resizeCanvas()
    this.#boundResizeCanvas = this.#resizeCanvas.bind(this)
    window.addEventListener('resize', this.#boundResizeCanvas)

    this.context = this.canvas.getContext('2d')
  }

  /**
   * Resize canvas
   *
   * @returns {void}
   */
  #resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}
