'use strict'

// const getFormFields = require('./../../../lib/get-form-fields.js')
// const api = require('./api')
const ui = require('./ui')
const api = require('./api')

// const makeMove = event => {
//   !$('#box11').class ? ui.signUpSuccessful : .catch(ui.signUpFailure)
// }

const onClick = event => {
  console.log(event)
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
  onClick,
  onGetGames,
  onCreateGame
}
