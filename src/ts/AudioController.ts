import { TimeConverter } from './TimeConverter'

export class AudioController {
  private readonly track: HTMLAudioElement | null
  private readonly playBtn: HTMLButtonElement | null
  private currentTime: string = '0:00'
  private readonly $time: HTMLDivElement | null

  constructor (private container: HTMLDivElement) {
    this.track = container.querySelector('.j-audio-track')
    this.playBtn = container.querySelector('.j-audio-play')
    this.$time = container.querySelector('.j-audio-time')
  }

  init () {
    if (this.$time) this.$time.innerText = this.currentTime
    if (this.playBtn) {
      this.playBtn.onclick = () => {
        if (!this.track?.paused) {
          this.track?.pause()
          this.playBtn?.classList.remove('_play')
        } else {
          this.track?.play().then(() => {
            this.playBtn?.classList.add('_play')
          }).catch(() => console.log('Непредвиденная ошибка'))
        }
      }
    }
    if (this.track) {
      this.track.ontimeupdate = _ => {
        this.currentTime = TimeConverter.convert(Math.floor(this.track!.currentTime))
        if (this.$time) this.$time.innerText = this.currentTime
      }
      this.track.onended = (e) => {
        this.playBtn?.classList.remove('_play')
      }
    }
  }
}
