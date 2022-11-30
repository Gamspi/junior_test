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
}
