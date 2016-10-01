import * as svgUtils from './utils/svgUtils'
import patternMath from './utils/patternMath'
import Orbital from './orbital'

require('./css/main.css')

import atomicData from './atomic_data.json'
const d3 = require('d3')
import $ from 'jquery'
import jQuery from 'jquery'

window.$ = $
window.jQuery = jQuery
window.d3 = d3

export default class Atom {
  constructor({
                containerId,
                numElectrons,
                nucleusRadius,
                nucleusColor,
                electronRadius,
                electronColor,
                orbitalColor,
                orbitalWidth,
                orbitalSpacing,
                idNumber,
                animationTime,
                rotateConfig,
                orbitalRotationConfig,
                symbolOffset=8,
                drawSymbol=true,
              }) {
    this._name = 'Atom'
    this.containerEle = d3.select(containerId)
    this.animationTime = animationTime
    this.center = {x: $(containerId).width()/2, y: $(containerId).height()/2}
    this.idNumber = idNumber
    this.containerId = containerId
    this.nucleusRadius = nucleusRadius
    this.electronRadius = electronRadius
    this.electronColor = electronColor
    this.orbitalColor = orbitalColor
    this.orbitalWidth = orbitalWidth
    this.svgContainer = this.createSvgContainer(idNumber)
    this.atomContainer = this.createAtomContainer(idNumber)
    this.numElectrons = this.ensureAtomicExistence(numElectrons) // Restrict to elements that exist
    this.nucleus = this.createNucleus(containerId, nucleusRadius, nucleusColor)
    this.orbitalSpacing = orbitalSpacing ? orbitalSpacing : this.nucleusRadius / 3
    this.setAtomicConfig()
    this.drawOrbitals()
    this.symbolOffset = symbolOffset
    if(drawSymbol) { this.drawAtomicSymbol()}
    if(rotateConfig) {this.rotate(rotateConfig)}
    if(orbitalRotationConfig) {this.rotateOrbitals(orbitalRotationConfig)}
    d3.select(window).on('resize', this.resize)
  }
  createSvgContainer(idNumber) {
    return this.containerEle
                  .append("div")
                    .classed("bohr-svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", `0 0 ${this.center.x * 2} ${this.center.y * 2}`)
                    .classed("bohr-svg-content-responsive", true)
                    .attr("id", 'bohr-model-svg-container-' + idNumber)
  }
  createAtomContainer(idNumber) {
    this.atomId = 'atom-' + idNumber
    return this.svgContainer.append("g")
                              .attr("width", this.center.x * 2)
                              .attr("height", this.center.y * 2)
                              .attr("id", this.atomId)

  }
  createNucleus(containerId, nucleusRadius, nucleusColor='black') {
    this.nucleusRadius = nucleusRadius ?
                         nucleusRadius :
                         $(containerId).width() / 12
    let color = nucleusColor
    return this.atomContainer.append("circle")
                                .attr("cx", this.center.x)
                                .attr("cy", this.center.y)
                                .attr("r", this.nucleusRadius)
                                .attr("class", "bohr-model-nucleus")
                                .attr("id", this.atomId + "-nucleus")
                                .style('fill', color)
  }
  setAtomicConfig() {
    let atomicNumber = this.numElectrons.toString(),
        elementData = atomicData[atomicNumber]

    this.electronConfig = elementData['electron_config']
    this.atomicSymbol = elementData['atomic_symbol']
    this.elementName = elementData['element_name']
    this.wikiSummary = elementData['wiki_summary']
    this.wikiUrl = elementData['wiki_url']
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
      let orbital = new Orbital(this, spacing, this.orbitalColor, this.orbitalWidth, eNumber, this.electronRadius, this.electronColor, this.atomId, orbIdNumber, this.animationTime)
      this.orbitals.push(orbital)
      spacing += this.orbitalSpacing
      orbIdNumber += 1
    }
  }
  drawAtomicSymbol() {
    this.atomContainer.append("text")
                        .attr("x", this.center.x)
                        .attr("y", this.center.y + this.symbolOffset)
                        .attr("font-size", this.nucleusRadius)
                        .attr("class", "bohr-atomic-symbol")
                        .attr("text-anchor", "middle")
                        .text(this.atomicSymbol)
                        .style("fill", "white")
  }
  setNumElectrons(num) {
    this.destroy()
    this.numElectrons = num
    this.atomContainer = this.createAtomContainer(this.idNumber)
    this.nucleus = this.createNucleus(this.containerId, this.nucleusRadius)
    this.setAtomicConfig()
    this.drawOrbitals()
    this.drawAtomicSymbol()
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
  }
  ensureAtomicExistence(num) {
    return Math.min(Math.max(parseInt(num), 1), 118)
  }
  rotate({speed, clockwise}) {
    svgUtils.rotateInPlace({selection: this.atomContainer, center: this.center, speed: speed, clockwise: clockwise})
  }
  rotateOrbitals({speed, pattern}) {
    let alternating = pattern.alternating,
        formula = pattern.formula,
        preset = pattern.preset,
        clockwise = pattern.clockwise,
        patternLength = this.orbitals.length,
        mod,
        s
    // TODO: Let speed modifier be meaningful
    switch (preset) {
      case 'linearPositive':
        s = speed ?
            speed :
            15
        mod = new patternMath(s, patternLength)
        mod.setFunction('linearPositive')
        this.beginRotation(mod, alternating, clockwise)
        break
      case 'linearNegative':
        s = speed ?
            speed :
            15
        mod = new patternMath(s, patternLength)
        mod.setFunction('linearNegative')
        this.beginRotation(mod, alternating, clockwise)
        break
      case 'cubedPositive':
        s = speed ?
            speed :
            15
        mod = new patternMath(s, patternLength)
        mod.setFunction('cubedPositive')
        this.beginRotation(mod, alternating, clockwise)
        break
      case 'cubedNegative':
        s = speed ?
            speed :
            35
        mod = new patternMath(s, patternLength)
        mod.setFunction('cubedNegative')
        this.beginRotation(mod, alternating, clockwise)
        break
      case 'parabolaUp':
        s = speed ?
            speed :
            10
        mod = new patternMath(s, patternLength)
        mod.setFunction('parabolaUp')
        this.beginRotation(mod, alternating, clockwise)
        break
      case 'parabolaDown':
        s = speed ?
            speed :
            10
        mod = new patternMath(s, patternLength)
        mod.setFunction('parabolaDown')
        this.beginRotation(mod, alternating, clockwise)
        break
      case 'random':
        s = speed ?
            speed :
            20
        mod = new patternMath(s)
        mod.setFunction('random')
        this.beginRotation(mod, alternating, clockwise)
        break
      case 'uniform':
        s = speed ?
            speed :
            25
        mod = new patternMath(s)
        mod.setFunction('uniform')
        this.beginRotation(mod, alternating, clockwise)
        break
    }
  }
  beginRotation(speedModObject, alternating, startClockwise) {
    let orbSelections = Array.from(new Array(this.orbitals.length), (x, i) => this.orbitals[i].orbitalContainer),
        clockwise = startClockwise,
        speedMod
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
