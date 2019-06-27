'use strict'

const store = require('./../store.js')

// persistant actions to push to multiple UI switches
const messageReset = function () {
  $('form').trigger('reset')
  $('#start-game-message').delay(2000).fadeOut(200)
}

const isGameOver = () => {
  const currentPlayer = store.turn
  const tokenLocation = store.session.game.cells
  console.log('Checking if ' + store.turn + ' has won')
  console.log(tokenLocation)
  if ((currentPlayer === tokenLocation[0] && currentPlayer === tokenLocation[1] && currentPlayer === tokenLocation[2]) ||
  (currentPlayer === tokenLocation[3] && currentPlayer === tokenLocation[4] && currentPlayer === tokenLocation[5]) ||
  (currentPlayer === tokenLocation[6] && currentPlayer === tokenLocation[7] && currentPlayer === tokenLocation[8]) ||
  (currentPlayer === tokenLocation[0] && currentPlayer === tokenLocation[3] && currentPlayer === tokenLocation[6]) ||
  (currentPlayer === tokenLocation[1] && currentPlayer === tokenLocation[4] && currentPlayer === tokenLocation[7]) ||
  (currentPlayer === tokenLocation[2] && currentPlayer === tokenLocation[5] && currentPlayer === tokenLocation[8]) ||
  (currentPlayer === tokenLocation[0] && currentPlayer === tokenLocation[4] && currentPlayer === tokenLocation[8]) ||
  (currentPlayer === tokenLocation[2] && currentPlayer === tokenLocation[4] && currentPlayer === tokenLocation[8])) {
    $('#game-board-alerts').show()
    $('#game-board-alerts').text(`Congrats! Player ${store.turn} is the winner!`)
    store.gameStatus = 'over'
    return true
  } else {
    return false
  }
}

// Execute the placement of game tokens
const placeToken = responseData => {
  const gameSpace = ($(event.target).attr('data-cell-index'))
  store.session.game.cells[gameSpace] = store.turn
  const currentGame = {
    index: gameSpace,
    value: store.turn,
    over: isGameOver()
  }
  store.current = currentGame
  // console.log('current', store.session)
  if (store.turn === 'X') {
    $(event.target).append('X').addClass('Taken')
    if (isGameOver()) {
    }
    store.turn = 'O'
  } else if (store.turn === 'O') {
    $(event.target).append('O').addClass('Taken')
    if (isGameOver()) {
      $('#game-board-alerts').show()
      $('#game-board-alerts').text(`Congrats! Player ${store.turn} is the winner!`)
    }
    store.turn = 'X'
  }
  return gameSpace
}
// Validate the selected game space hasn't already been selected.
const checkAvailableSpace = responseData => {
  if (store.gameStatus !== 'over') {
    $('#game-board-alerts').show()
    $('#game-board-alerts').text(`This space is already taken!`)
    $('#game-board-alerts').delay(2000).fadeOut(200)
  }
}

// Create a new game instance within Game API
const createGameSuccessful = responseData => {
  $('#start-game-message').show()
  $('#start-game-message').text(`Let's boogie!!!!`)
  $('#sign-up-message').removeClass('failure')
  $('#sign-up-message').addClass('success')
  $('.game-active').removeClass('hide')
  $('.game-inactive').addClass('hide')
  store.session = responseData
  store.turn = 'X'
  messageReset()
}

// Catchall if game is not able to be created.
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
  checkAvailableSpace,
  placeToken,
  isGameOver
}
