import { Xhr } from './api/Xhr/Xhr'
import { SoundItemGeneration } from './soundItemGeneration'
import { MusicTrack, MyRequest } from './types/types'

export class FilterForm {
  private freeInput: HTMLInputElement | null
  private favoriteInput: HTMLInputElement | null
  private durationMinInput: HTMLInputElement | null
  private durationMaxInput: HTMLInputElement | null
  private categoriesInput: HTMLInputElement | null
	private userId: string | null;
	private soundsContainer: HTMLElement | null;
	private SoundItemGeneration: SoundItemGeneration | undefined;

	constructor (private form: HTMLFormElement) {
	  this.freeInput = form.querySelector('input#onlyFree')
	  this.favoriteInput = form.querySelector('input#myFavorite')
	  this.durationMinInput = form.querySelector('input#durationMin')
	  this.durationMaxInput = form.querySelector('input#durationMax')
	  this.categoriesInput = form.querySelector('input#categories')
	  this.userId = sessionStorage.getItem('auth')
	  this.soundsContainer = document.querySelector('.j-sounds-list')
	}

	init () {
	  if (this.soundsContainer) this.SoundItemGeneration = new SoundItemGeneration(this.soundsContainer)
	  this.form.onsubmit = (e) => {
	    e.preventDefault()
	    const isFree = this.freeInput?.checked
	    const isFavorite = this.favoriteInput?.checked
	    const durationMin = this.durationMinInput?.value
	    const durationMax = this.durationMaxInput?.value
	    const category = this.categoriesInput?.value
	    Xhr.Post<MyRequest<MusicTrack[]>>('http://localhost:5000/api/filter/sounds', {
	      isFree,
	      isFavorite,
	      durationMin,
	      durationMax,
	      category,
	      userId: this.userId
	    }).then(({ data }) => {
	      if (this.SoundItemGeneration && data) {
	        if (this.SoundItemGeneration.list) this.SoundItemGeneration.list.innerHTML = ''
	        data.forEach(item => this.SoundItemGeneration!.itemGeneration(item))
	        this.SoundItemGeneration.itemInit()
	      }
	    }
	    ).catch((e) => {
	      console.error('непредвиденная ошибка', e)
	    }).finally(() => {
	      this.form.classList.remove('_open')
	    })
	  }
	}
}
