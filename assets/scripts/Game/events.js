'use strict'

// const getFormFields = require('./../../../lib/get-form-fields.js')
// const api = require('./api')
const ui = require('./ui')
const api = require('./api')
const store = require('./../store.js')

// const store = require('./../store.js')

// action to execute when a game space is selected
const onPlaceToken = event => {
  // if (ui.isGameOver() === true) {
  // } else {
    if ((event.target).innerHTML) {
      ui.checkAvailableSpace()
    } else if (store.gameStatus !== 'over') {
      ui.placeToken()
      api.updateGame()
    } else {
      ui.gameOverClick()
    }
  }
// }

// action to execute when 'start game' is selected
const onCreateGame = event => {
  event.preventDefault()
  api.createGame()
    .then(ui.createGameSuccessful)
    .catch(ui.createGameFailure)
}

// action to execute to start a new gameEvents
const onNewGame = event => {
  event.preventDefault()
  api.newGame()
    .then(ui.createNewGame)
    .catch(console.error)
}

// in process.
const onGetGames = event => {
  event.preventDefault()
  api.getGames()
    .then(ui.getGamesSuccessful)
    .catch(console.error)
}

const onSeeRecord = event => {
  event.preventDefault()
  api.getRecord()
    .then(ui.seeRecordSuccessful)
    .catch(console.error)
}

module.exports = {
  onPlaceToken,
  onGetGames,
  onCreateGame,
  onSeeRecord,
  onNewGame
}
