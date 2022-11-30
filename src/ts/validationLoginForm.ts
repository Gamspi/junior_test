import { FormLogin } from './formLogin'
import { ClassesEnums } from './utils/enums/classEnums'

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
      input.classList.remove(ClassesEnums.ERROR)
    }
    input.onblur = () => {
      if (!input.validity.valid) input.classList.add(ClassesEnums.ERROR)
    }
  })
  this.form.onsubmit = e => {
    e.preventDefault()
    if (this.errorBlock) this.errorBlock.classList.remove(ClassesEnums.VISIBLE)

    this.noValidArr = Array.from(this.inputs).filter(input => !input.validity.valid)
    if (this.noValidArr && this.noValidArr.length) {
      this.form.querySelectorAll('input').forEach(input => {
        if (input.validity.valid) {
          input.classList.remove(ClassesEnums.ERROR)
        } else {
          this.addError(input)
        }
      })
    } else {
      console.log('submit')
      super.logInSubmit(undefined, this.handelError.bind(this))
      this.inputs.forEach(input => {
        input.classList.remove(ClassesEnums.ERROR)
      })
    }
  }
}

handelError (message: string) {
  this.inputs.forEach(input => {
    this.addError(input)
  })
  if (this.errorBlock) {
    this.errorBlock.innerHTML = message
    this.errorBlock.classList.add(ClassesEnums.VISIBLE)
  }
}

addError (target: HTMLElement) {
  if (target) {
    target.classList.add(ClassesEnums.ERROR)
  }
}
}
