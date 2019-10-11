'use strict'

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

  $('.sign-in-toggle').on('click', userEvents.loginSignupToggle)
  $('#user-settings').on('click', userEvents.userSettingsShow)
  $('#back-to-main').on('click', userEvents.backToMain)
})
