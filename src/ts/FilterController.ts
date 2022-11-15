export class FilterController {
  private modal: HTMLDivElement | null
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
        this.modal?.classList.remove('_open')
        document.body.removeEventListener('click', this.ListenerBody)
      }
    }
    if (this.openBtn) {
      this.openBtn.onclick = () => {
        this.modal?.classList.add('_open')
        document.body.addEventListener('click', this.ListenerBody)
      }
    }
  }

  ListenerBody (e: Event) {
    const target = e.target as HTMLElement
    if (this.modal && !target.closest('.j-filter')) {
      this.modal.classList.remove('_open')
      document.body.removeEventListener('click', this.ListenerBody)
    }
  }
}
