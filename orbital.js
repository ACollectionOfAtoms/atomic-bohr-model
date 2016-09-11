// This should provide an ``` orbital ``` object, which is a <g> tag housing
// the electron path, it's length, and the electrons themselves
import Electron from './electron'
import * as svgUtils from './libs/svgUtils'

export default class {
  constructor(atom, radius, numElectrons, idNumber) {
    this.atom = atom
    this.radius = radius
    this.numElectrons = numElectrons
    this.orbitalId = 'orbital-' + idNumber  // 0 = Hydrogen, 1 = Helium ...

    this.ePath = Object
    this.pathId = 'e-path-' + idNumber
    this.drawElectronPath()
    this.electrons = Array.from(new Array(this.numElectrons), (e,i) => new Electron(this.orbitalId, i))
    this.addElectrons()
  }
  drawElectronPath() {
    let translation = String("translate(x, y)")
    translation = translation.replace(/x/, this.atom.center.x)
    translation = translation.replace(/y/, this.atom.center.y)
    this.atom.svgContainer.append("g")
                            .attr("id", this.orbitalId)
                            .attr("transform", translation)
    let ePathDescription = svgUtils.circularPathDescription(this.radius)
    d3.select('#' + this.orbitalId).append("path")
                                    .attr("class", "electron-path")
                                    .attr("id", this.pathId)
                                    .attr("d", ePathDescription)
    this.ePath = d3.select('#' + this.pathId).node()
  }
  addElectrons() {
    // this method should add electrons to the correct coordinates (distance on path)
    // wrt number of electrons.
    // To keep electrons equi-distant, (i)*(L/N) is applied, where:
    // L = total length of path
    // N = number of electrons
    // i = index of the electron
    // for n > 1
    let totalPathLength = (this.ePath.getTotalLength() / 2) + 3// d3.arc paths have double actual length (?), also unsure why adding 3 ensures proper length
    let uniqueDistance = totalPathLength / this.numElectrons
    for (let e of this.electrons) {
      if (this.electrons.indexOf(e) === 0) {
        svgUtils.transitionAlongPath(e, this.ePath, 0)
      } else {
        uniqueDistance = this.electrons.indexOf(e) * (totalPathLength/ this.numElectrons)
        svgUtils.transitionAlongPath(e, this.ePath, uniqueDistance)
      }
    }
  }
}
