const d3 = require('d3')
import Atom from './atom'
import Electron from './electron'
import $ from 'jquery'
import jQuery from 'jquery'

class DrawModel {
  constructor(d3Selection) {
    this.atom = new Atom(d3.select(d3Selection), 2)
  }
}

new DrawModel("#bohr-model-container")
