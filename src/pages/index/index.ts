import './index.scss'
import { AudioController } from '../../ts/AudioController'
import { ButtonClick } from '../../ts/ButtonClick'
import CardSwiper from '../../ts/Swiper'

class Index {
  constructor () {
    this.init()
  }

  init () {
    document.querySelectorAll('.j-example-item')
      .forEach(block => {
        // const Container = new ExampleCode(block as HTMLElement)
        // Container.init()
      })
    document.querySelectorAll('.j-audio')
      .forEach(block => {
        const audioController = new AudioController(block as HTMLDivElement)
        audioController.init()
      })
    document.querySelectorAll('.j-button-click')
      .forEach(block => {
        const audioController = new ButtonClick(block as HTMLButtonElement)
        audioController.init()
      })
    document.querySelectorAll('.j-swiper')
      .forEach(block => {
        const audioController = new CardSwiper(block as HTMLButtonElement)
        audioController.init()
      })
  }
}

new Index()
