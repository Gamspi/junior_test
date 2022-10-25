import './index.scss'

class Index {
  constructor () {
    this.init()
  }

  init () {
    document.querySelectorAll('.j-example-item')
      .forEach(block => {
        // const Container = new ExampleCode(block as HTMLElement)
        // Container.init()
      })
  }
}

new Index()
