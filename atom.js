import * as svgUtils from './libs/svgUtils'
import Orbital from './orbital'
import atomicData from './atomic_data.json'

export default class {
  // TODO: nucleusRadius shoud be proportional to container.
  // TODO: ```orbitalSpacing``` should be a logically set modifier
  constructor(containerId, numElectrons, nucleusRadius = 10, orbitalSpacing = 1.5) {
    this.containerEle = d3.select(containerId)
    this.center = {x: $(containerId).width()/2, y: $(containerId).height()/2}
    this.svgContainer = this.containerEle.append("svg")
                                            .attr("width", this.center.x * 2)
                                            .attr("height", this.center.y * 2)

    this.numElectrons = numElectrons
    this.nucleusRadius = nucleusRadius
    this.orbitalSpacing = orbitalSpacing
    this.orbitals = []
    this.nucleus = this.createNucleus()
    this.drawOrbitals()
    // THESE SHOULD BE TEMPORARY
    $("addElectronButton").click(this.addElectrons())
    $("removeElectronButton").click(this.removeElectrons())
  }
  createNucleus() {
    return this.svgContainer.append("circle")
                                .attr("cx", this.center.x)
                                .attr("cy", this.center.y)
                                .attr("r", this.nucleusRadius)
                                .attr("class", "bohr-model-nucleus")
  }
  drawOrbitals() {
    // using the electron config array in atomic_data.json,
    // iterate through and create orbitals with their values
    // increment on radius by ``` orbitalSpacing ```
    let atomicNumber = this.numElectrons.toString()
    let electronConfig = atomicData[atomicNumber]['electron_config']
    let atomicSymbol = atomicData[atomicNumber]['atomic_symbol']
    let elementName = atomicData[atomicNumber]['element_name']

    let spacing = this.orbitalSpacing
    let orbId = 0
    //TODO catch when eNumber is greater than 118
    for (let eNumber of electronConfig) {
      let orbital = new Orbital(this, this.nucleusRadius*spacing, eNumber, orbId)
      this.orbitals.push(orbital)
      spacing += 0.5
      orbId += 1
    }
    // The below should be their own methods
    this.svgContainer.append("text")
                .attr("x", this.center.x)
                .attr("y", this.center.y + 4)
                .attr("font-size", this.nucleusRadius)
                .attr("class", "bohr-atomic-symbol")
                .attr("text-anchor", "middle")
                .text(atomicSymbol)
                .style("fill", "white")
    this.svgContainer.append("text")
                      .attr("x", this.center.x)
                      .attr("y", this.center.y*2 - 5)
                      .attr("text-anchor", "middle")
                      .attr("class", "bohr-element-name")
                      .text(elementName)
  }
  addElectrons() {
    // d3.select(".bohr-atomic-symbol").remove()
    // d3.select(".bohr-element-name").remove()
    // this.removeAllOrbitals()
  }
  removeElectrons(num) {
  }
  removeAllOrbitals() {
    for (let o of this.orbitals) {
      this.orbitals.pop()
      d3.select(o.orbitalId).remove()
    }
    console.log(orbitals)
  }
}
