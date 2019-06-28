'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const userEvents = require('./user/events')
const gameEvents = require('./game/events')

$(() => {
  // Authentication listners
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#change-pw').on('submit', userEvents.onChangePassword)
  $('#sign-out').on('submit', userEvents.onSignOut)

  // In-active game instance listeners
  $('#start-game').on('submit', gameEvents.onCreateGame)
  $('#get-games').on('submit', gameEvents.onGetGames)
  $('#see-record').on('submit', gameEvents.onSeeRecord)
  $('#new-game').on('submit', gameEvents.onNewGame)
  // Active game listeners
  $('.game-space').on('click', gameEvents.onPlaceToken)

  $('#sign-up-sign-in-toggle').on('click', userEvents.loginSignupToggle)
  $('#sign-in-sign-up-toggle').on('click', userEvents.signupLoginToggle)
  $('#user-settings').on('click', userEvents.userSettingsShow)
  $('#back-to-main').on('click', userEvents.backToMain)
})
// $('#index-books').on('click', bookEvents.onGetBooks)
