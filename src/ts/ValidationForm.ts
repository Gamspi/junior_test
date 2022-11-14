export class ValidationForm {
  private noValidArr: HTMLInputElement[] | undefined
  // eslint-disable-next-line no-undef
  private inputs: NodeListOf<HTMLInputElement>

  constructor (private form: HTMLFormElement) {
    this.inputs = this.form.querySelectorAll('input')
  }

  init () {
    this.form.onsubmit = e => {
      e.preventDefault()
      this.noValidArr = Array.from(this.inputs).filter(input => !input.validity.valid)
      if (this.noValidArr && this.noValidArr.length) {
        this.form.querySelectorAll('input').forEach(input => {
          if (input.validity.valid) {
            input.parentElement?.classList.remove('_error')
          } else {
            if (input.parentElement && input.parentElement.parentElement) {
              input.parentElement.parentElement.classList.add('_error')
            }
            input.oninput = () => {
              if (input.validity.valid && input.parentElement && input.parentElement.parentElement) {
                input.parentElement.parentElement.classList.remove('_error')
              }
            }
          }
        })
      } else {
        console.log('submit')
      }
    }
  }
}
