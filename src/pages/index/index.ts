import './index.scss'
import { Xhr } from '../../ts/api/Xhr/Xhr'
import { AudioController } from '../../ts/AudioController'
import { ButtonClick } from '../../ts/ButtonClick'
import CardSwiper from '../../ts/Swiper'
import { OpenMobileMenu } from '../../ts/OpenMobileMenu'
import { LoginOpen } from '../../ts/LoginOpen'
import { ValidationForm } from '../../ts/ValidationForm'
import { FilterController } from '../../ts/FilterController'
import SliderInput from '../../ts/SliderInput'
import CustomSelect from '../../ts/CustomSelect'

class Index {
  constructor () {
    this.init()
  }

  init () {
    Xhr.Get('http://localhost:5000/api/genre', {
      id: 'zonk'
    }).then((data) => {
      console.log(data)
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
    document.querySelectorAll('.j-login-form')
      .forEach(block => {
        const validationForm = new ValidationForm(block as HTMLFormElement)
        validationForm.init()
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
  }
}

new Index()
