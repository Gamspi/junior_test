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
  this.inputs.forEach(input => {
    input.onfocus = () => {
      input.classList.remove('_error')
    }
    input.onblur = () => {
      if (!input.validity.valid) input.classList.add('_error')
    }
  })
  this.form.onsubmit = e => {
    e.preventDefault()
    if (this.errorBlock) this.errorBlock.classList.remove('_visible')

    this.noValidArr = Array.from(this.inputs).filter(input => !input.validity.valid)
    if (this.noValidArr && this.noValidArr.length) {
      this.form.querySelectorAll('input').forEach(input => {
        if (input.validity.valid) {
          input.classList.remove('_error')
        } else {
          this.addError(input)
        }
      })
    } else {
      console.log('submit')
      super.logInSubmit(undefined, this.handelError.bind(this))
    }
  }
}

handelError (message: string) {
  this.inputs.forEach(input => {
    this.addError(input)
  })
  if (this.errorBlock) {
    this.errorBlock.innerHTML = message
    this.errorBlock.classList.add('_visible')
  }
}

addError (target: HTMLElement) {
  if (target) {
    target.classList.add('_error')
  }
}
}
