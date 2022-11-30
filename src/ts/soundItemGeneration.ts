import { AudioController } from './audioController'
import { ButtonClick } from './buttonClick'
import { DownloadSoundFile } from './downloadSoundFile'
import { LikeController } from './likeController'
import { MusicTrack } from './types/types'
import { ClassEnums } from './utils/enums/classEnums'

export class SoundItemGeneration {
  list: HTMLElement | null;

  constructor (private container: HTMLElement) {
    this.list = container.querySelector('.j-sound-list')
  }

  itemGeneration (items: MusicTrack[]) {
    items.forEach(({ src, name, description, genres, isLike, id }, index) => {
      if (this.list) {
        const element = document.createElement('li')
        element.classList.add('sounds-block__item')
        // при изменении информации в компоненте следует изменить ее и файле src/pages/index/modules/soundsBlock/components/soundItem/soundItem.pug
        element.innerHTML = `
                        <article class="sound-item j-audio">
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
                            </div><button class="sound-item__btn-download j-download-file" data-id='${id}'>
                                          <svg>
                                            <use xlink:href="#ico-download"></use>
                                          </svg></button><a class="sound-item__btn-more" href="#">
                                          <svg>
                                            <use xlink:href="#ico-more"></use>
                                          </svg></a>
                          </div>
                        </article>
              `
        this.list!.append(element)
        setTimeout(() => {
          element.classList.add(ClassEnums.VISIBLE)
        }, 50 * index)
      }
    })
  }

  itemInit = () => {
    document.querySelectorAll('.j-button-click')
      .forEach(block => {
        const buttonClick = new ButtonClick(block as HTMLButtonElement)
        buttonClick.init()
      })
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
    document.querySelectorAll('.j-download-file')
      .forEach(button => {
        const downloadSoundFile = new DownloadSoundFile(button as HTMLButtonElement)
        downloadSoundFile.init()
      })
  }
}
