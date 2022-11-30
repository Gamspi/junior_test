import { FilterForm } from './filterForm'
import { ClassEnums } from './utils/enums/classEnums'
import { EventEnums } from './utils/enums/eventEnums'

export class FilterController {
  private readonly modal: HTMLFormElement | null
  private readonly closeBtn: HTMLButtonElement | null
  private readonly openBtn: HTMLButtonElement | null

  constructor (private container: HTMLDivElement) {
    this.modal = container.querySelector('.j-filter-modal')
    this.closeBtn = container.querySelector('.j-filter-close')
    this.openBtn = container.querySelector('.j-filter-open')
  }

  init () {
    if (this.closeBtn) {
      this.closeBtn.onclick = () => {
        this.modal?.classList.remove(ClassEnums.OPEN)
        document.body.removeEventListener(EventEnums.CLICK, this.ListenerBody)
      }
    }
    if (this.openBtn) {
      this.openBtn.onclick = () => {
        this.modal?.classList.add(ClassEnums.OPEN)
        document.body.addEventListener(EventEnums.CLICK, this.ListenerBody)
      }
    }

    if (this.modal) {
      const filterForm = new FilterForm(this.modal)
      filterForm.init()
    }
  }

  ListenerBody = (e: Event) => {
    const target = e.target as HTMLElement
    const isOutModalClick = this.modal && !target.closest('.j-filter')
    if (isOutModalClick) {
      this.modal!.classList.remove(ClassEnums.OPEN)
      document.body.removeEventListener(EventEnums.CLICK, this.ListenerBody)
    }
  }
}
