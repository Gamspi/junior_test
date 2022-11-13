export class FilterController {
  private modal: HTMLDivElement | null
  private closeBtn: HTMLButtonElement | null
  private openBtn: HTMLButtonElement | null

  constructor (private container: HTMLDivElement) {
    this.modal = container.querySelector('.j-filter-modal')
    this.closeBtn = container.querySelector('.j-filter-close')
    this.openBtn = container.querySelector('.j-filter-open')
  }

  init () {
    if (this.closeBtn) {
      this.closeBtn.onclick = () => {
        this.modal?.classList.remove('_open')
      }
    }
    if (this.openBtn) {
      this.openBtn.onclick = () => {
        this.modal?.classList.add('_open')
      }
    }
  }
}
