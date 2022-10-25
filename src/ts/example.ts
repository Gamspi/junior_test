class ExampleCode {
  private container: HTMLElement | null;
  private button: HTMLElement | null;
  private picture: HTMLElement | null;
  constructor (private block: HTMLElement) {
    this.container = block
    this.button = this.container.querySelector('.j-example-button')
    this.picture = this.container.querySelector('.j-example-picture')
  }

  getRandomValue (itemsArray: any[]) {
    const randomIndex = Math.floor(Math.random() * itemsArray.length)
    return itemsArray[randomIndex]
  }

  getNewRandomValue (itemsArray: any[], excludedValue: any) {
    const itemsArrayWithoutExcludedValue = itemsArray.filter(i => i !== excludedValue)
    return this.getRandomValue(itemsArrayWithoutExcludedValue)
  }

  init () {
    const colorsArray = ['#31bade', '#DE3163', '#00b1a5']
    const borderStyleArray = ['solid', 'dashed']
    if (this.button) {
      this.button.onclick = () => {
        if (this.picture) {
          this.picture.style.borderColor = this.getRandomValue(colorsArray)
          this.picture.style.borderStyle = this.getNewRandomValue(borderStyleArray, this.picture.style.borderStyle)
        }
      }
    } else {
      console.error("Example.ts couldn't find neccessary button block")
    }
  }
}

export default ExampleCode
