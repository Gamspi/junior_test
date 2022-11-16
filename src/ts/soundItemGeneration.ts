import { AudioController } from './AudioController'
import { LikeController } from './LikeController'
import { MusicTrack } from './types/types'

export class SoundItemGeneration {
  list: HTMLElement | null;

  constructor (private container: HTMLElement) {
    this.list = container.querySelector('.j-sound-list')
    this.itemInit = this.itemInit.bind(this)
  }

  itemGeneration ({ src, name, description, genres, isLike, id }: MusicTrack) {
    if (this.list) {
      const element = document.createElement('li')
      element.classList.add('sounds-block__item')
      element.innerHTML = `
                        <div class="sound-item j-audio">
                          <audio class="j-audio-track" src="${src}"></audio>
                          <div class="sound-item__btn-play">
                            <button class="play-button j-audio-play j-button-click">
                                          <svg class="play-button__play-icon">
                                            <use xlink:href="#ico-play"></use>
                                          </svg>
                                          <svg class="play-button__pause-icon">
                                            <use xlink:href="#ico-pause"></use>
                                          </svg>
                            </button>
                          </div>
                          <div class="sound-item__info sound-info">
                            <div class="sound-info__main">
                              <div class="sound-info__name">${name}</div>
                              <div class="sound-info__time j-audio-time">0:00</div>
                            </div>
                            <p class="sound-info__description">${description}</p>
                            <div class="sound-info__genres-list">
                            ${genres.map(genre => `<span class="sound-info__genre">${genre}</span>`).join(', ')}
                            </div>
                          </div>
                          <div class="sound-item__actions">
                            <div class="sound-item__btn-like">
                              <div class="like-button">
                                <input class="like-button__input j-like-btn" type="checkbox" ${isLike ? 'checked' : ''} data-id='${id}'>
                                <div class="like-button__icon">
                                              <svg>
                                                <use xlink:href="#ico-like"></use>
                                              </svg>
                                </div>
                              </div>
                            </div><a class="sound-item__btn-download"  href="${src}" download>
                                          <svg>
                                            <use xlink:href="#ico-download"></use>
                                          </svg></a><a class="sound-item__btn-more" href="#">
                                          <svg>
                                            <use xlink:href="#ico-more"></use>
                                          </svg></a>
                          </div>
                        </div>
              `
      this.list.append(element)
    }
  }

  itemInit () {
    document.querySelectorAll('.j-audio')
      .forEach(block => {
        const audioController = new AudioController(block as HTMLDivElement)
        audioController.init()
      })
    document.querySelectorAll('.j-like-btn')
      .forEach(block => {
        const likeController = new LikeController(block as HTMLInputElement)
        likeController.init()
      })
  }
}
