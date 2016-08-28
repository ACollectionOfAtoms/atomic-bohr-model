export default class {
  constructor(containerEle, numElectrons) {
    this.containerEle = containerEle
    this.numElectrons = numElectrons
    console.log(this.containerEle)
    this.createNucleus()
  }
  createNucleus() {
    let svgSelection = this.containerEle.append("svg")
                                        .attr("width", 50)
                                        .attr("height", 50)
    let circleSelection = svgSelection.append("circle")
                                      .attr("cx", 25)
                                      .attr("cy", 25)
                                      .attr("r", 25)
                                      .style("fill", "black")

  }
  addElectrons(num) {
    this.numElectrons += num
  }
  removeElectrons(num) {
    this.numElectrons -= num
  }
}
