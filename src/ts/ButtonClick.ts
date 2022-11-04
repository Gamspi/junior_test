export class ButtonClick {
  private timeout: ReturnType<typeof setTimeout> | undefined

  // eslint-disable-next-line no-useless-constructor
  constructor (private button: HTMLButtonElement) {
  }

  init () {
    this.handelClick = this.handelClick.bind(this)
    this.button.addEventListener('click', this.handelClick)
  }

  handelClick () {
    if (this.timeout) clearTimeout(this.timeout)
    this.button.classList.add('_click')
    this.timeout = setTimeout(() => {
      this.button.classList.remove('_click')
    }, 200)
  }
}
