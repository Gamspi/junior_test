import { FilterForm } from './filterForm'
import { ClassesEnums } from './utils/enums/classEnums'
import { EventEnums } from './utils/enums/eventEnums'

export class FilterController {
  private modal: HTMLFormElement | null
  private closeBtn: HTMLButtonElement | null
  private openBtn: HTMLButtonElement | null

  constructor (private container: HTMLDivElement) {
    this.modal = container.querySelector('.j-filter-modal')
    this.closeBtn = container.querySelector('.j-filter-close')
    this.openBtn = container.querySelector('.j-filter-open')
    this.ListenerBody = this.ListenerBody.bind(this)
  }

  init () {
    if (this.closeBtn) {
      this.closeBtn.onclick = () => {
        this.modal?.classList.remove(ClassesEnums.OPEN)
        document.body.removeEventListener(EventEnums.CLICK, this.ListenerBody)
      }
    }
    if (this.openBtn) {
      this.openBtn.onclick = () => {
        this.modal?.classList.add(ClassesEnums.OPEN)
        document.body.addEventListener(EventEnums.CLICK, this.ListenerBody)
      }
    }

    if (this.modal) {
      const filterForm = new FilterForm(this.modal)
      filterForm.init()
    }
  }

  ListenerBody (e: Event) {
    const target = e.target as HTMLElement
    if (this.modal && !target.closest('.j-filter')) {
      this.modal.classList.remove(ClassesEnums.OPEN)
      document.body.removeEventListener(EventEnums.CLICK, this.ListenerBody)
    }
  }
}
