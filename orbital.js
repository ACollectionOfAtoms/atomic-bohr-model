// This should provide an ``` orbital ``` object, which is a <g> element housing
// the electron path, it's length, and the electrons themselves
import Electron from './electron'
import * as svgUtils from './libs/svgUtils'

export default class {
  constructor(atom, radius, numElectrons, atomId, idNumber) {
    this.atom = atom
    this.radius = radius
    this.numElectrons = numElectrons
    this.orbitalId = atomId + '-orbital-' + idNumber

    this.ePath = Object  // d3 path
    this.pathId = this.orbitalId + '-e-path-' + idNumber
    this.drawElectronPath()
    this.totalPathLength =  (this.ePath.getTotalLength() / 2) + 3// d3.arc paths have double actual length (?), also unsure why adding 3 ensures proper length
    this.electrons = Array.from(new Array(this.numElectrons), (e,i) => new Electron(this.orbitalId, i))
    this.drawElectrons()  // intialize with a given number of electrons
  }
  drawElectronPath() {
    let translation = String("translate(x, y)")
    translation = translation.replace(/x/, this.atom.center.x)
    translation = translation.replace(/y/, this.atom.center.y)
    this.atom.atomContainer.append("g")
                            .attr("id", this.orbitalId)
                            .attr("transform", translation)
    let ePathDescription = svgUtils.circularPathDescription(this.radius)
    d3.select('#' + this.orbitalId).append("path")
                                    .attr("class", "bohr-electron-path")
                                    .attr("id", this.pathId)
                                    .attr("d", ePathDescription)
    this.ePath = d3.select('#' + this.pathId).node()
  }
  drawElectrons() {
    // this method should add electrons to the correct coordinates (distance on path)
    // wrt number of electrons.
    // To keep electrons equi-distant, (i)*(L/N) is applied, where:
    // L = total length of path
    // N = number of electrons
    // i = index of the electron
    let uniqueDistance = this.totalPathLength / this.numElectrons
    for (let e of this.electrons) {
      if (this.electrons.indexOf(e) === 0) {
        svgUtils.transitionAlongPath(e, this.ePath, 0)
      } else {
        uniqueDistance = this.electrons.indexOf(e) * (this.totalPathLength/ this.numElectrons)
        svgUtils.transitionAlongPath(e, this.ePath, uniqueDistance)
      }
    }
  }
  updateElectrons(num) {
    // Cheap way to change electron number. Must figure out way
    // TODO: add and remove electrons elegantly
    d3.select('#' + this.orbitalId).remove()
    this.numElectrons = num
    this.drawElectronPath()
    this.electrons = Array.from(new Array(num), (e,i) => new Electron(this.orbitalId, i))
    this.drawElectrons()
  }
  addElectrons(num) {
    this.numElectrons += num
    for (let n; n < num; n++) {
      this.electrons.push(new Electron(this.orbitalId, this.electrons.length + 1))
    }
    for (let e in this.electrons) {
      // reposition all electrons similar to how they are initially drawn
    }
  }
  removeElectrons(num) {
    this.numElectrons -= num
    for (let n in new Array(num).fill(true)) {
      this.electrons[this.electrons.length-1].remove()
      this.electrons.pop()
    }
    this.drawElectrons()
    for (let e in this.electrons) {
      // reposition all electrons similar to how they are initially drawn
    }
  }
}
