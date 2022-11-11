export class BodyBlock {
  static block () {
    document.body.style.overflowY = 'hidden'
  }

  static unBlock () {
    document.body.style.overflowY = 'scroll'
  }
}
