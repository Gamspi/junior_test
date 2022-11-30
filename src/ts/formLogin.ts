import { Xhr } from './api/xhr/xhr'
import { BodyBlock } from './bodyBlock'
import { API_URL, ERROR_MASSAGES, LOG_OUT } from './constants/constants'
import { MyRequest, MusicTrack, SubmitFormSuccessHandlerType } from './types/types'
import { ClassEnums } from './utils/enums/classEnums'
import { StatusEnums } from './utils/enums/statusEnums'
import { StorageItemEnums } from './utils/enums/storageItemEnums'

export class FormLogin {
  private readonly emailInput: HTMLInputElement | null;
  private readonly passwordInput: HTMLInputElement | null;
  private readonly passwordMockInput: HTMLInputElement | null;
  private readonly rememberInput: HTMLInputElement | null;
  private loginBtn: NodeListOf<HTMLButtonElement>;
  private isSubmit = false

  constructor (public form: HTMLFormElement) {
    this.loginBtn = document.querySelectorAll('.j-login-form-btn-open')
    this.emailInput = this.form.querySelector('.j-login-email')
    this.passwordInput = this.form.querySelector('.j-login-password')
    this.passwordMockInput = this.form.querySelector('.j-password-mock')
    this.rememberInput = this.form.querySelector('#isRemember')
    this.changeTextIntroBtns = this.changeTextIntroBtns.bind(this)
  }

  logInSubmit (resolve?: ()=>void, reject? : (message: string)=>void) {
    if (!this.isSubmit) {
      this.isSubmit = true
      const email = this.emailInput?.value || ''
      const password = this.passwordInput?.value || ''

      if (email && password) {
        Xhr.Post<MyRequest<MusicTrack>>(`${API_URL}/auth/authorization`, {
          email,
          password
        }).then((response) => {
          this.successHandler({ response, reject, resolve })
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.isSubmit = false
        })
      } else {
        throw Error(ERROR_MASSAGES)
      }
    }
  }

  successHandler = ({ response: { data: { id }, status, message }, resolve, reject }:SubmitFormSuccessHandlerType) => {
    const isRemember = this.rememberInput?.checked
    if (status === StatusEnums.SUCCESS) {
      if (isRemember) {
        document.cookie = `user=${id}`
      }
      sessionStorage.setItem(StorageItemEnums.AUTH, `${id}`)
      if (resolve)resolve()
      this.form.classList.remove(ClassEnums.OPEN)
      BodyBlock.unBlock()
      this.changeTextIntroBtns(LOG_OUT)
      this.removeToDefault()
    } else {
      if (reject) reject(message)
    }
  }

  removeToDefault () {
    if (this.emailInput) this.emailInput.value = ''
    if (this.passwordInput) this.passwordInput.value = ''
    if (this.passwordMockInput) this.passwordMockInput.value = ''
    if (this.rememberInput) this.rememberInput.checked = false
  }

  changeTextIntroBtns (text: string) {
    this.loginBtn.forEach(btn => {
      btn.innerHTML = text
    })
  }
}
