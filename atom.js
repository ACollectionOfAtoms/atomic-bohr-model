class Atom {
  constructor(numElectrons) {
    this.numElectrons = numElectrons
  }
  addElectrons(num) {
    this.numElectrons += num
  }
  removeElectrons(num) {
    this.numElectrons -= num
  }
}
