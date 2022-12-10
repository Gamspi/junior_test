import './index.scss'
import { AudioController } from '../../ts/audioController'
import { ButtonClick } from '../../ts/buttonClick'
import CardSwiper from '../../ts/swiper'
import { OpenMobileMenu } from '../../ts/openMobileMenu'
import { LoginOpen } from '../../ts/loginOpen'
import { FilterController } from '../../ts/filterController'
import SliderInput from '../../ts/sliderInput'
import CustomSelect from '../../ts/customSelect'
import { AudioObserver } from '../../ts/audioObserver'

class Index {
  constructor () {
    this.init()
  }

  init () {
    document.querySelectorAll('.j-button-click')
      .forEach(block => {
        const buttonClick = new ButtonClick(block as HTMLButtonElement)
        buttonClick.init()
      })
    document.querySelectorAll('.j-swiper')
      .forEach(block => {
        const cardSwiper = new CardSwiper(block as HTMLButtonElement)
        cardSwiper.init()
      })
    document.querySelectorAll('.j-mobile-container')
      .forEach(block => {
        const openMobileMenu = new OpenMobileMenu(block as HTMLDivElement)
        openMobileMenu.init()
      })
    document.querySelectorAll('.j-login-form')
      .forEach(block => {
        const loginOpen = new LoginOpen(block as HTMLDivElement)
        loginOpen.init()
      })

    document.querySelectorAll('.j-filter')
      .forEach(block => {
        const filterController = new FilterController(block as HTMLDivElement)
        filterController.init()
      })
    document.querySelectorAll('.j-slider-input')
      .forEach(block => {
        const sliderInput = new SliderInput(block as HTMLDivElement)
        sliderInput.init()
      })
    document.querySelectorAll('.j-custom-select')
      .forEach(block => {
        const customSelect = new CustomSelect(block as HTMLDivElement)
        customSelect.init()
      })

    document.querySelectorAll('.j-audio')
      .forEach(block => {
        const audioController = new AudioController(block as HTMLDivElement)
        audioController.init()
      })
    document.querySelectorAll('.j-sound-list')
      .forEach(block => {
        const audioInit = new AudioObserver(block as HTMLDivElement)
        audioInit.init()
      })
  }
}

new Index()
