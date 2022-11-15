export class CookeHelper {
  static getCookie (name:string) {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)' // eslint-disable-line
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  static setCookie (name: string, value: string, options = {}) {
    options = {
      path: '/',
      ...options
    }
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    type Key = keyof typeof options;
    for (const optionKey in options) {
      updatedCookie += '; ' + optionKey
      const optionValue = options[optionKey as Key]
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue
      }
    }

    document.cookie = updatedCookie
  }

  static deleteCookie (name:string) {
    this.setCookie(name, '', {
      'max-age': -1
    })
  }
}
