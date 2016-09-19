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
                  numElectrons: 80,
                  idNumber: 1,
                  animationTime: 1000,
                  drawLabel: true
                })
let a2 = new Atom({
                   containerId: '#bohr-model-container-2',
                   nucleusRadius: 33,
                   numElectrons: 88,
                   idNumber: 2,
                   animationTime: 1800,
                   drawLabel: true
                 })
let a3 = new Atom({
                  containerId: '#bohr-model-container-3',
                  numElectrons: 88,
                  idNumber: 3,
                  animationTime: 1800,
                  drawLabel: true
                })
let a4 = new Atom({
                   containerId: '#bohr-model-container-4',
                   numElectrons: 100,
                   idNumber: 4,
                   animationTime: 1800
                 })
let a5 = new Atom({
                  containerId: '#bohr-model-container-5',
                  numElectrons: 93,
                  idNumber: 5,
                  animationTime: 1800
                })
let a6 = new Atom({
                   containerId: '#bohr-model-container-6',
                   numElectrons: 18,
                   idNumber: 6,
                   animationTime: 1800
                 })

a.rotateOrbitals({speed: 80, pattern: {preset:'cubed negative', alternating:false}})
a2.rotateOrbitals({speed: 15, pattern: {preset:'parabola down', alternating: false}})
a3.rotateOrbitals({speed: 10, pattern:{preset:'linear negative', clockwise: false}})
a4.rotateOrbitals({speed: 10, pattern:{preset:'linear positive'}})
a5.rotate({speed: 50})
a6.rotate({speed: 50, clockwise: true})
$("#addElectronButton").click(() => {a.addElectrons(1)})
$("#removeElectronButton").click(() => {a.removeElectrons(1)})
