export class PasswordInput {
  private input: HTMLInputElement | null;
  private mockInput: HTMLInputElement | null;
  constructor (private container: HTMLElement) {
    this.input = container.querySelector('.j-password-input')
    this.mockInput = container.querySelector('.j-password-mock')
  }

  init () {
    console.log(this.input)
    console.log(this.mockInput)
    if (this.input && this.mockInput) {
      this.input.oninput = e => {
        const target = e.target as HTMLInputElement
        this.mockInput!.value = target.value
      }
    }
  }
}
