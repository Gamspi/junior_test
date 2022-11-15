import { Xhr } from './api/Xhr/Xhr'
import { BodyBlock } from './BodyBlock'
import { MyRequest, MusicTrack } from './types/types'

export class FormLogin {
  private emailInput: HTMLInputElement | null;
  private passwordInput: HTMLInputElement | null;
  private rememberInput: HTMLInputElement | null;
  // eslint-disable-next-line no-undef
  private loginBtn: NodeListOf<HTMLButtonElement>;

  constructor (public form: HTMLFormElement) {
    this.loginBtn = document.querySelectorAll('.j-login-form-btn-open')
    this.emailInput = this.form.querySelector('.j-login-email')
    this.passwordInput = this.form.querySelector('.j-login-password')
    this.rememberInput = this.form.querySelector('#isRemember')
    this.changeTextIntroBtns = this.changeTextIntroBtns.bind(this)
  }

  submit (resolve?: ()=>void, reject? : ()=>void) {
    const email = this.emailInput?.value || ''
    const password = this.passwordInput?.value || ''
    const remember = this.rememberInput?.checked || false
    if (email && password) {
      Xhr.Post<MyRequest<MusicTrack>>('http://localhost:5000/api/auth/authorization', {
        email,
        password
      }).then(({ data: { id } }) => {
        if (remember) {
          document.cookie = `user=${id}`
        }
        sessionStorage.setItem('auth', `${id}`)
        if (resolve)resolve()
        this.form.classList.remove('_open')
        BodyBlock.unBlock()
        this.changeTextIntroBtns('Log out')
      }).catch((e) => {
        console.log(e)
        if (reject) reject()
      })
    } else {
      throw Error('не предвиденная ошибка')
    }
  }

  changeTextIntroBtns (text: string) {
    this.loginBtn.forEach(btn => {
      btn.innerHTML = text
    })
  }
}
