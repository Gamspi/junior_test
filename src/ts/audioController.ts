import { ERROR_MASSAGES } from './constants/constants'
import { ClassEnums } from './utils/enums/classEnums'
import { TimeConverter } from './utils/helpers/timeConverter'

export class AudioController {
  private readonly track: HTMLAudioElement | null
  private readonly playBtn: HTMLButtonElement | null
  private readonly $time: HTMLDivElement | null
  private currentTime = '0:00'

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
          this.playBtn?.classList.remove(ClassEnums.PLAY)
        } else {
          this.track?.play().then(() => {
            this.playBtn?.classList.add(ClassEnums.PLAY)
          }).catch(() => console.log(ERROR_MASSAGES))
        }
      }
    }
    if (this.track) {
      this.track.ontimeupdate = () => {
        this.currentTime = TimeConverter.convert(Math.floor(this.track!.currentTime))
        if (this.$time) this.$time.innerText = this.currentTime
      }
      this.track.onended = () => {
        this.playBtn?.classList.remove(ClassEnums.PLAY)
      }
    }
  }
}
