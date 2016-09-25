import Electron from './electron'
import * as svgUtils from './utils/svgUtils'

export default class {
  constructor(atom, radius, color, width, numElectrons, electronRadius, electronColor, atomId, idNumber, animationTime) {
    this.atom = atom
    this.radius = radius
    this.numElectrons = numElectrons
    this.electronRadius = electronRadius
    this.electronColor = electronColor
    this.pathWidth = width ? width : 0.1
    this.pathColor = color ? color : 'black'
    this.animationTime = animationTime
    this.orbitalId = atomId + '-orbital-' + idNumber


    this.ePath = Object  // d3 path
    this.pathId = this.orbitalId + '-e-path-' + idNumber
    this.orbitalContainer = this.createOrbitalContainer()
    this.drawElectronPath()
    this.totalPathLength =  (this.ePath.getTotalLength() / 2) + 3// d3.arc paths have double actual length (?), also unsure why adding 3 ensures proper length
    this.electrons = Array.from(new Array(this.numElectrons), (e,i) => new Electron(this.orbitalId, i, this.electronRadius, this.electronColor))
    this.drawElectrons()  // intialize with a given number of electrons
  }
  createOrbitalContainer() {
    let translation = `translate(${this.atom.center.x}, ${this.atom.center.y})`
    return this.atom.atomContainer.append("g")
                            .attr("id", this.orbitalId)
                            .attr("width", this.atom.center.x * 2)
                            .attr("height", this.atom.center.y * 2)
                            .attr("transform", translation)

  }
  drawElectronPath() {
    let ePathDescription = svgUtils.circularPathDescription(this.radius)
    d3.select('#' + this.orbitalId).append("path")
                                    .attr("class", "bohr-electron-path")
                                    .attr("id", this.pathId)
                                    .attr("d", ePathDescription)
                                    .attr("stroke", this.pathColor)
                                    .attr("stroke-width", this.pathWidth)
    this.ePath = d3.select('#' + this.pathId).node()
  }
  drawElectrons() {
    // this method adds electrons to the correct coordinates (distance on path)
    // wrt number of electrons.
    // To keep electrons equi-distant, (i)*(L/N) is applied, where:
    // L = total length of path
    // N = number of electrons
    // i = index of the electron
    let uniqueDistance = this.totalPathLength / this.numElectrons
    for (let e of this.electrons) {
      if (this.electrons.indexOf(e) === 0) {
        svgUtils.transitionAlongPath(e, this.ePath, 0, this.animationTime)
      } else {
        uniqueDistance = this.electrons.indexOf(e) * (this.totalPathLength/ this.numElectrons)
        svgUtils.transitionAlongPath(e, this.ePath, uniqueDistance, this.animationTime)
      }
    }
  }
  //TODO: create 3 methods for updating, adding, and removing electrons elegantly
  // e.g without redrawing entirely in atom.js
}
