'use strict'

// const store = require('./../store.js')

let whoseTurn = 'X'

const makeMove = function () {
  $('.col-r').text('X')
  whoseTurn = 'O'
  return whoseTurn
}

module.exports = {
  makeMove,
  whoseTurn
}
