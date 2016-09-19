const d3 = require('d3')
import Atom from './atom'
import $ from 'jquery'
import jQuery from 'jquery'

window.$ = $
window.jQuery = jQuery
window.d3 = d3

let a = new Atom({
                  containerId: '#bohr-model-container',
                  nucleusRadius: 33,
                  numElectrons: 32,
                  idNumber: 1,
                  animationTime: 1000,
                  drawLabel: true
                })
let a2 = new Atom({
                   containerId: '#bohr-model-container-2',
                   nucleusRadius: 33,
                   numElectrons: 69,
                   idNumber: 2,
                   animationTime: 1800,
                   drawLabel: true
                 })
let a3 = new Atom({
                  containerId: '#bohr-model-container-3',
                  nucleusRadius: 33,
                  numElectrons: 88,
                  idNumber: 3,
                  animationTime: 1800,
                  drawLabel: true
                })
let a4 = new Atom({
                   containerId: '#bohr-model-container-4',
                   nucleusRadius: 33,
                   numElectrons: 100,
                   idNumber: 4,
                   animationTime: 1800,
                   drawLabel: true
                 })
let a5 = new Atom({
                  containerId: '#bohr-model-container-5',
                  nucleusRadius: 33,
                  numElectrons: 88,
                  idNumber: 5,
                  animationTime: 1800,
                  drawLabel: true
                })
let a6 = new Atom({
                   containerId: '#bohr-model-container-6',
                   nucleusRadius: 33,
                   numElectrons: 118,
                   idNumber: 6,
                   animationTime: 1800,
                   drawLabel: true
                 })

a.rotateOrbitals({speed: 10, pattern: {preset:'linearPositive', alternating:false}})
a2.rotateOrbitals({speed: 10, pattern: {preset:'linearNegative', alternating: false}})
a3.rotateOrbitals({speed: 25, pattern:{preset:'cubedPositive', clockwise: false}})
a4.rotateOrbitals({speed: 50, pattern:{preset:'cubedNegative'}})
a5.rotateOrbitals({speed: 5, pattern:{preset: 'parabolaUp'}})
a6.rotateOrbitals({speed: 5, pattern:{preset: 'parabolaDown'}})
$("#addElectronButton").click(() => {a.addElectrons(1)})
$("#removeElectronButton").click(() => {a.removeElectrons(1)})
