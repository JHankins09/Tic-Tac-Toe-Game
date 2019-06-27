'use strict'

const store = require('./../store.js')

// persistant actions to push to multiple UI switches
const messageReset = function () {
  $('form').trigger('reset')
  $('#start-game-message').delay(2000).fadeOut(200)
}

const moveCounter = []
// Validate the selected space is empty.
const checkAvailableSpace = responseData => {
  if (store.gameStatus !== 'over') {
    $('#game-board-alerts').show()
    $('#game-board-alerts').text(`This space is already taken!`)
    $('#game-board-alerts').delay(2000).fadeOut(200)
  }
}

// validate if the game has ended
const isGameOver = () => {
  const tokenLocation = store.session.game.cells
  const currentPlayer = store.turn
  console.log('Checking if ' + store.turn + ' has won')
  console.log(tokenLocation)

  // look for a winner
  if ((currentPlayer === tokenLocation[0] && currentPlayer === tokenLocation[1] && currentPlayer === tokenLocation[2]) ||
  (currentPlayer === tokenLocation[3] && currentPlayer === tokenLocation[4] && currentPlayer === tokenLocation[5]) ||
  (currentPlayer === tokenLocation[6] && currentPlayer === tokenLocation[7] && currentPlayer === tokenLocation[8]) ||
  (currentPlayer === tokenLocation[0] && currentPlayer === tokenLocation[3] && currentPlayer === tokenLocation[6]) ||
  (currentPlayer === tokenLocation[1] && currentPlayer === tokenLocation[4] && currentPlayer === tokenLocation[7]) ||
  (currentPlayer === tokenLocation[2] && currentPlayer === tokenLocation[5] && currentPlayer === tokenLocation[8]) ||
  (currentPlayer === tokenLocation[0] && currentPlayer === tokenLocation[4] && currentPlayer === tokenLocation[8]) ||
  (currentPlayer === tokenLocation[2] && currentPlayer === tokenLocation[4] && currentPlayer === tokenLocation[6])) {
    // display winner message and end game
    $('#game-board-alerts').show()
    $('#game-board-alerts').text(`Congrats! Player ${store.turn} is the winner!`)
    store.gameStatus = 'over'
    return true
    // look for all spaces to be occupied
  } else if (moveCounter.length === 9) {
    $('#game-board-alerts').show()
    $('#game-board-alerts').text('This game is a draw!')
    store.gameStatus = 'over'
    return true
  } else {}
  return false
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
    moveCounter.push('x')
    store.moveCounter = store.moveCounter + 1
    console.log(store.moveTracker + ' moves made')
    $('#player-tracker').text('')
    $('#player-tracker').text('Player ' + store.turn + 's turn!')
    if (isGameOver()) {
    }
    store.turn = 'O'
  } else if (store.turn === 'O') {
    $(event.target).append('O').addClass('Taken')
    moveCounter.push('o')
    store.moveCounter = store.moveCounter + 1
    console.log(store.moveTracker + ' moves made')
    if (isGameOver()) {
      $('#game-board-alerts').show()
      $('#game-board-alerts').text(`Congrats! Player ${store.turn} is the winner!`)
    }
    store.turn = 'X'
  }
  return gameSpace
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
  $('#player-tracker').text(`Player ${store.turn}, you are up!`)
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
