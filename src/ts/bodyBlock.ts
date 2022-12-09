import { StyleEnums } from './utils/enums/styleEnums'
import { scrollWidth } from './utils/helpers/scrollWidth'

export class BodyBlock {
  static block () {
    console.log(scrollWidth())
    document.body.style.overflowY = StyleEnums.HIDDEN
  }

  static unBlock () {
    document.body.style.overflowY = StyleEnums.SCROLL
  }
}
