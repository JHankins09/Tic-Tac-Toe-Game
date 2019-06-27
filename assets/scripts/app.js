'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const userEvents = require('./user/events')
const gameEvents = require('./game/events')

$(() => {
  // your JS code goes here

  // Authentication listners
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#change-pw').on('submit', userEvents.onChangePassword)
  $('#sign-out').on('submit', userEvents.onSignOut)

  // Game instance listeners
  $('#start-game').on('submit', gameEvents.onCreateGame)
  $('#get-games').on('submit', gameEvents.onGetGames)

  $('.col-4').on('click', gameEvents.onPlaceToken)
})
// $('#index-books').on('click', bookEvents.onGetBooks)
