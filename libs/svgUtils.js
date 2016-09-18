export function circularPathDescription(radius) {
  return d3.arc()
            .innerRadius(radius)
            .outerRadius(radius + 1)
            .startAngle(0)
            .endAngle(Math.PI*2)
}
// these two methods are from https://bl.ocks.org/mbostock/1705868
export function transitionAlongPath(selection, path, distance, animationTime) {
  selection.transition()
            .duration(animationTime)
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
export function rotateInPlace({selection, center, speed, clockwise, isChild}) {
  let start = Date.now()
  d3.timer(() => {
    // TODO: Ensure angle stays within 0 and 360
    let angle = ((Date.now() - start) / 1000) * speed
    angle = clockwise ? angle : -angle
    let transform
    if (isChild) {
      angle = -angle
      transform = `translate(${center.x}, ${center.y}) rotate(${angle}, 0, 0)`
    }else{
      transform = `rotate(${angle}, ${center.x}, ${center.y})`
    }
    selection.attr("transform", transform)
  })
}
