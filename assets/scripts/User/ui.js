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
  $('#sign-up').addClass('inactive')
  $('#sign-in').removeClass('inactive')
}

const signupLoginToggle = function () {
  $('#sign-up').removeClass('inactive')
  $('#sign-in').addClass('inactive')
}

const signUpSuccessful = responseData => {
  $('#sign-up-message').show()
  $('#sign-up-message').text(`Welcome ${responseData.user.email}, you've signed up successfully!`)
  $('#sign-up-message').removeClass('failure')
  $('#sign-up-message').addClass('success')
  messageReset()
}

const signUpFailure = responseData => {
  $('#sign-up-message').show()
  $('#sign-up-message').text(`Oops! Something went wrong. Try signing in!`)
  $('#sign-up-message').removeClass('success')
  $('#sign-up-message').addClass('failure')
  messageReset()
}

const signInSuccessful = responseData => {
  $('#sign-in-message').show()
  $('#sign-in-message').text(`Welcome back ${responseData.user.email}, ready to play some more?`)
  $('#sign-in-message').removeClass('failure')
  $('#sign-in-message').addClass('succes')
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
  $('#sign-out-message').show()
  $('#sign-out-message').text('Thanks for playing!')
  $('#sign-out-message').removeClass('failure')
  $('#sign-out-message').addClass('success')
}

const signOutFailure = resposeData => {
  $('#sign-out-message').show()
  $('#sign-out-message').text('Uh oh - something went terribly wrong!')
  $('#sign-out-message').removeClass('success')
  $('#sign-out-message').addClass('failure')
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
  signupLoginToggle
}
