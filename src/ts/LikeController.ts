import { Xhr } from './api/Xhr/Xhr'
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
      Xhr.Post<MyRequest<MusicTrack>>('http://localhost:5000/api/like/like', {
        id: this.id,
        user: this.userId
      }).then(({ data }) => {
        target.checked = this.defaultChecked = data.isLike
      })
    }
  }
}
