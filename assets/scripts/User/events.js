'use strict'

const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')
const gameEvents = require('../game/events')

const signInProcess = () => {
  ui.signInSuccessful()
  gameEvents.getGames()
}

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData)
    .then(ui.signUpSuccessful)
    .catch(ui.signUpFailure)
}

const loginSignupToggle = () => {
  console.log('firing')
  event.preventDefault()
  ui.loginSignupToggle()
}

const signupLoginToggle = () => {
  event.preventDefault()
  ui.signupLoginToggle()
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.signInSuccessful)
    .catch(ui.signInFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const userSettingsShow = event => {
  event.preventDefault()
  ui.userSettingsShow()
}

const backToMain = event => {
  event.preventDefault()
  ui.backToMain()
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  loginSignupToggle,
  signupLoginToggle,
  signInProcess,
  userSettingsShow,
  backToMain
}
