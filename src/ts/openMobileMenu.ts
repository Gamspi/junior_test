import { BodyBlock } from './bodyBlock'
import { ClassEnums } from './utils/enums/classEnums'

export class OpenMobileMenu {
  private burger: HTMLButtonElement | null
  private menu: HTMLElement | null

  constructor (private container: HTMLDivElement) {
    this.menu = container.querySelector('.j-mobile-menu')
    this.burger = container.querySelector('.j-burger')
  }

  init () {
    if (this.burger) {
      this.burger.onclick = () => {
        if (this.menu) {
          this.menu.classList.toggle(ClassEnums.OPEN)
          if (this.menu.classList.contains(ClassEnums.OPEN)) {
            BodyBlock.block()
            this.burger?.classList.add(ClassEnums.ACTIVE)
          } else {
            BodyBlock.unBlock()
            this.burger?.classList.remove(ClassEnums.ACTIVE)
          }
        }
      }
    }
  }
}
