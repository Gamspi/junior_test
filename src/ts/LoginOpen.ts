import { BodyBlock } from './BodyBlock'

export class LoginOpen {
  // eslint-disable-next-line no-undef
  private openButtons: NodeListOf<HTMLButtonElement>
  // eslint-disable-next-line no-undef
  private closeButtons: NodeListOf<HTMLButtonElement>

  constructor (private container: HTMLDivElement) {
    this.openButtons = document.querySelectorAll('.j-login-form-btn-open')
    this.closeButtons = document.querySelectorAll('.j-login-form-btn-close')
  }

  init () {
    this.handelCloseForm = this.handelCloseForm.bind(this)
    this.openButtons.forEach(btn => {
      btn.onclick = () => {
        this.container.classList.add('_open')
        BodyBlock.block()
      }
    })
    this.closeButtons.forEach(btn => {
      btn.onclick = this.handelCloseForm
    })
    this.container.onclick = e => {
      const target = e.target as HTMLElement
      if (!target.closest('.j-login-body')) {
        this.handelCloseForm()
      }
    }
  }

  handelCloseForm () {
    this.container.classList.remove('_open')
    BodyBlock.unBlock()
  }
}
