import { ButtonClick } from './buttonClick'
import { AudioController } from './audioController'
import { ClassEnums } from './utils/enums/classEnums'

export class AudioObserver {
  private height = 0

  constructor (private container: HTMLElement) {
  }

  init () {
    this.changeParentHeight()
    const observer = new MutationObserver(this.observerCallback)
    observer.observe(this.container, {
      childList: true
    })
  }

  changeParentHeight = () => {
    this.container.parentElement!.style.height = this.container.offsetHeight / 10 + 'rem'
  }

  observerCallback: MutationCallback = () => {
    this.changeParentHeight()
    setTimeout(() => {
      for (let i = 0; i < this.container.children.length; i++) {
        const target = this.container.children[i]
        setTimeout(() => {
          target.classList.add(ClassEnums.VISIBLE)
        }, 50 * i)
      }
    }, 200)

    this.container.querySelectorAll('.j-button-click')
      .forEach(block => {
        const buttonClick = new ButtonClick(block as HTMLButtonElement)
        buttonClick.init()
      })
    this.container.querySelectorAll('.j-audio')
      .forEach(block => {
        const audioController = new AudioController(block as HTMLDivElement)
        audioController.init()
      })
  }
}
