export default class {
  constructor(orbitalId, idNumber, radius=2, color='black') {
    this.orbitalId = orbitalId
    this.radius = radius
    this.color = color
    this.eId = orbitalId + '-' + 'electron-' + idNumber
    // materialize electron (could be method)
    return d3.select('#' + this.orbitalId).append("circle")
                                    .attr("r", this.radius)
                                    .attr("class", "electron")
                                    .attr("id", this.eId)
                                    .style("fill", this.color)
  }
}
