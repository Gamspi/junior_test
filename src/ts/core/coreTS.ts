export type MusicTrack = {
  id: string,
  name: string,
  description: string,
  src: URL,
  isLike: boolean,
  genres: string[]
}

export type MyRequest<T> = {
  status: string,
  message: string,
  data: T
}

export type SubmitFormSuccessHandlerType = {
  response: MyRequest<MusicTrack>,
  resolve?: () => void,
  reject?: (message: string) => void
}

// constants
const ERROR_MASSAGES = 'Не предвиденная ошибка'
const API_URL = 'http://localhost:5000/api'
const LOG_OUT = 'Log out'
const SUBMIT_MASSAGES = 'submit'

// enums
enum StorageItemEnums {
  AUTH = 'auth'
}

 enum StatusEnums {
  SUCCESS = 'success',
  ERROR = 'error',
}

enum StyleEnums {
  SCROLL = 'scroll',
  HIDDEN = 'hidden',
}

enum ClassEnums {
  PLAY = '_play',
  CLICK = '_click',
  ACTIVE = '_active',
  OPEN = '_open',
  VISIBLE = '_visible',
  ERROR = '_error',
}

class Xhr {
  private static xhr: XMLHttpRequest
  private static URL = ''

  static async Get<T> (URL: string, param?: object): Promise<T> {
    this.URL = URL
    const url = !param ? this.URL : `${this.URL}?${this.getOptions(param)}`
    return this.send<T>('GET', url)
  }

  static async Post<T> (URL: string, postObj: object): Promise<T> {
    this.URL = URL
    return this.send<T>('POST', this.URL, postObj)
  }

  private static send<T> (method: string, url: string, postObj?: object): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.xhr = new XMLHttpRequest()
      this.xhr.open(method, url)
      this.xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      this.xhr.responseType = 'json'
      this.xhr.onload = () => {
        if (this.xhr.status < 400) {
          resolve(this.xhr.response)
        } else {
          reject(this.xhr.response)
        }
      }
      this.xhr.onerror = () => {
        reject(this.xhr.response)
      }
      this.xhr.send(JSON.stringify(postObj))
    })
  }

  private static getOptions (obj: object) {
    return Object.entries(obj).map((item) => {
      return item.join('=')
    }).join('&')
  }
}

// работа с аудио звуками
/**
 * класс для скачивания аудио фалов
 */
class DownloadSoundFile {
  private id: string | undefined

  constructor (private button: HTMLButtonElement) {
    this.id = button.dataset.id
  }

  init () {
    this.button.onclick = () => {
      if (this.id) {
        this.button.disabled = true
        this.downloadFile().catch(e => console.error('Не предвиденная ошибка', e)).finally(() => {
          this.button.disabled = true
        })
      }
    }
  }

  async downloadFile () {
    const response = await fetch(`${API_URL}/download/download?id=${this.id}`)
    if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `sound-${this.id}.mp3`
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
}

class LikeController {
  private id: string
  private defaultChecked: boolean
  private userId: string | null

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

class SoundItemGeneration {
  list: HTMLElement | null

  constructor (private container: HTMLElement) {
    this.list = container.querySelector('.j-sound-list')
  }

  itemGeneration (items: MusicTrack[]) {
    items.forEach(({
      src,
      name,
      description,
      genres,
      isLike,
      id
    }) => {
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
      }
    })
  }

