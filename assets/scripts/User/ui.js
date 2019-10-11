'use strict'

const store = require('./../store.js')

// Initial Formatting Functions.
let loginSetting = 'signUp'

// Message functionality
const messageReset = function () {
  // Remove any input.
  $('form').trigger('reset')
  // Remove user message.
  $('#user-messages').delay(2000).fadeOut(200)
}

const failureMessage = function () {
  // Set up user message formatting.
  $('#user-messages').removeClass('success').addClass('failure')
  // Display user message.
  $('#user-messages').show().text('Invalid: Try Again.')
  // Reset user message display.
  messageReset()
}

// Toggle Functionality
const loginSignupToggle = function () {
  // if the current page is 'Sign Up'
  if (loginSetting === 'signUp') {
    // change active classes for log in and sign up
    $('#log-in-screen').removeClass('inactive')
    $('#sign-up-screen').addClass('inactive')
    // change current page view
    loginSetting = 'logIn'
  // if the current page is 'Sign In'
  } else {
    // change active classes for log in and sign up
    $('#sign-up-screen').removeClass('inactive')
    $('#log-in-screen').addClass('inactive')
    // change current page view
    loginSetting = 'signUp'
  }
}

const signUpFailure = responseData => {
  // display failure message
  $('#user-messages').show().addClass('failure')
    .text(`Invalid: Try Again!`)
  // initiate message reset function
  messageReset()
}

const signInSuccessful = responseData => {
  // Save logged in user data to the store
  store.user = responseData.user
  // Show user message
  $('#global-messages').show()
  // ternary: if this is a new usere, show Welcome message.
  //          if a returning user, show Welcome Back message.
  store.signUpInfo.credentials.email === store.user.email ? $('#user-messages').text(`Welcome, ${responseData.user.email}`) : $('#user-messages').text(`Welcome back, ${responseData.user.email}`)
  $('.logged-in').removeClass('inactive')
  $('.log-in').addClass('inactive')
  $('.game-active').addClass('hide')
  messageReset()
}

const changePasswordSuccess = responseData => {
  $('#global-messages').show()
  $('#global-messages').text(`Nice work - You've updated your password.`)
  $('form').trigger('reset')
}

const changePasswordFailure = responseData => {
  $('#global-messages').show()
  $('#global-messages').text(`Uh oh, that didn't seem to work!`)
  $('form').trigger('reset')
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
  $('#global-messages').show()
  $('#global-messages'
  )
  $('.main').addClass('hide')
  $('.game-active').addClass('hide')
}

const backToMain = () => {
  $('.sub').addClass('hide')
  $('.main').removeClass('hide')
}

module.exports = {
  // Message Exports
  failureMessage,
  signUpFailure,
  signInSuccessful,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  loginSignupToggle,
  userSettingsShow,
  backToMain
}
