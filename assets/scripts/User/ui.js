'use strict'

const store = require('./../store.js')

const messageReset = function () {
  $('form').trigger('reset')
  $('#sign-up-message').delay(2000).fadeOut(200)
  $('#sign-in-message').delay(2000).fadeOut(200)
  $('#change-pw-message').delay(2000).fadeOut(200)
  $('#sign-out-message').delay(2000).fadeOut(200)
}

const loginSignupToggle = function () {
  $('.sign-up').addClass('inactive')
  $('.sign-in').removeClass('inactive')
}

const signupLoginToggle = function () {
  $('.sign-up').removeClass('inactive')
  $('.sign-in').addClass('inactive')
}

const signUpSuccessful = responseData => {
  $('#signed-up-message').show()
  $('#signed-up-message').text(`Nice - you've signed up successfully! Now please sign in!`)
  $('#sign-up-message').removeClass('failure')
  $('#sign-up-message').addClass('success')
  loginSignupToggle()
}

const signUpFailure = responseData => {
  $('#sign-up-message').show()
  $('#sign-up-message').text(`Oops! Something went wrong. Try signing in!`)
  $('#sign-up-message').removeClass('success')
  $('#sign-up-message').addClass('failure')
  messageReset()
}

const signInSuccessful = responseData => {
  $('#global-messages').show()
  $('#global-messages').text(`Welcome ${responseData.user.email}, ready to play some Tic-Tac-Toe?`)
  store.user = responseData.user
  $('.logged-in').removeClass('hide')
  $('.sign-in-screen').addClass('hide')
  messageReset()
}

const signInFailure = responseData => {
  $('#sign-in-message').show()
  $('#sign-in-message').text(`Oops! Something went wrong. Give that another shot!`)
  $('#sign-in-message').removeClass('success')
  $('#sign-in-message').addClass('failure')
  messageReset()
}

const changePasswordSuccess = responseData => {
  $('#change-pw-message').show()
  $('#change-pw-message').text(`Nice work - You've updated your password.`)
  $('#change-pw-message').removeClass('failure')
  $('#change-pw-message').addClass('success')
}

const changePasswordFailure = responseData => {
  $('#change-pw-message').show()
  $('#change-pw-message').text(`Uh oh, that didn't seem to work!`)
  $('#change-pw-message').removeClass('success')
  $('#change-pw-message').addClass('failure')
}

const signOutSuccess = responseData => {
  $('.logged-in').addClass('hide')
  $('.sign-in-screen').removeClass('hide')
  $('.sign-up').removeClass('inactive')
  $('.sign-in').addClass('inactive')
  messageReset()
}

const signOutFailure = resposeData => {
  $('#sign-out-message').show()
  $('#sign-out-message').text('Uh oh - something went terribly wrong!')
  $('#sign-out-message').removeClass('success')
  $('#sign-out-message').addClass('failure')
}

const userSettingsShow = () => {
  $('.sub').removeClass('hide')
  $('.main').addClass('hide')
  $('.game-active').addClass('hide')
}

const backToMain = () => {
  $('.sub').addClass('hide')
  $('.main').removeClass('hide')
}

module.exports = {
  signUpSuccessful,
  signUpFailure,
  signInSuccessful,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  loginSignupToggle,
  signupLoginToggle,
  userSettingsShow,
  backToMain
}
