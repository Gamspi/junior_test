class CalcSelect {
  // eslint-disable-next-line no-undef
  private potions: NodeListOf<HTMLElement> | undefined
  private input: HTMLInputElement | null
  private body: HTMLElement | null
  private btn: HTMLButtonElement | null

  private isOpen = false

  constructor (private container: HTMLElement, private func?: () => void) {
    this.btn = container.querySelector('.j-select-btn')
    this.potions = container.querySelectorAll('.j-select-option')
    this.input = container.querySelector('.j-select-input')
    this.body = container.querySelector('.j-select-body')
  }

  init () {
    this.ListenerBody = this.ListenerBody.bind(this)

    if (this.btn) {
      this.btn.onclick = () => {
        if (this.isOpen) {
          document.body.removeEventListener('click', this.ListenerBody)
          this.container.classList.remove('_open')
          this.isOpen = false
        } else {
          document.body.addEventListener('click', this.ListenerBody)
          this.container.classList.add('_open')
          this.isOpen = true
        }
      }
    }
    if (this.potions) {
      this.potions.forEach(elem => {
        if (this.input) {
          elem.onclick = () => {
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
    if (!target.closest('.j-select-btn')) {
      this.container.classList.remove('_open')
      document.body.removeEventListener('click', this.ListenerBody)
      this.isOpen = false
    }
  }
}

export default CalcSelect
