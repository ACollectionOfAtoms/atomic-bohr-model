// this could use some cleaning up + mathematical love
export default class {
  constructor(num, dataPoints) {
    this.baseNum = num
    this.num = num
    this.origin = 0
    this.dataPoint = 0
    this.dataPoints = dataPoints
    if (num < dataPoints) {
      this.baseNum = this.dataPoints
      this.num = this.dataPoints
    }
  }
  randomInt() {
    let min = 1
    let max = this.num
    return Math.round(Math.random() * (max - min) + min)
  }
  linearPositive() {
    if (this.dataPoint === 0) {
      this.dataPoint += 1
      return this.baseNum
    }
    this.origin += this.baseNum
    return this.origin
  }
  linearNegative() {
    if (this.dataPoint === 0) {
      this.num -= this.baseNum
      return this.num
    }
    if (this.num < 1) {
      this.num = 0
      return 1
    }
    this.num -= this.baseNum
    return this.num
  }
  cubedPositive() {
    this.origin += this.baseNum / 100
    this.dataPoint += 1
    return Math.round(Math.pow(this.origin, 3))
  }
  cubedNegative() {
    this.origin += this.baseNum / 1000
    this.dataPoint += 1
    return Math.round(Math.pow(this.origin, -3))
  }
  setFunction(name) {
    switch (name) {
      case 'random':
        this.mainFunction = this.randomInt
        break
      case 'linearPositive':
        this.mainFunction = this.linearPositive
        break
      case 'linearNegative':
        this.mainFunction = this.linearNegative
        break
      case 'cubedPositive':
        this.mainFunction = this.cubedPositive
        break
      case 'cubedNegative':
        this.mainFunction = this.cubedNegative
        break
      case 'parabola':
        this.mainFunction = this.parabola
        break
    }
  }
}
