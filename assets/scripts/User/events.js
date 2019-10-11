'use strict'

const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')
const gameEvents = require('../game/events')
const store = require('../store.js')

// UI Only Events

const loginSignupToggle = () => {
  // Prevent Page Refresh
  event.preventDefault()
  ui.loginSignupToggle()
}

const signInProcess = () => {
  ui.signInSuccessful()
  gameEvents.getGames()
}

const userSettingsShow = event => {
  // Prevent Page Refresh
  event.preventDefault()
  ui.userSettingsShow()
}

const backToMain = event => {
  // Prevent Page Refresh
  event.preventDefault()
  ui.backToMain()
}

// API based events.

// Sign in and Sign up logic and API content.
// Sign Up API Logic (Will trigger Sign In Logic.)
const onSignUp = event => {
  // Prevent Page Refresh
  event.preventDefault()
  // Retrieve Form Data.
  const form = event.target
  const formData = getFormFields(form)
  // Store Form Data to Store for Auto Sign In.
  store.signUpInfo = formData
  // Call Sign Up API
  api.signUp(formData)
    .then(onSignIn)
    .catch(ui.failureMessage)
}

// Sign In API Logic (Will trigger automatically after Sign In Logic)
const onSignIn = event => {
  // if there is sign-up data
  if (store.signUpInfo) {
    api.signIn(store.signUpInfo)
      .then(ui.signInSuccessful)
      .catch(ui.failureMessage)
  // trigger sign-in on sign-up
  } else {
    // Prevent Page Refresh
    event.preventDefault()
    // Retrieve form data for signin.
    const form = event.target
    const formData = getFormFields(form)
    api.signIn(formData)
      .then(ui.signInSuccessful)
      .catch(ui.failureMessage)
  }
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

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  loginSignupToggle,
  signInProcess,
  userSettingsShow,
  backToMain
}
