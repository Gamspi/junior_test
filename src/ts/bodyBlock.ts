import { StyleEnums } from './utils/enums/styleEnums'

export class BodyBlock {
  static block () {
    document.body.style.overflowY = StyleEnums.HIDDEN
  }

  static unBlock () {
    document.body.style.overflowY = StyleEnums.SCROLL
  }
}
