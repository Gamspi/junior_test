export class Xhr {
  private static xhr: XMLHttpRequest;
  private static URL: string = '';

  // eslint-disable-next-line no-useless-constructor
  constructor () {
  }

  static async Get<T> (URL: string, param?: Object):Promise<T> {
    this.URL = URL
    const url = !param ? this.URL : `${this.URL}?${this.getOptions(param)}`
    return this.send<T>('GET', url)
  }

  private static send<T> (method: string, url: string):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.xhr = new XMLHttpRequest()
      this.xhr.open(method, url)
      this.xhr.responseType = 'json'
      this.xhr.onload = () => {
        if (this.xhr.status < 400) {
          resolve(this.xhr.response)
        } else {
          reject(this.xhr.response)
        }
      }
      this.xhr.onerror = () => {
        reject(this.xhr.response)
      }
      this.xhr.send()
    })
  }

  private static getOptions (obj:Object) {
    return Object.entries(obj).map((item) => { return item.join('=') }).join('&')
  }
}
