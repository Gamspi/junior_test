import { Xhr } from './api/Xhr/Xhr'
import { SoundItemGeneration } from './soundItemGeneration'
import { MusicTrack, MyRequest } from './types/types'

export class ChooseGenre extends SoundItemGeneration {
  // eslint-disable-next-line no-undef
  private tabs: NodeListOf<HTMLElement>;
  constructor (container: HTMLElement) {
    super(container)
    this.tabs = container.querySelectorAll('.j-sound-tab')
    this.toggleActive = this.toggleActive.bind(this)
    this.GetGenre = this.GetGenre.bind(this)
  }

  init () {
    this.GetGenre('all')
    this.toggleActive(this.tabs[0])
    this.tabs.forEach(tab => {
      tab.onclick = e => {
        const target = e.target as HTMLElement
        const id = target.dataset.id
        this.toggleActive(target)
        if (id) {
          this.GetGenre(id)
        }
      }
    })
  }

  GetGenre (id?:string) {
    Xhr.Get<MyRequest<MusicTrack[]>>('http://localhost:5000/api/genre', {
      id
    }).then(({ data }) => {
      if (this.list) this.list.innerHTML = ''
      data.forEach(item => this.itemGeneration(item))
      this.itemInit()
    })
  }

  toggleActive (target: HTMLElement | undefined) {
    this.tabs.forEach(elem => elem === target ? elem.classList.add('_active') : elem.classList.remove('_active'))
  }
}
