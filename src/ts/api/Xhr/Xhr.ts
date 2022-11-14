export class Xhr {
private static xhr: XMLHttpRequest;
private static URL: string = '';

// eslint-disable-next-line no-useless-constructor
constructor () {
}

static async Get (URL: string) {
  this.URL = URL
  return this.send('GET')
}

private static send (method: string) {
  return new Promise((resolve, reject) => {
    this.xhr = new XMLHttpRequest()
    this.xhr.open(method, this.URL)
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
}
