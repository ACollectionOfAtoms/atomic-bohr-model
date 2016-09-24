export function positiveParabolaUp(num) {  //(x - 10)**2
  return Math.pow((10 - num), 2)
}
export function positiveParabolaDown(num) { // -(x - 10)**2 + 100
  return -Math.pow((10 -num), 2) + 100
}
export function cubedNegative(num) { // x^-3
  return Math.pow(num, -3)
}
export function cubedPositive(num) { //x^3
  return Math.pow(num, 3)
}
// these are included to adhere to pattern; clarity
export function linearPositive(num) { // y = x
  return num
}
export function linearNegative(num) { // y = -x
  return 101-num
}
