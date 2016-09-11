import * as svgUtils from './libs/svgUtils'
import Orbital from './orbital'

export default class {
  // TODO: nucleusRadius shoud be proportional to container.
  constructor(containerId, numElectrons, nucleusRadius = 10) {
    this.containerEle = d3.select(containerId)
    this.center = {x: $(containerId).width()/2, y: $(containerId).height()/2}
    this.svgContainer = this.containerEle.append("svg")
                                            .attr("width", this.center.x * 2)
                                            .attr("height", this.center.y * 2)

    this.numElectrons = numElectrons
    this.nucleusRadius = nucleusRadius
    this.nucleus = this.createNucleus()
    this.drawElectronPaths()
  }
  createNucleus() {
    return this.svgContainer.append("circle")
                                .attr("cx", this.center.x)
                                .attr("cy", this.center.y)
                                .attr("r", this.nucleusRadius)
                                .attr("class", "bohr-model-nucleus")
                                .style("fill", "black")
  }
  drawElectronPaths() {
    new Orbital(this, this.nucleusRadius * 1.5, 2, 0)
    new Orbital(this, this.nucleusRadius * 2, 8, 1)
    new Orbital(this, this.nucleusRadius * 2.5, 18, 2)
    new Orbital(this, this.nucleusRadius * 3, 32, 3)
    new Orbital(this, this.nucleusRadius * 3.5, 32, 4)
    new Orbital(this, this.nucleusRadius * 4, 18, 5)
    new Orbital(this, this.nucleusRadius * 4.5, 8, 6)
  }
  addElectrons(num) {
  }
  rotateElectrons() {
  }
  removeElectrons(num) {
  }
}
