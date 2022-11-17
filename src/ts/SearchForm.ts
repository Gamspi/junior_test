import { Xhr } from './api/Xhr/Xhr'
import { MyRequest } from './types/types'

export class SearchForm {
  private readonly input: HTMLInputElement | null;
  private value = '';

  constructor (private form: HTMLFormElement) {
    this.input = form.querySelector('.j-search-input')
  }

  init () {
    if (this.input) {
      this.input.oninput = () => {
        this.value = this.input?.value || ''
      }
    }
    this.form.onsubmit = e => {
      e.preventDefault()
      if (this.input) this.input.disabled = true
      Xhr.Post<MyRequest<string>>('http://localhost:5000/api/search/word', {
        value: this.value
      }).then(({ data }) => {
        console.log(data)
        alert(data)
      }).catch(e => {
        console.error('Непредвиденная ошибка', e)
      }).finally(() => {
        if (this.input) {
          this.input.value = this.value = ''
          this.input.disabled = false
        }
      })
    }
  }
}
