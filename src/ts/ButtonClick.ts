import { ClassesEnums } from './utils/enums/classEnums'
import { EventEnums } from './utils/enums/eventEnums'

export class ButtonClick {
  private timeout: ReturnType<typeof setTimeout> | undefined

  // eslint-disable-next-line no-useless-constructor
  constructor (private button: HTMLButtonElement) {
  }

  init () {
    this.handelClick = this.handelClick.bind(this)
    this.button.addEventListener(EventEnums.CLICK, this.handelClick)
  }

  handelClick () {
    if (this.timeout) clearTimeout(this.timeout)
    this.button.classList.add(ClassesEnums.CLICK)
    this.timeout = setTimeout(() => {
      this.button.classList.remove(ClassesEnums.CLICK)
    }, 200)
  }
}
