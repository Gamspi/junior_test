import { ClassEnums } from './utils/enums/classEnums'
import { EventEnums } from './utils/enums/eventEnums'

export class ButtonClick {
  private timeout: ReturnType<typeof setTimeout> | undefined

  constructor (private button: HTMLButtonElement) {
  }

  init () {
    this.button.addEventListener(EventEnums.CLICK, this.handelClick)
  }

  handelClick = () => {
    if (this.timeout) clearTimeout(this.timeout)
    this.button.classList.add(ClassEnums.CLICK)
    this.timeout = setTimeout(() => {
      this.button.classList.remove(ClassEnums.CLICK)
    }, 200)
  }
}