  itemInit = () => {
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

class ChooseGenre extends SoundItemGeneration {
  private readonly tabs: NodeListOf<HTMLElement>

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
          this.GetGenre(id, () => {
            target.disabled = false
          })
        }
      }
    })
  }

  GetGenre = (id?: string, finallyFunc?: () => void) => {
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

class FilterForm {
  private freeInput: HTMLInputElement | null
  private favoriteInput: HTMLInputElement | null
  private durationMinInput: HTMLInputElement | null
  private durationMaxInput: HTMLInputElement | null
  private categoriesInput: HTMLInputElement | null
  private userId: string | null
  private soundsContainer: HTMLElement | null
  private SoundItemGeneration: SoundItemGeneration | undefined
  private isSubmit = false

  constructor (private form: HTMLFormElement) {
    this.freeInput = form.querySelector('input#onlyFree')
    this.favoriteInput = form.querySelector('input#myFavorite')
    this.durationMinInput = form.querySelector('input#durationMin')
    this.durationMaxInput = form.querySelector('input#durationMax')
    this.categoriesInput = form.querySelector('input#categories')
    this.userId = sessionStorage.getItem(StorageItemEnums.AUTH)
    this.soundsContainer = document.querySelector('.j-sounds-list')
  }

  init () {
    if (this.soundsContainer) this.SoundItemGeneration = new SoundItemGeneration(this.soundsContainer)
    this.form.onsubmit = (e) => {
      e.preventDefault()
      if (!this.isSubmit) {
        this.isSubmit = true
        this.userId = sessionStorage.getItem(StorageItemEnums.AUTH)
        const isFree = this.freeInput?.checked
        const isFavorite = this.favoriteInput?.checked
        const durationMin = this.durationMinInput?.value
        const durationMax = this.durationMaxInput?.value
        const category = this.categoriesInput?.value
        Xhr.Post<MyRequest<MusicTrack[]>>(`${API_URL}/filter/sounds`, {
          isFree,
          isFavorite,
          durationMin,
          durationMax,
          category,
          userId: this.userId
        }).then(({ data }) => {
          if (this.SoundItemGeneration && data) {
            if (this.SoundItemGeneration.list) this.SoundItemGeneration.list.innerHTML = ''
            this.SoundItemGeneration?.itemGeneration(data)
            this.SoundItemGeneration.itemInit()
          }
        }
        ).catch((e) => {
          console.error(ERROR_MASSAGES, e)
        }).finally(() => {
          this.isSubmit = false
          this.form.classList.remove(ClassEnums.OPEN)
        })
      }
    }
  }
}

// поле search

class SearchForm {
  private readonly input: HTMLInputElement | null
  private value = ''

  constructor (private form: HTMLFormElement) {
    this.input = form.querySelector('.j-search-input')
  }

  init () {
    if (this.input) {
      this.input.oninput = () => {
        this.value = this.input?.value || ''
      }
    }
    this.form.onsubmit = e => {
      e.preventDefault()
      if (this.input) this.input.disabled = true
      Xhr.Post<MyRequest<string>>(`${API_URL}/search/word`, {
        value: this.value
      }).then(({ data }) => {
        console.log(data)
        alert(data)
      }).catch(e => {
        console.error(ERROR_MASSAGES, e)
      }).finally(() => {
        if (this.input) {
          this.input.value = this.value = ''
          this.input.disabled = false
        }
      })
    }
  }
}

// работа с формой логина
class BodyBlock {
  static block () {
    document.body.style.overflowY = StyleEnums.HIDDEN
  }

  static unBlock () {
    document.body.style.overflowY = StyleEnums.SCROLL
  }
}

class FormLogin {
  private readonly emailInput: HTMLInputElement | null
  private readonly passwordInput: HTMLInputElement | null
  private readonly passwordMockInput: HTMLInputElement | null
  private readonly rememberInput: HTMLInputElement | null
  private loginBtn: NodeListOf<HTMLButtonElement>
  private isSubmit = false

  constructor (public form: HTMLFormElement) {
    this.loginBtn = document.querySelectorAll('.j-login-form-btn-open')
    this.emailInput = this.form.querySelector('.j-login-email')
    this.passwordInput = this.form.querySelector('.j-login-password')
    this.passwordMockInput = this.form.querySelector('.j-password-mock')
    this.rememberInput = this.form.querySelector('#isRemember')
    this.changeTextIntroBtns = this.changeTextIntroBtns.bind(this)
  }

  logInSubmit (resolve?: () => void, reject?: (message: string) => void) {
    if (!this.isSubmit) {
      this.isSubmit = true
      const email = this.emailInput?.value || ''
      const password = this.passwordInput?.value || ''

      if (email && password) {
        Xhr.Post<MyRequest<MusicTrack>>(`${API_URL}/auth/authorization`, {
          email,
          password
        }).then((response) => {
          this.successHandler({
            response,
            reject,
            resolve
          })
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.isSubmit = false
        })
      } else {
        throw Error(ERROR_MASSAGES)
      }
    }
  }

  successHandler = ({
    response: {
      data: { id },
      status,
      message
    },
    resolve,
    reject
  }: SubmitFormSuccessHandlerType) => {
    const isRemember = this.rememberInput?.checked
    if (status === StatusEnums.SUCCESS) {
      if (isRemember) {
        document.cookie = `user=${id}`
      }
      sessionStorage.setItem(StorageItemEnums.AUTH, `${id}`)
      if (resolve) resolve()
      this.form.classList.remove(ClassEnums.OPEN)
      BodyBlock.unBlock()
      this.changeTextIntroBtns(LOG_OUT)
      this.removeToDefault()
    } else {
      if (reject) reject(message)
    }
  }

  removeToDefault () {
    if (this.emailInput) this.emailInput.value = ''
    if (this.passwordInput) this.passwordInput.value = ''
    if (this.passwordMockInput) this.passwordMockInput.value = ''
    if (this.rememberInput) this.rememberInput.checked = false
  }

  changeTextIntroBtns (text: string) {
    this.loginBtn.forEach(btn => {
      btn.innerHTML = text
    })
  }
}

class ValidationLoginForm extends FormLogin {
  private noValidArr: HTMLInputElement[] | undefined
  private inputs: NodeListOf<HTMLInputElement>
  private readonly errorBlock: HTMLElement | null

  constructor (form: HTMLFormElement) {
    super(form)
    this.inputs = form.querySelectorAll('input')
    this.errorBlock = form.querySelector('.j-login-error')
  }

  init () {
    this.inputs.forEach(input => {
      input.onfocus = () => input.classList.remove(ClassEnums.ERROR)

      input.onblur = () => {
        if (!input.validity.valid) input.classList.add(ClassEnums.ERROR)
      }
    })
    this.form.onsubmit = e => {
      e.preventDefault()
      if (this.errorBlock) this.errorBlock.classList.remove(ClassEnums.VISIBLE)

      this.noValidArr = Array.from(this.inputs).filter(input => !input.validity.valid)
      if (this.noValidArr.length) {
        this.form.querySelectorAll('input').forEach(input => {
          if (input.validity.valid) {
            input.classList.remove(ClassEnums.ERROR)
          } else {
            this.addError(input)
          }
        })
      } else {
        console.log(SUBMIT_MASSAGES)
        super.logInSubmit(undefined, this.handelError)
        this.inputs.forEach(input => {
          input.classList.remove(ClassEnums.ERROR)
        })
      }
    }
  }

  handelError = (message: string) => {
    this.inputs.forEach(input => this.addError(input))

    if (this.errorBlock) {
      this.errorBlock.innerHTML = message
      this.errorBlock.classList.add(ClassEnums.VISIBLE)
    }
  }

  addError (target: HTMLElement) {
    if (target) target.classList.add(ClassEnums.ERROR)
  }
}

// connection
document.querySelectorAll('.j-sounds-list')
  .forEach(block => {
    const chooseGenre = new ChooseGenre(block as HTMLDivElement)
    chooseGenre.init()
  })

const filterModal = document.querySelector('.j-filter-modal') as HTMLFormElement | null
if (filterModal) {
  const filterForm = new FilterForm(filterModal)
  filterForm.init()
}
document.querySelectorAll('.j-search')
  .forEach(block => {
    const searchForm = new SearchForm(block as HTMLFormElement)
    searchForm.init()
  })
document.querySelectorAll('.j-login-form')
  .forEach(block => {
    const validationForm = new ValidationLoginForm(block as HTMLFormElement)
    validationForm.init()
  })
