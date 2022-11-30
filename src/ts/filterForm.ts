import { Xhr } from './api/xhr/xhr'
import { API_URL, ERROR_MASSAGES } from './constants/constants'
import { SoundItemGeneration } from './soundItemGeneration'
import { MusicTrack, MyRequest } from './types/types'
import { ClassEnums } from './utils/enums/classEnums'
import { StorageItemEnums } from './utils/enums/storageItemEnums'

export class FilterForm {
  private freeInput: HTMLInputElement | null
  private favoriteInput: HTMLInputElement | null
  private durationMinInput: HTMLInputElement | null
  private durationMaxInput: HTMLInputElement | null
  private categoriesInput: HTMLInputElement | null
  private userId: string | null;
  private soundsContainer: HTMLElement | null;
  private SoundItemGeneration: SoundItemGeneration | undefined;
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
