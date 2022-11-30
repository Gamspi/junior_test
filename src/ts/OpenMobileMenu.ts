import { BodyBlock } from './BodyBlock'
import { ClassesEnums } from './utils/enums/classEnums'

export class OpenMobileMenu {
  private burger: HTMLButtonElement | null
  private menu: Element | null

  constructor (private container: HTMLDivElement) {
    this.menu = container.querySelector('.j-mobile-menu')
    this.burger = container.querySelector('.j-burger')
  }

  init () {
    if (this.burger) {
      this.burger.onclick = () => {
        if (this.menu) {
          this.menu.classList.toggle(ClassesEnums.OPEN)
          if (this.menu.classList.contains(ClassesEnums.OPEN)) {
            BodyBlock.block()
            this.burger?.classList.add(ClassesEnums.ACTIVE)
          } else {
            BodyBlock.unBlock()
            this.burger?.classList.remove(ClassesEnums.ACTIVE)
          }
        }
      }
    }
  }
}
