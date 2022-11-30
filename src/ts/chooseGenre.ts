import { Xhr } from './api/xhr/xhr'
import { SoundItemGeneration } from './soundItemGeneration'
import { MusicTrack, MyRequest } from './types/types'
import { ClassesEnums } from './utils/enums/classEnums'

export class ChooseGenre extends SoundItemGeneration {
  private readonly tabs: NodeListOf<HTMLElement>;
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
        const target = e.target as HTMLButtonElement
        target.disabled = true
        const id = target.dataset.id
        this.toggleActive(target)
        if (id) {
          this.GetGenre(id, () => { target.disabled = false })
        }
      }
    })
  }

  GetGenre (id?:string, finallyFunc?: ()=>void) {
    Xhr.Get<MyRequest<MusicTrack[]>>('http://localhost:5000/api/genre', {
      id
    }).then(({ data }) => {
      if (this.list) this.list.innerHTML = ''
      data.forEach(item => this.itemGeneration(item))
      this.itemInit()
    }).catch((e) => {
      console.error('Не предвиденная ошибка', e)
    }).finally(() => {
      if (finallyFunc) finallyFunc()
    })
  }

  toggleActive (target: HTMLElement | undefined) {
    this.tabs.forEach(elem => elem === target ? elem.classList.add(ClassesEnums.ACTIVE) : elem.classList.remove(ClassesEnums.ACTIVE))
  }
}
