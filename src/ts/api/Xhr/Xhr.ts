export class Xhr {
  private static xhr: XMLHttpRequest;
  private static URL = '';

  static async Get<T> (URL: string, param?: object):Promise<T> {
    this.URL = URL
    const url = !param ? this.URL : `${this.URL}?${this.getOptions(param)}`
    return this.send<T>('GET', url)
  }

  static async Post<T> (URL: string, postObj: object):Promise<T> {
    this.URL = URL
    return this.send<T>('POST', this.URL, postObj)
  }

  private static send<T> (method: string, url: string, postObj?: object):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.xhr = new XMLHttpRequest()
      this.xhr.open(method, url)
      this.xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
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
      this.xhr.send(JSON.stringify(postObj))
    })
  }

  private static getOptions (obj:object) {
    return Object.entries(obj).map((item) => { return item.join('=') }).join('&')
  }
}
