export default class {
  constructor(containerEle, numElectrons) {
    this.containerEle = containerEle
    this.numElectrons = numElectrons
  }
  addElectrons(num) {
    this.numElectrons += num
  }
  removeElectrons(num) {
    this.numElectrons -= num
  }
}
