# atomic-bohr-model
This d3 powered visualization package provides atomic animations which are highly
customizable.

## Features
* Responsive
* Built with d3.js in ES6
* Easily modified nucleus, orbital, and electron radii
* Animated initialization
* Orbital rotational patterns:
  * `linearPositive`
  * `linearNegative`
  * `cubedPositive`
  * `cubedNegative`
  * `parabolaUp`
  * `parabolaDown`
  * `random`
  * `uniform`
* Orbital patterns can be entirely clockwise, counter-clockwise, or alternating
* "Address" system provides distinct ID's for each component of the Atom (Helpful for animation and styling)
* Wikipedia summary and links provided for each Atom object
* Electron configurations provided by https://en.wikipedia.org/wiki/Electron_shell

## Installation
`npm install atomic-bohr-model --save`

## Usage

Include this script element in your mark-up:
```html
<script type="text/javascript" src="./node_modules/atomic-bohr-model/dist/atomicBohrModel.min.js" charset="utf-8"></script>
```

along with a div to contain your atom.
```html
<div id="bohr-model-container" class='atom-row'></div>`
```

**You MUST ensure your div has a width and height**


These atoms are restricted to those which exist and have been discovered therefore:

> 1 <= numElectrons <= 118

At minimum numElectrons, containerId, and a unique idNumber must be provided.


```javascript
var atomicConfig = {
  containerId: "#bohr-model-container",
  numElectrons: 88,
  idNumber: 1
}

var myAtom = new Atom(atomicConfig)
```
Provided a div with width and height, the atom will situate itself dead center and be responsive throughout.

---

## Options

```javascript
var myAtom = new Atom({
  containerId: '#my-container',
  numElectrons: 1, // An integer between 1 and 118
  nucleusRadius: 30, // If not supplied will be 1/12 of the containers width
  nucleusColor: 'rgba(124,240,10,0.5)', // Hex, string or rbga
  electronRadius: 3, // Default value is 3
  electronColor: 'blue', // See nucleusColor
  orbitalSpacing: 10, // If not specified will be a 1/3rd of the nucleusRadius
  idNumber: 1, // Required int to provide unique Atoms
  animationTime: 1300, // Time in milliseconds for initial electron animation
  rotateConfig: {speed: 50, clockwise: true}, // Rotates entire Atom with given params
  orbitalRotationConfig: { // Invokes orbital rotations at initialization
    pattern: {
      alternating: false, // Alternate orbital direction
      clockwise: false, // Direction for all orbitals
      preset: 'cubedPositive', // String to set pattern (see Features section)
    }
  },
  symbolOffset: 8, // When modifying nucleus radius this may need adjusting
  drawSymbol: true // Render atomic symbol or not
})
```

---

## Methods


```javascript
myAtom.removeElectrons(2)
```
Removes a given number of electrons

```javascript
myAtom.addElectrons(7)
```
Adds a given number of electrons

```javascript
myAtom.setNumElectrons(33)
```
Sets the number of electrons

```javascript
var orbitalRotationConfig = {
  pattern: {
    alternating: true,
    clockwise: false,
    preset: 'parabolaUp',
  }
}
myAtom.rotateOrbitals(orbitalRotationConfig)
```
Rotates orbitals with given configuration

```javascript
myAtom.destroy()
```
Destroys the <g> element housing the Atom, but NOT the parent <svg>

```javascript
var rotateConfig = {speed: 50, clockwise: true}
myAtom.rotate(rotateConfig))
```
Rotates entire atom with given configuration
