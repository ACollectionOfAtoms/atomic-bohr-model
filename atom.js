import * as svgUtils from './utils/svgUtils'
import patternMath from './utils/patternMath'
import Orbital from './orbital'
import atomicData from './atomic_data.json'

export default class {
  constructor({
                containerId,
                numElectrons,
                nucleusRadius,
                orbitalSpacing,
                idNumber,
                animationTime,
                drawSymbol=true,
                drawLabel=false,
              }) {
    this.containerEle = d3.select(containerId)
    this.animationTime = animationTime
    this.center = {x: $(containerId).width()/2, y: $(containerId).height()/2}
    this.idNumber = idNumber
    this.containerId = containerId
    this.nucleusRadius = nucleusRadius
    this.svgContainer = this.createSvgContainer(idNumber)
    this.atomContainer = this.createAtomContainer(idNumber)
    this.numElectrons = this.ensureAtomicExistence(numElectrons) // Restrict to elements that exist
    this.nucleus = this.createNucleus(containerId, nucleusRadius)
    this.orbitalSpacing = orbitalSpacing ? orbitalSpacing : this.nucleusRadius / 3
    this.setAtomicConfig()
    this.drawOrbitals()
    if(drawSymbol) { this.drawAtomicSymbol()}
    if(drawLabel) {this.drawAtomName()}
  }
  createSvgContainer(idNumber) {
    return this.containerEle.append("svg")
                              .attr("width", this.center.x * 2)
                              .attr("height", this.center.y * 2)
                              .attr("x", this.center.x)
                              .attr("y", this.center.y)
                              .attr("id", 'bohr-model-svg-container-' + idNumber)
  }
  createAtomContainer(idNumber) {
    this.atomId = 'atom-' + idNumber
    return this.svgContainer.append("g")
                              .attr("width", this.center.x * 2)
                              .attr("height", this.center.y * 2)
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
    let atomicNumber = this.numElectrons.toString(),
        elementData = atomicData[atomicNumber]

    this.electronConfig = elementData['electron_config']
    this.atomicSymbol = elementData['atomic_symbol']
    this.elementName = elementData['element_name']
  }
  drawOrbitals(pattern) {
    this.orbitals = []
    // using the electron config array in atomic_data.json,
    // iterate through and create orbitals with their values
    // increment on radius by ``` orbitalSpacing ```
    let spacing = this.nucleusRadius + this.orbitalSpacing,
        orbIdNumber = 0,
        speed = 55
    for (let eNumber of this.electronConfig) {
      // TODO: expose animation time here to allow for different times per orbital
      let orbital = new Orbital(this, spacing, eNumber, this.atomId, orbIdNumber, this.animationTime)
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
  setNumElectrons(num) {
    this.destroy()
    this.numElectrons = num
    this.atomContainer = this.createAtomContainer(this.idNumber)
    this.nucleus = this.createNucleus(this.containerId, this.nucleusRadius)
    this.setAtomicConfig()
    this.drawOrbitals()
    this.drawAtomicSymbol()
    this.drawAtomName()
  }
  addElectrons(num) {
    this.destroy()
    let numElectrons = this.numElectrons + num
    this.numElectrons = this.ensureAtomicExistence(numElectrons)
    this.atomContainer = this.createAtomContainer(this.idNumber)
    this.nucleus = this.createNucleus(this.containerId, this.nucleusRadius)
    this.setAtomicConfig()
    this.drawOrbitals()
    this.drawAtomicSymbol()
    this.drawAtomName()
  }
  removeElectrons(num) {
    this.destroy()
    let numElectrons = this.numElectrons - num
    this.numElectrons = this.ensureAtomicExistence(numElectrons)
    this.atomContainer = this.createAtomContainer(this.idNumber)
    this.nucleus = this.createNucleus(this.containerId, this.nucleusRadius)
    this.setAtomicConfig()
    this.drawOrbitals()
    this.drawAtomicSymbol()
    this.drawAtomName()
  }
  ensureAtomicExistence(num) {
    return Math.min(Math.max(parseInt(num), 1), 118)
  }
  rotate({speed, clockwise}) {
    svgUtils.rotateInPlace({selection: this.atomContainer, center: this.center, speed: speed, clockwise: clockwise})
  }
  rotateOrbitals({speed, pattern}) {
    // TODO add clockwise as pattern param
    let alternating = pattern.alternating,
        formula = pattern.formula,
        preset = pattern.preset,
        clockwise = true,
        patternLength = this.orbitals.length,
        mod
    switch (preset) {
      case 'linear positive':
        mod = new patternMath(speed, patternLength)
        mod.setFunction('linearPositive')
        this.beginRotation(speed, mod, alternating, clockwise)
        break
      case 'linear negative':
        mod = new patternMath(speed, patternLength)
        mod.setFunction('linearNegative')
        this.beginRotation(speed, mod, alternating, clockwise)
        break
      case 'cubed positive':
        mod = new patternMath(speed, patternLength)
        mod.setFunction('cubedPositive')
        this.beginRotation(speed, mod, alternating, clockwise)
        break
      case 'cubed negative':
        mod = new patternMath(speed, patternLength)
        mod.setFunction('cubedNegative')
        this.beginRotation(speed, mod, alternating, clockwise)
        break
      case 'parabola up':
        mod = new patternMath(speed, patternLength)
        mod.setFunction('parabolaUp')
        this.beginRotation(speed, mod, alternating, clockwise)
        break
      case 'parabola down':
        mod = new patternMath(speed, patternLength)
        mod.setFunction('parabolaDown')
        this.beginRotation(speed, mod, alternating, clockwise)
        break
      case 'wavy':
        mod = new patternMath(speed, patternLength, clockwise)
        mod.setFunction('wavy')
        this.beginRotation(speed, mod, alternating, clockwise)
        break
      case 'random':
        mod = new patternMath(speed)
        mod.setFunction('random')
        this.beginRotation(speed, mod, alternating, clockwise)
        break
      default:
        this.beginRotation(speed)
    }
  }
  beginRotation(speed, speedModObject, alternating, startClockwise) {
    let orbSelections = Array.from(new Array(this.orbitals.length), (x, i) => this.orbitals[i].orbitalContainer),
        speedMod = speed,
        clockwise = startClockwise
        console.log(alternating)
    for (let orb of orbSelections) {
      speedMod = speedModObject.mainFunction()
      svgUtils.rotateInPlace({selection: orb, center: this.center, speed: speedMod, isChild: true, clockwise: clockwise})
      if (alternating) {clockwise = !clockwise}
    }
  }
  destroy() {
    this.atomContainer.remove()
  }
}
