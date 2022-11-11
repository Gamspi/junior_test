import { BodyBlock } from './BodyBlock'

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
          this.menu.classList.toggle('_open')
          if (this.menu.classList.contains('_open')) {
            BodyBlock.block()
          } else {
            BodyBlock.unBlock()
          }
        }
      }
    }
  }
}
