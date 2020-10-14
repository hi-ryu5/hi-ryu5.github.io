'use strict'

const rand = (min,max) => {
  return Math.floor( Math.random() * (max + 1 - min) ) + min
}