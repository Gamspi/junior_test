import './index.scss'
import ExampleCode from '../../ts/example'

class Index {
  constructor () {
    this.init()
  }

  init () {
    document.querySelectorAll('.j-example-item')
      .forEach(block => {
        const Container = new ExampleCode(block as HTMLElement)
        Container.init()
      })
  }
}

new Index()
