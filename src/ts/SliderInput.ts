import { TimeConverter } from './TimeConverter'

class SliderInput {
  private readonly rangeMin: HTMLInputElement | null
  private readonly progress: HTMLDivElement | null
  private readonly rangeMax: HTMLInputElement | null
  private minValue: number = 0
  private maxValue: number = 100
  private defaultMin: number = 0
  private defaultMax: number = 0
  private onePercent: number = 1

  constructor (private container: HTMLElement) {
    this.progress = container.querySelector('.j-progress')
    this.rangeMin = container.querySelector('.j-setting-min')
    this.rangeMax = container.querySelector('.j-setting-max')
  }

  init () {
    if (this.rangeMin && this.rangeMin.dataset.defaultvalue) this.defaultMin = TimeConverter.convertOut(this.rangeMin.dataset.defaultvalue)
    if (this.rangeMax && this.rangeMax.dataset.defaultvalue) this.defaultMax = TimeConverter.convertOut(this.rangeMax.dataset.defaultvalue)
    this.onePercent = this.defaultMax / this.maxValue

    if (this.rangeMin) {
      this.handlerMinProgress(this.rangeMin)
      this.rangeMin.oninput = (e) => {
        this.changeValue()
        const target = e.target as HTMLInputElement
        if (this.minValue - this.maxValue > 0) {
          this.handlerMinProgress(target)
        } else {
          if (this.rangeMax) {
            this.rangeMax.value = target.value
          }
          this.handlerMinProgress(target)
          this.handlerMaxProgress(target)
        }
      }
    }

    if (this.rangeMax) {
      this.handlerMaxProgress(this.rangeMax)
      this.rangeMax.oninput = (e) => {
        this.changeValue()
        const target = e.target as HTMLInputElement
        if (this.minValue - this.maxValue > 0) {
          this.handlerMaxProgress(target)
        } else {
          if (this.rangeMin) {
            this.rangeMin.value = target.value
          }
          this.handlerMinProgress(target)
          this.handlerMaxProgress(target)
        }
      }
    }
  }

  handlerMaxProgress (target: HTMLInputElement) {
    if (this.progress) {
      this.progress.style.right = (+target.max - +target.value) / (+target.max - +target.min) * 100 + '%'
      this.progress.dataset.valuemax = this.changeValueToTime(+target.value)
    }
  }

  handlerMinProgress (target: HTMLInputElement) {
    if (this.progress) {
      this.progress.style.left = (100 - ((+target.max - +target.value) / (+target.max - +target.min)) * 100) + '%'
      this.progress.dataset.valuemin = this.changeValueToTime(+target.value)
    }
  }

  changeValueToTime (value: number) {
    return TimeConverter.convert(Math.floor(this.onePercent * value))
  }

  changeValue (min?: number, max?: number) {
    this.minValue = +(max || this.rangeMax?.value || 0)
    this.maxValue = +(min || this.rangeMin?.value || 0)
  }
}

export default SliderInput
