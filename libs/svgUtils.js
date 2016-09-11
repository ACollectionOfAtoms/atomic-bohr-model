export function circularPathDescription(radius) {
  return d3.arc()
            .innerRadius(radius)
            .outerRadius(radius + 1)
            .startAngle(0)
            .endAngle(Math.PI*2)
}
// these two methods are from https://bl.ocks.org/mbostock/1705868
export function transitionAlongPath(selection, path, distance) {
  selection.transition()
            .duration(1000)
            .attrTween("transform", translateAlong(path, distance))
}
export function translateAlong(path, distance) {
  let l = distance
  return (d, i, a) => {
    return (t) => {
      let p = path.getPointAtLength(t * l)
      return "translate(" + p.x + "," + p.y + ")"
    }
  }
}
