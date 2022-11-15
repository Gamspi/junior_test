export class LikeController {
  constructor (private btn: HTMLInputElement) {

  }

  init () {
    this.btn.oninput = () => {
      console.log(123)
    }
  }
}
