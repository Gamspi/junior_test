import { BodyBlock } from './BodyBlock'
import { ClassesEnums } from './utils/enums/classEnums'
import { CookeHelper } from './utils/helpers/CookeHelper'

export class LoginOpen {
  // eslint-disable-next-line no-undef
  private openButtons: NodeListOf<HTMLButtonElement>
  // eslint-disable-next-line no-undef
  private closeButtons: NodeListOf<HTMLButtonElement>
  private isAuth: boolean;
  private readonly userCookie: ReturnType<typeof CookeHelper.getCookie>;
  private menu: HTMLElement | null;
  private burger: HTMLElement | null;

  constructor (private container: HTMLDivElement) {
    this.openButtons = document.querySelectorAll('.j-login-form-btn-open')
    this.closeButtons = document.querySelectorAll('.j-login-form-btn-close')
    this.menu = document.querySelector('.j-mobile-menu')
    this.burger = document.querySelector('.j-burger')
    this.isAuth = !!sessionStorage.getItem('auth')
    this.userCookie = CookeHelper.getCookie('user')
    this.handelCloseForm = this.handelCloseForm.bind(this)
  }

  init () {
    if (this.userCookie) {
      sessionStorage.setItem('auth', this.userCookie)
      this.isAuth = !!sessionStorage.getItem('auth')
    }
    this.openButtons.forEach(btn => {
      if (this.isAuth) btn.innerHTML = 'Log out'
      btn.onclick = () => {
        if (this.menu) this.menu.classList.remove(ClassesEnums.OPEN)
        if (this.burger) this.burger.classList.remove('_active')
        this.isAuth = !!sessionStorage.getItem('auth')
        if (!this.isAuth) {
          this.container.classList.add(ClassesEnums.OPEN)
          BodyBlock.block()
        } else {
          CookeHelper.deleteCookie('user')
          sessionStorage.removeItem('auth')
          btn.innerHTML = 'Login'
        }
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
    this.container.classList.remove(ClassesEnums.OPEN)
    BodyBlock.unBlock()
  }
}
