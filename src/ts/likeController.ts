import { Xhr } from './api/xhr/xhr'
import { MyRequest, MusicTrack } from './types/types'

export class LikeController {
  private id: string;
  private defaultChecked: boolean;
  private userId: string | null;
  constructor (private btn: HTMLInputElement) {
    this.id = this.btn.dataset.id || ''
    this.defaultChecked = this.btn.defaultChecked
    this.userId = sessionStorage.getItem('auth')
  }

  init () {
    this.btn.oninput = e => {
      const target = e.target as HTMLInputElement
      target.checked = this.defaultChecked
      this.btn.disabled = true
      Xhr.Post<MyRequest<MusicTrack>>('http://localhost:5000/api/like/like', {
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
