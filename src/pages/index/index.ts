import './index.scss'
import { AudioController } from '../../ts/audioController'
import { ButtonClick } from '../../ts/buttonClick'
import { ChooseGenre } from '../../ts/chooseGenre'
import { PasswordInput } from '../../ts/passwordInput'
import { SearchForm } from '../../ts/searchForm'
import CardSwiper from '../../ts/swiper'
import { OpenMobileMenu } from '../../ts/openMobileMenu'
import { LoginOpen } from '../../ts/loginOpen'
import { ValidationLoginForm } from '../../ts/validationLoginForm'
import { FilterController } from '../../ts/filterController'
import SliderInput from '../../ts/sliderInput'
import CustomSelect from '../../ts/customSelect'

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
    document.querySelectorAll('.j-login-form')
      .forEach(block => {
        const validationForm = new ValidationLoginForm(block as HTMLFormElement)
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
    document.querySelectorAll('.j-sounds-list')
      .forEach(block => {
        const chooseGenre = new ChooseGenre(block as HTMLDivElement)
        chooseGenre.init()
      })
    document.querySelectorAll('.j-password')
      .forEach(block => {
        const passwordInput = new PasswordInput(block as HTMLDivElement)
        passwordInput.init()
      })
    document.querySelectorAll('.j-search')
      .forEach(block => {
        const searchForm = new SearchForm(block as HTMLFormElement)
        searchForm.init()
      })
    document.querySelectorAll('.j-audio')
      .forEach(block => {
        const audioController = new AudioController(block as HTMLDivElement)
        audioController.init()
      })
  }
}

new Index()
