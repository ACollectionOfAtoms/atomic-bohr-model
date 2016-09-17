import * as svgUtils from './libs/svgUtils'
import Orbital from './orbital'
import atomicData from './atomic_data.json'

export default class {
  constructor({containerId, numElectrons, nucleusRadius, orbitalSpacing, idNumber}) {
    this.containerEle = d3.select(containerId)
    this.center = {x: $(containerId).width()/2, y: $(containerId).height()/2}
    this.idNumber = idNumber
    this.containerId = containerId
    this.svgContainer = this.createSvgContainer(idNumber)
    this.orbitalSpacing = orbitalSpacing ? orbitalSpacing : 15
    this.atomContainer = this.createAtomContainer(idNumber)
    this.numElectrons = numElectrons
    this.nucleus = this.createNucleus(containerId, nucleusRadius)
    this.setAtomicConfig()
    this.drawOrbitals()
    this.drawAtomicSymbol()
    this.drawAtomName()
  }
  createSvgContainer(idNumber) {
    return this.containerEle.append("svg")
                              .attr("width", this.center.x * 2)
                              .attr("height", this.center.y * 2)
                              .attr("id", 'bohr-model-svg-container-' + idNumber)
  }
  createAtomContainer(idNumber) {
    this.atomId = 'atom-' + idNumber
    return this.svgContainer.append("g")
                              .attr("id", this.atomId)
  }
  createNucleus(containerId, nucleusRadius) {
    this.nucleusRadius = nucleusRadius ?
                         nucleusRadius :
                         $(containerId).width() / 12
    return this.atomContainer.append("circle")
                                .attr("cx", this.center.x)
                                .attr("cy", this.center.y)
                                .attr("r", this.nucleusRadius)
                                .attr("class", "bohr-model-nucleus")
                                .attr("id", this.atomId + "-nucleus")
  }
  setAtomicConfig() {
    let atomicNumber = this.numElectrons.toString()
    let elementData = atomicData[atomicNumber]

    this.electronConfig = elementData['electron_config']
    this.atomicSymbol = elementData['atomic_symbol']
    this.elementName = elementData['element_name']
  }
  drawOrbitals() {
    this.orbitals = []
    // using the electron config array in atomic_data.json,
    // iterate through and create orbitals with their values
    // increment on radius by ``` orbitalSpacing ```
    let spacing = this.nucleusRadius + this.orbitalSpacing
    let orbIdNumber = 0
    //TODO catch when eNumber is greater than 118
    for (let eNumber of this.electronConfig) {
      let orbital = new Orbital(this, spacing, eNumber, this.atomId, orbIdNumber)
      this.orbitals.push(orbital)
      spacing += this.orbitalSpacing
      orbIdNumber += 1
    }
  }

  drawAtomicSymbol() {
    this.atomContainer.append("text")
                .attr("x", this.center.x)
                .attr("y", this.center.y + 12)
                .attr("font-size", this.nucleusRadius)
                .attr("class", "bohr-atomic-symbol")
                .attr("text-anchor", "middle")
                .text(this.atomicSymbol)
                .style("fill", "white")
  }
  drawAtomName() {
    this.atomContainer.append("text")
                      .attr("x", this.center.x)
                      .attr("y", this.center.y*2 - 4)
                      .attr("text-anchor", "middle")
                      .attr("class", "bohr-element-name")
                      .text(this.elementName)
  }
  destroy() {
    this.atomContainer.remove()
  }
  addElectrons(num) {
    this.destroy()
    this.numElectrons += num
    this.atomContainer = this.createAtomContainer(this.idNumber)
    this.nucleus = this.createNucleus(this.containerId, this.nucleusRadius)
    this.setAtomicConfig()
    this.drawOrbitals()
    this.drawAtomicSymbol()
    this.drawAtomName()
  }
  removeElectrons(num) {
    this.destroy()
    this.numElectrons -= num
    this.atomContainer = this.createAtomContainer(this.idNumber)
    this.nucleus = this.createNucleus(this.containerId, this.nucleusRadius)
    this.setAtomicConfig()
    this.drawOrbitals()
    this.drawAtomicSymbol()
    this.drawAtomName()
  }
}
