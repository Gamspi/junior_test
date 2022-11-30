import { Xhr } from './api/xhr/xhr'
import { API_URL } from './constants/constants'
import { MyRequest, MusicTrack } from './types/types'
import { StorageItemEnums } from './utils/enums/storageItemEnums'

export class LikeController {
  private id: string;
  private defaultChecked: boolean;
  private userId: string | null;
  constructor (private btn: HTMLInputElement) {
    this.id = this.btn.dataset.id || ''
    this.defaultChecked = this.btn.defaultChecked
    this.userId = sessionStorage.getItem(StorageItemEnums.AUTH)
  }

  init () {
    this.btn.oninput = e => {
      const target = e.target as HTMLInputElement
      target.checked = this.defaultChecked
      this.btn.disabled = true
      Xhr.Post<MyRequest<MusicTrack>>(`${API_URL}/like/like`, {
        id: this.id,
        user: this.userId
      }).then((response) => {
        if (response) {
          const data = response.data
          if (data) {
            target.checked = this.defaultChecked = data.isLike
          }
        }
      }).catch(e => console.error(e)).finally(() => {
        this.btn.disabled = false
      })
    }
  }
}
