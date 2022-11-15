import { FormLogin } from './FormLogin'

export class ValidationLoginForm extends FormLogin {
  private noValidArr: HTMLInputElement[] | undefined
  // eslint-disable-next-line no-undef
  private inputs: NodeListOf<HTMLInputElement>
  private errorBlock: HTMLElement | null;

  constructor (form: HTMLFormElement) {
    super(form)
    this.inputs = form.querySelectorAll('input')
    this.errorBlock = form.querySelector('.j-login-error')
  }

  init () {
    this.form.onsubmit = e => {
      e.preventDefault()
      if (this.errorBlock) this.errorBlock.classList.remove('_visible')

      this.noValidArr = Array.from(this.inputs).filter(input => !input.validity.valid)
      if (this.noValidArr && this.noValidArr.length) {
        this.form.querySelectorAll('input').forEach(input => {
          if (input.validity.valid) {
            input.parentElement?.classList.remove('_error')
          } else {
            this.addError(input)
            input.oninput = () => {
              if (input.validity.valid && input.parentElement && input.parentElement.parentElement) {
                input.parentElement.parentElement.classList.remove('_error')
              }
            }
          }
        })
      } else {
        console.log('submit')
        super.submit(undefined, this.handelError.bind(this))
      }
    }
  }

  handelError () {
    this.inputs.forEach(input => {
      this.addError(input)
    })
    if (this.errorBlock) this.errorBlock.classList.add('_visible')
  }

  addError (target: HTMLElement) {
    if (target.parentElement && target.parentElement.parentElement) {
      target.parentElement.parentElement.classList.add('_error')
    }
  }
}
