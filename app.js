const d3 = require('d3')
import Atom from './atom'
import $ from 'jquery'
import jQuery from 'jquery'

window.$ = $
window.jQuery = jQuery
window.d3 = d3

let a = new Atom("#bohr-model-container", 23, 12)  // Max is 118 e-
