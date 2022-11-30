import Swiper, { Navigation, Pagination } from 'swiper'

class CardSwiper {
  private paginationId = ''
  private swiperButtonNextId = ''
  private swiperButtonPrevId = ''
  private readonly spaceBetween: number
  private readonly pagination: HTMLDivElement | null | undefined
  private readonly swiperButtonNext: HTMLButtonElement | null
  private readonly swiperButtonPrev: HTMLButtonElement | null

  constructor (private block: HTMLElement) {
    this.spaceBetween = this.block.dataset.spacebetween ? +this.block.dataset.spacebetween : 0
    this.pagination = this.block.parentElement?.querySelector('.j-pagination')
    this.swiperButtonNext = this.block.querySelector('.j-swiper-button-next')
    this.swiperButtonPrev = this.block.querySelector('.j-swiper-button-prev')
  }

  init () {
    if (this.pagination) this.paginationId = this.pagination.id
    if (this.swiperButtonNext) this.swiperButtonNextId = this.swiperButtonNext.id
    if (this.swiperButtonPrev) this.swiperButtonPrevId = this.swiperButtonPrev.id
    const navigation = this.swiperButtonPrevId && this.swiperButtonNextId
      ? {
          nextEl: '#' + this.swiperButtonNextId,
          prevEl: '#' + this.swiperButtonPrevId
        }
      : {}

    const swiper = new Swiper(this.block, {
      slidesPerView: 'auto',
      spaceBetween: 0,
      centeredSlides: false,
      pagination: {
        el: '#' + this.paginationId
      },
      modules: [Navigation, Pagination],
      navigation
    })
    swiper.enable()
  }
}

export default CardSwiper
