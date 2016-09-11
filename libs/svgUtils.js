export function circularPathDescription(radius) {
  return d3.arc()
            .innerRadius(radius)
            .outerRadius(radius + 1)
            .startAngle(0)
            .endAngle(Math.PI*2)
}
export function transitionAlongPath(selection, path, distance) {
  selection.transition()
          .duration(1000)
          .attrTween("transform", translateAlongTo(path, distance))
}
export function translateAlongTo(path, distance) {
  let l = distance
  return (d, i, a) => {
    return (t) => {
      let p = path.getPointAtLength(t * l)
      return "translate(" + p.x + "," + p.y + ")"
    }
  }
}
