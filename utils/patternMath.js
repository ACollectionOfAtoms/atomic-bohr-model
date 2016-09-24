import * as mathFuncs from './mathFuns'
export default class {
  constructor(multiplier, dataPoints) {
    this.step = 0
    this.origin = 0
    this.dataPoint = 0
    this.multiplier = multiplier
    this.dataPoints = dataPoints
  }
  yAtX(func, start, end) {
    if (this.dataPoint === 0 && !this.step) {
      this.dataPoint += 1
      this.step = (end - start)/this.dataPoints
      this.origin = start + this.step
      return func(start) * this.multiplier
    }
    if (this.dataPoint === this.dataPoints) {
      return func(end) * this.multiplier
    }
    this.dataPoint += 1
    this.origin += this.step
    return func(this.origin) * this.multiplier
  }
  linearPositive() {
    let mathFun = mathFuncs.linearPositive
    let start = 1
    let end = 100
    return this.yAtX(mathFun, start, end)
  }
  linearNegative() {
    let mathFun = mathFuncs.linearNegative
    let start = 1
    let end = 100
    return this.yAtX(mathFun, start, end)
  }
  cubedPositive() {
    // TODO: update this to be a mirror image (check graphs) of the cubedNegative Function
    //characteristic curve from x = 1 to x = 10^(2/3)
    let mathFun = mathFuncs.cubedPositive
    let start = 1
    let end = Math.pow(10, 2/3)
    return this.yAtX(mathFun, start, end)
  }
  cubedNegative() {
    //characteristic curve from x=1/(10^(2/3)) to x = 1
    let mathFun = mathFuncs.cubedNegative
    let start = 1/Math.pow(10, 2/3)  // y = 100
    let end = 1 // y = 1
    return this.yAtX(mathFun, start, end)
  }
  parabolaUp() {
    let mathFun = mathFuncs.positiveParabolaUp
    // (x -10)**2 is most characteristic from 0 to 20
    let start = 0
    let end = 20
    return this.yAtX(mathFun, start, end)
  }
  parabolaDown() {
    let mathFun = mathFuncs.positiveParabolaDown
    // roots of (x-10)**2 + 100 are 0 and 20
    let start = 0
    let end = 20
    return this.yAtX(mathFun, start, end)
  }
  randomInt() {
    let min = 1
    let max = this.multiplier * 50
    return Math.round(Math.random() * (max - min) + min)
  }
  uniform() {
    return this.multiplier * 25
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
      case 'parabolaUp':
        this.mainFunction = this.parabolaUp
        break
      case 'parabolaDown':
        this.mainFunction = this.parabolaDown
        break
      case 'uniform':
        this.mainFunction = this.uniform
        break
    }
  }
}
