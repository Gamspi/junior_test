import { Xhr } from './api/Xhr/Xhr'
import { AudioController } from './AudioController'
import { MusicTrack } from './types'

export class ChooseGenre {
  private list: HTMLElement | null;
  // eslint-disable-next-line no-undef
  private tabs: NodeListOf<HTMLElement>;
  constructor (private container: HTMLElement) {
    this.list = container.querySelector('.j-sound-list')
    this.tabs = container.querySelectorAll('.j-sound-tab')
    this.toggleActive = this.toggleActive.bind(this)
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
    Xhr.Get<MusicTrack[]>('http://localhost:5000/api/genre', {
      id
    }).then((data) => {
      if (this.list) this.list.innerHTML = ''
      data.forEach(item => this.itemGeneration(item))
      document.querySelectorAll('.j-audio')
        .forEach(block => {
          const audioController = new AudioController(block as HTMLDivElement)
          audioController.init()
        })
    })
  }

  toggleActive (target: HTMLElement | undefined) {
    this.tabs.forEach(elem => elem === target ? elem.classList.add('_active') : elem.classList.remove('_active'))
  }

  itemGeneration ({ src, name, description, genres, isLike }: MusicTrack) {
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
                            ${genres.map(genre => `<span class="sound-info__genre">${genre}</span>`)}
                            </div>
                          </div>
                          <div class="sound-item__actions">
                            <div class="sound-item__btn-like">
                              <div class="like-button">
                                <input class="like-button__input" type="checkbox" checked=${isLike}>
                                <div class="like-button__icon">
                                              <svg>
                                                <use xlink:href="#ico-like"></use>
                                              </svg>
                                </div>
                              </div>
                            </div><a class="sound-item__btn-download" target="_blank" href="${src}" download="audio">
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
}
