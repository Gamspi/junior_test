import { Xhr } from './api/xhr/xhr'
import { API_URL, ERROR_MASSAGES } from './constants/constants'
import { SoundItemGeneration } from './soundItemGeneration'
import { MusicTrack, MyRequest } from './types/types'
import { ClassEnums } from './utils/enums/classEnums'

export class ChooseGenre extends SoundItemGeneration {
  private readonly tabs: NodeListOf<HTMLElement>;
  constructor (container: HTMLElement) {
    super(container)
    this.tabs = container.querySelectorAll('.j-sound-tab')
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

  GetGenre = (id?:string, finallyFunc?: ()=>void) => {
    Xhr.Get<MyRequest<MusicTrack[]>>(`${API_URL}/genre`, {
      id
    }).then(({ data }) => {
      if (this.list) this.list.innerHTML = ''
      this.itemGeneration(data)
      this.itemInit()
    }).catch((e) => {
      console.error(ERROR_MASSAGES, e)
    }).finally(() => {
      if (finallyFunc) finallyFunc()
    })
  }

  toggleActive = (target: HTMLElement | undefined) => {
    this.tabs.forEach(elem => elem === target ? elem.classList.add(ClassEnums.ACTIVE) : elem.classList.remove(ClassEnums.ACTIVE))
  }
}
