'use strict'

// const getFormFields = require('./../../../lib/get-form-fields.js')
// const api = require('./api')
const ui = require('./ui')
const api = require('./api')
const store = require('./../store.js')

// const store = require('./../store.js')

// action to execute when a game space is selected
const onPlaceToken = event => {
  if (ui.isGameOver() === true) {
  } else {
    if ((event.target).innerHTML) {
      ui.checkAvailableSpace()
    } else if (store.gameStatus !== 'over') {
      console.log(store.gameStatus)
      console.log('Game status before token placed', ui.isGameOver())
      ui.placeToken()
      api.updateGame()
    }
  }
}

// action to execute when 'start game' is selected
const onCreateGame = event => {
  event.preventDefault()
  api.createGame()
    .then(ui.createGameSuccessful)
    .catch(ui.createGameFailure)
}

// in process.
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
