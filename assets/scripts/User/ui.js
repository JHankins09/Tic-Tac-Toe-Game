'use strict'

const store = require('./../store.js')

let loginSetting = 'signUp'

const messageReset = function () {
  $('form').trigger('reset')
  $('#sign-up-message').delay(2000).fadeOut(200)
  $('#sign-in-message').delay(2000).fadeOut(200)
  $('#change-pw-message').delay(2000).fadeOut(200)
  $('#sign-out-message').delay(2000).fadeOut(200)
  $('#signed-up-message').delay(4000).fadeOut(400)
}

// refactor to apply toggle to home screen.
// const loginSignupToggle = function () {
//   if (loginSetting === 'signUp') {
//     $('#sign-up-screen').addClass('inactive')
//     $('#log-in-screen').removeClass('inactive')
//     console.log('WTF?')
//     loginSetting = 'logIn'
//   } else {
//     $('#log-in-screen').addClass('inactive')
//     $('#sign-up-screen').removeClass('inactove')
//     loginSetting = 'signUp'
//   }
// }

const loginSignupToggle = function () {
  if (loginSetting === 'signUp') {
    $('#sign-up-screen').addClass('inactive')
    console.log('Gone')
    loginSetting = 'logIn'
  } else {
    $('#sign-up-screen').removeClass('inactive')
    console.log('Back')
    loginSetting = 'signUp'
  }
}


const signUpSuccessful = responseData => {
  $('#signed-up-message').show()
  $('#signed-up-message').text(`Nice - you've signed up successfully! Now please sign in!`)
  $('#sign-up-message').removeClass('failure')
  $('#sign-up-message').addClass('success')
  loginSignupToggle()
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
  $('#global-messages').show('')
  $('#global-messages').text(`Welcome ${responseData.user.email}, ready to play some Tic-Tac-Toe?`)
  store.user = responseData.user
  $('.logged-in').removeClass('hide')
  $('.sign-in-screen').addClass('hide')
  $('.game-active').addClass('hide')
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
  signUpSuccessful,
  signUpFailure,
  signInSuccessful,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  loginSignupToggle,
  userSettingsShow,
  backToMain
}
