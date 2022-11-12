import './index.scss'
import { AudioController } from '../../ts/AudioController'
import { ButtonClick } from '../../ts/ButtonClick'
import CardSwiper from '../../ts/Swiper'
import { OpenMobileMenu } from '../../ts/OpenMobileMenu'
import { LoginOpen } from '../../ts/LoginOpen'

class Index {
  constructor () {
    this.init()
  }

  init () {
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
    document.querySelectorAll('.j-mobile-container')
      .forEach(block => {
        const audioController = new OpenMobileMenu(block as HTMLDivElement)
        audioController.init()
      })
    document.querySelectorAll('.j-login-form')
      .forEach(block => {
        const audioController = new LoginOpen(block as HTMLDivElement)
        audioController.init()
      })
  }
}

new Index()
