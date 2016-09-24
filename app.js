const d3 = require('d3')
import Atom from './atom'
import $ from 'jquery'
import jQuery from 'jquery'

window.$ = $
window.jQuery = jQuery
window.d3 = d3

let a = new Atom({
                  containerId: '#bohr-model-container',
                  nucleusRadius: 30,
                  numElectrons: 118,
                  idNumber: 1,
                  animationTime: 1800,
                  drawLabel: true,
                  orbitalRotationConfig: {pattern:
                                            {preset:'parabolaUp',
                                             clockwise: false
                                           }
                                         }
                })
let a2 = new Atom({
                   containerId: '#bohr-model-container-2',
                   nucleusRadius: 30,
                   numElectrons: 100,
                   idNumber: 2,
                   animationTime: 800,
                   drawLabel: true
                 })
let a3 = new Atom({
                  containerId: '#bohr-model-container-3',
                  nucleusRadius: 30,
                  numElectrons: 3,
                  idNumber: 3,
                  animationTime: 1800,
                  drawLabel: true
                })
let a4 = new Atom({
                   containerId: '#bohr-model-container-4',
                   nucleusRadius: 30,
                   numElectrons: 4,
                   idNumber: 4,
                   animationTime: 1800,
                   drawLabel: true
                 })
let a5 = new Atom({
                  containerId: '#bohr-model-container-5',
                  nucleusRadius: 30,
                  numElectrons: 5,
                  idNumber: 5,
                  animationTime: 1800,
                  drawLabel: true
                })
let a6 = new Atom({
                   containerId: '#bohr-model-container-6',
                   nucleusRadius: 30,
                   numElectrons: 6,
                   idNumber: 6,
                   animationTime: 1800,
                   drawLabel: true
                 })
 let a7 = new Atom({
                   containerId: '#bohr-model-container-7',
                   nucleusRadius: 30,
                   numElectrons: 7,
                   idNumber: 7,
                   animationTime: 1800,
                   drawLabel: true
                 })
 let a8 = new Atom({
                    containerId: '#bohr-model-container-8',
                    nucleusRadius: 30,
                    numElectrons: 8,
                    idNumber: 8,
                    animationTime: 1800,
                    drawLabel: true
                  })
 let a9 = new Atom({
                   containerId: '#bohr-model-container-9',
                   nucleusRadius: 30,
                   numElectrons: 9,
                   idNumber: 9,
                   animationTime: 1800,
                   drawLabel: true
                 })
 let a10 = new Atom({
                    containerId: '#bohr-model-container-10',
                    nucleusRadius: 30,
                    numElectrons: 10,
                    idNumber: 10,
                    animationTime: 1800,
                    drawLabel: true
                  })
 let a11 = new Atom({
                   containerId: '#bohr-model-container-11',
                   nucleusRadius: 30,
                   numElectrons: 11,
                   idNumber: 11,
                   animationTime: 1800,
                   drawLabel: true
                 })
 let a12 = new Atom({
                    containerId: '#bohr-model-container-12',
                    nucleusRadius: 30,
                    numElectrons: 12,
                    idNumber: 12,
                    animationTime: 1800,
                    drawLabel: true
                  })

a2.rotateOrbitals({pattern: {preset:'cubedNegative'}})
a3.rotateOrbitals({pattern:{preset:'cubedPositive', alternating: true}})
a4.rotateOrbitals({pattern:{preset:'cubedNegative', alternating: true}})
a5.rotateOrbitals({pattern:{preset: 'uniform', alternating: true}})
a6.rotateOrbitals({pattern:{preset: 'uniform', alternating: true}})
a7.rotateOrbitals({pattern: {preset:'linearPositive'}})
a8.rotateOrbitals({pattern: {preset:'linearNegative'}})
a9.rotateOrbitals({pattern:{preset:'cubedPositive'}})
a10.rotateOrbitals({pattern:{preset:'cubedNegative'}})
a11.rotateOrbitals({pattern:{preset: 'parabolaUp'}})
a12.rotateOrbitals({pattern:{preset: 'parabolaDown'}})
$("#addElectronButton").click(() => {a.addElectrons(1)})
$("#removeElectronButton").click(() => {a.removeElectrons(1)})
