'use strict'

const store = require('./../store.js')

// persistant actions to push to multiple UI switches
const messageReset = function () {
  $('form').trigger('reset')
  $('#start-game-message').delay(2000).fadeOut(200)
  $('#see-record-message').delay(2000).fadeOut(200)
  $('#game-board-alert').delay(2000).fadeOut(200)
}

store.moveCounter = []
// Validate the selected space is empty.
const checkAvailableSpace = responseData => {
  if (store.gameStatus !== 'over') {
    $('#game-board-alerts').show()
    $('#global-messages').text(`This space is already taken!`)
    $('#game-board-alerts').delay(2000).fadeOut(200)
  } else {
    $('#game-board-alert').show()
    $('#game-board-alert').removeClass('hide')
    console.log('Click Registered')
    messageReset()
  }
}

// validate if the game has ended
const isGameOver = () => {
  const tokenLocation = store.session.game.cells
  const currentPlayer = store.turn

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
    $('#global-messages').text(`Congrats! Player ${store.turn} is the winner!`)
    $('.game-inactive').removeClass('hide')
    store.gameStatus = 'over'
    return true
    // look for all spaces to be occupied
  } else if (store.moveCounter.length === 9) {
    $('#game-board-alerts').show()
    $('#player-tracker').hide()
    $('#global-messages').text('This game is a draw!')
    $('.game-inactive').removeClass('hide')
    $('#player-tracker').addClass('hide')
    store.gameStatus = 'over'
    store.current.over = true
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
    store.moveCounter.push('x')
    $('#player-tracker').text('')
    $('#global-messages').text(`Player O, you are up! Make move ${store.moveCounter.length + 1}`)
    if (isGameOver()) {
    }
    store.turn = 'O'
  } else if (store.turn === 'O') {
    $(event.target).append('O').addClass('Taken')
    store.moveCounter.push('o')
    $('#player-tracker').text('')
    $('#global-messages').text(`Player X, you are up! Make move ${store.moveCounter.length + 1}`)
    if (isGameOver()) {
      $('#game-board-alerts').show()
      $('#game-board-alerts').text(`Congrats! Player ${store.turn} is the winner!`)
      $('.game-inactive').removeClass('hide')
    }
    store.turn = 'X'
  }
  return gameSpace
}

// Create a new game instance within Game API
const createGameSuccessful = responseData => {
  $('.game-active').removeClass('hide')
  $('.game-board').removeClass('hide')
  $('.game-inactive').addClass('hide')
  $('.initial-menu').addClass('hideForGood')
  $('.continue-menu').removeClass('hide')
  store.session = responseData
  store.turn = 'X'
  $('#global-messages').text(`Player ${store.turn}, you are up! Make move ${store.moveCounter.length + 1}`)
  messageReset()
  store.moveCounter = []
  $('#game-id').text(`Game #: ${store.session.game.id}`)
}

// Create New gameEvents
const createNewGame = response => {
  $('.game-active').removeClass('hide')
  $('.game-board').removeClass('hide')
  $('.game-inactive').addClass('hide')
  store.session = response
  store.turn = 'X'
  store.moveCounter = []
  $('#global-messages').text(`Player ${store.turn}, you are up! Make move ${store.moveCounter.length + 1}`)
  messageReset()
  $('.game-space').text('')
  $('#game-board-alerts').hide()
  store.current.over = false
  store.gameStatus = 'active'
  store.session.game.cells = ['', '', '', '', '', '', '', '', '']
  $('#game-id').text(`Game #: ${store.session.game.id}`)
}

// Catchall if game is not able to be created.
const createGameFailure = responseData => {
  $('#start-game-message').show()
  $('#start-game-message').text('Whoops... something went wrong')
  $('#start-game-message').removeClass('success')
  $('#start-game-message').addClass('failure')
  messageReset()
}

// Execute on retrieved games
const getGamesSuccessful = responseData => {
//   console.log(responseData)
}

const seeRecordSuccessful = responseData => {
  const gamesPlayed = responseData.games.length

  let wins = 0
  let ties = 0
  let losses = 0
  for (let i = 0; i < responseData.games.length; i++) {
    const playerIs = function () {
      const responseEmail = responseData.games[i].player_x.email
      const userEmail = store.user.email
      if (responseEmail === userEmail) {
        return 'X'
      } else {
        return 'Y'
      }
    }
    // console.log('Player is ' + playerIs())
    const gameData = responseData.games[i].cells
    const xValue = gameData.filter(value => value === 'X').length
    const yValue = gameData.filter(value => value === 'Y').length
    const gameWinner = function () {
      if (xValue > yValue) {
        return 'X'
      } else if (xValue < yValue) {
        return 'Y'
      } else if (xValue === yValue) {
        ties++
        return 'Tie'
      }
    }
    // console.log(gameWinner())
    if (playerIs() === gameWinner()) {
      wins++
    } else if (playerIs() === gameWinner()) {
      losses++
    }
  }

  $('#global-messages').text(`You have played ${gamesPlayed} games`)

  messageReset()
}

const gameOverClick = () => {
  $('#game-board-alert').show()
  $('#game-board-alert').removeClass('hide')
  messageReset()
}

module.exports = {
  createGameSuccessful,
  createGameFailure,
  checkAvailableSpace,
  placeToken,
  isGameOver,
  getGamesSuccessful,
  seeRecordSuccessful,
  createNewGame,
  gameOverClick
}
