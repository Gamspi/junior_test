import { SUBMIT_MASSAGES } from './constants/constants'
import { FormLogin } from './formLogin'
import { ClassEnums } from './utils/enums/classEnums'

export class ValidationLoginForm extends FormLogin {
  private noValidArr: HTMLInputElement[] | undefined
  private inputs: NodeListOf<HTMLInputElement>
  private readonly errorBlock: HTMLElement | null;

  constructor (form: HTMLFormElement) {
    super(form)
    this.inputs = form.querySelectorAll('input')
    this.errorBlock = form.querySelector('.j-login-error')
  }

  init () {
    this.inputs.forEach(input => {
      input.onfocus = () => input.classList.remove(ClassEnums.ERROR)

      input.onblur = () => {
        if (!input.validity.valid) input.classList.add(ClassEnums.ERROR)
      }
    })
    this.form.onsubmit = e => {
      e.preventDefault()
      if (this.errorBlock) this.errorBlock.classList.remove(ClassEnums.VISIBLE)

      this.noValidArr = Array.from(this.inputs).filter(input => !input.validity.valid)
      if (this.noValidArr.length) {
        this.form.querySelectorAll('input').forEach(input => {
          if (input.validity.valid) {
            input.classList.remove(ClassEnums.ERROR)
          } else {
            this.addError(input)
          }
        })
      } else {
        console.log(SUBMIT_MASSAGES)
        super.logInSubmit(undefined, this.handelError)
        this.inputs.forEach(input => {
          input.classList.remove(ClassEnums.ERROR)
        })
      }
    }
  }

  handelError = (message: string) => {
    this.inputs.forEach(input => this.addError(input))

    if (this.errorBlock) {
      this.errorBlock.innerHTML = message
      this.errorBlock.classList.add(ClassEnums.VISIBLE)
    }
  }

  addError (target: HTMLElement) {
    if (target) target.classList.add(ClassEnums.ERROR)
  }
}
