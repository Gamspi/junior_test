export class TimeConverter {
  static convert (sec: number) {
    const hours = sec / 3600 % 24
    const minutes = sec / 60 % 60
    const seconds = sec % 60

    return hours > 1 ? this.num(hours) + ':' + this.num(minutes) + ':' + this.num(seconds) : Math.floor(minutes) + ':' + this.num(seconds)
  }

  private static num (val: number) {
    val = Math.floor(val)
    return val < 10 ? '0' + val : val
  }

  static convertOut (str: string) {
    const numArr = str.replace(/\D/, '').replace(/(\d{1,2}(?=(?:\d\d)+(?!\d)))/g, '$1 ').split(' ')
    return numArr.reduce((akk, elem, index) => {
      if (index !== numArr.length - 1) {
        return +akk + (+elem * 60)
      }
      return +akk + +elem
    }, 0)
  }
}
