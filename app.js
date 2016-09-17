const d3 = require('d3')
import Atom from './atom'
import $ from 'jquery'
import jQuery from 'jquery'

window.$ = $
window.jQuery = jQuery
window.d3 = d3

let a = new Atom({
                  containerId: '#bohr-model-container',
                  numElectrons: 22,
                  idNumber: 1
                })  // Max is 118 e-
let a2 = new Atom({
                   containerId: '#bohr-model-container-2',
                   numElectrons: 55,
                   idNumber: 2
                 })
 $("#addElectronButton").click(() => {a.addElectrons(1)})
 $("#removeElectronButton").click(() => {a.removeElectrons(1)})
