'use strict'

// const getFormFields = require('./../../../lib/get-form-fields.js')
// const api = require('./api')
const ui = require('./ui')
const api = require('./api')
const store = require('./../store.js')

// const makeMove = event => {
//   !$('#box11').class ? ui.signUpSuccessful : .catch(ui.signUpFailure)
// }

const onPlaceToken = event => {
  if ((event.target).innerHTML) {
    $('#game-board-alerts').show()
    $('#game-board-alerts').text(`This space is already taken!`)
    $('#game-board-alerts').delay(2000).fadeOut(200)
  } else if (store.turn === 'X') {
    $(event.target).append('X').addClass('Taken')
    store.turn = 'O'
  } else if (store.turn === 'O') {
    $(event.target).append('O').addClass('Taken')
    store.turn = 'X'
  }
}

const onCreateGame = event => {
  event.preventDefault()
  api.createGame()
    .then(ui.createGameSuccessful)
    .catch(ui.createGameFailure)
}

const onGetGames = event => {
  event.preventDefault()
  api.getGames()
    .then(console.log(event))
    .catch(console.error)
}

module.exports = {
  onPlaceToken,
  onGetGames,
  onCreateGame
}
