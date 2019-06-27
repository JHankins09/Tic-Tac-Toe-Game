'use strict'

const store = require('./../store.js')

const messageReset = function () {
  $('form').trigger('reset')
  $('#sign-up-message').delay(2000).fadeOut(200)
  $('#sign-in-message').delay(2000).fadeOut(200)
  $('#change-pw-message').delay(2000).fadeOut(200)
  $('#sign-out-message').delay(2000).fadeOut(200)
  $('#start-game-message').delay(2000).fadeOut(200)
}

const placeToken = responseData => {
  $('#event.target.id').append('X')
}

const createGameSuccessful = responseData => {
  $('#start-game-message').show()
  $('#start-game-message').text(`Let's boogie!!!!`)
  $('#sign-up-message').removeClass('failure')
  $('#sign-up-message').addClass('success')
  $('.game-active').removeClass('hide')
  $('.game-inactive').addClass('hide')
  store.turn = 'X'
  messageReset()
}

const createGameFailure = responseData => {
  $('#start-game-message').show()
  $('#start-game-message').text('Whoops... something went wrong')
  $('#start-game-message').removeClass('success')
  $('#start-game-message').addClass('failure')
  messageReset()
}

module.exports = {
  createGameSuccessful,
  createGameFailure,
  placeToken
}
