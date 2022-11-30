import { BodyBlock } from './bodyBlock'
import { LOG_OUT, LOGIN } from './constants/constants'
import { ClassEnums } from './utils/enums/classEnums'
import { StorageItemEnums } from './utils/enums/storageItemEnums'
import { CookeHelper } from './utils/helpers/cookeHelper'

export class LoginOpen {
  private openButtons: NodeListOf<HTMLButtonElement>
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
    this.isAuth = !!sessionStorage.getItem(StorageItemEnums.AUTH)
    this.userCookie = CookeHelper.getCookie(StorageItemEnums.AUTH)
  }

  init () {
    if (this.userCookie) {
      sessionStorage.setItem(StorageItemEnums.AUTH, this.userCookie)
      this.isAuth = !!sessionStorage.getItem(StorageItemEnums.AUTH)
    }
    this.openButtons.forEach(btn => {
      if (this.isAuth) btn.innerHTML = LOG_OUT
      btn.onclick = () => {
        if (this.menu) this.menu.classList.remove(ClassEnums.OPEN)
        if (this.burger) this.burger.classList.remove(ClassEnums.ACTIVE)
        this.isAuth = !!sessionStorage.getItem(StorageItemEnums.AUTH)
        if (!this.isAuth) {
          this.container.classList.add(ClassEnums.OPEN)
          BodyBlock.block()
        } else {
          CookeHelper.deleteCookie(StorageItemEnums.AUTH)
          sessionStorage.removeItem(StorageItemEnums.AUTH)
          btn.innerHTML = LOGIN
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

  handelCloseForm = () => {
    this.container.classList.remove(ClassEnums.OPEN)
    BodyBlock.unBlock()
  }
}
