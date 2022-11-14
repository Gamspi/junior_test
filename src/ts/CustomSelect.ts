import { Breakpoints } from './utils/enums/breakpoints'

class CalcSelect {
  // eslint-disable-next-line no-undef
  private potions: NodeListOf<HTMLElement> | undefined
  private input: HTMLInputElement | null
  private body: HTMLElement | null
  private btn: HTMLButtonElement | null

  private isOpen = false
  private bodyHeight: number = 0
  private screenWidth: number = 0
  private rem: number = 0
  private bodyDefaultHeight: number = 0

  constructor (private container: HTMLElement, private func?: () => void) {
    this.btn = container.querySelector('.j-select-btn')
    this.potions = container.querySelectorAll('.j-select-option')
    this.input = container.querySelector('.j-select-input')
    this.body = container.querySelector('.j-select-body')
  }

  init () {
    this.ListenerBody = this.ListenerBody.bind(this)
    this.checkRem = this.checkRem.bind(this)
    this.convertToRem = this.convertToRem.bind(this)

    if (this.btn) {
      this.btn.onclick = () => {
        this.checkRem()
        console.log(this.isOpen)
        if (this.isOpen) {
          if (this.body) {
            this.body.style.maxHeight = ''
          }
          document.body.removeEventListener('click', this.ListenerBody)
          this.isOpen = false
        } else {
          if (this.body) this.body.style.maxHeight = this.convertToRem(this.bodyHeight) + 'rem'
          document.body.addEventListener('click', this.ListenerBody)
          this.isOpen = true
        }
      }
    }
    if (this.potions) {
      this.potions.forEach(elem => {
        if (this.input) {
          elem.onclick = () => {
            if (this.body) this.body.style.maxHeight = ''
            this.input!.value = elem.dataset.value || ''
            this.container.classList.remove('_open')
            if (this.func) this.func()
          }
        }
      })
    }
  }

  ListenerBody (e: Event) {
    const target = e.target as HTMLElement
    console.log('body')
    if (!target.closest('.j-select-btn')) {
      if (this.body) this.body.style.maxHeight = ''
      this.container.classList.remove('_open')
      document.body.removeEventListener('click', this.ListenerBody)
      this.isOpen = false
    }
  }

  checkRem () {
    if (this.body) {
      this.bodyHeight = this.body.scrollHeight
      this.bodyDefaultHeight = this.body.offsetHeight
    }
    this.screenWidth = window.screen.width
    if (this.screenWidth >= Breakpoints.WIDE_DESKTOP) {
      this.rem = this.screenWidth / Breakpoints.WIDE_DESKTOP
    } else if (this.screenWidth >= Breakpoints.DESKTOP) {
      this.rem = this.screenWidth / Breakpoints.WIDE_DESKTOP
    } else if (this.screenWidth >= Breakpoints.TABLET) {
      this.rem = this.screenWidth / Breakpoints.TABLET
    } else {
      this.rem = this.screenWidth / Breakpoints.MOBILE
    }
  }

  convertToRem (num: number) {
    return Math.round(num / this.rem) / 10
  }
}

export default CalcSelect