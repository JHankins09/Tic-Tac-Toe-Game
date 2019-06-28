'use strict'

const store = require('./../store.js')

// persistant actions to push to multiple UI switches
const messageReset = function () {
  $('form').trigger('reset')
  $('#start-game-message').delay(2000).fadeOut(200)
  $('#see-record-message').delay(2000).fadeOut(200)
}

store.moveCounter = []
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
  console.log('Checking if ' + store.turn + ' has won', currentPlayer, tokenLocation)
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
    $('#player-tracker').hide()
    console.log(tokenLocation)
    store.gameStatus = 'over'
    return true
    // look for all spaces to be occupied
  } else if (store.moveCounter.length === 9) {
    $('#game-board-alerts').show()
    $('#player-tracker').hide()
    $('#game-board-alerts').text('This game is a draw!')
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
    $('#player-tracker').text(`Player O, you are up! Make move ${store.moveCounter.length + 1}`)
    if (isGameOver()) {
    }
    store.turn = 'O'
  } else if (store.turn === 'O') {
    $(event.target).append('O').addClass('Taken')
    store.moveCounter.push('o')
    $('#player-tracker').text('')
    $('#player-tracker').text(`Player X, you are up! Make move ${store.moveCounter.length + 1}`)
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
  $('#player-tracker').text(`Player ${store.turn}, you are up! Make move ${store.moveCounter.length + 1}`)
  messageReset()
  console.log(store.session.game.cells)
  store.moveCounter = []
}

// Create New gameEvents
const createNewGame = response => {
  $('#start-game-message').show()
  $('#start-game-message').text(`Let's boogie!!!!`)
  $('#sign-up-message').removeClass('failure')
  $('#sign-up-message').addClass('success')
  $('.game-active').removeClass('hide')
  $('.game-inactive').addClass('hide')
  store.session = response
  store.turn = 'X'
  $('#player-tracker').text(`Player ${store.turn}, you are up! Make move ${store.moveCounter.length + 1}`)
  messageReset()
  console.log(store.session.game.cells)
  $('.game-space').text('')
  $('#game-board-alerts').hide()
  store.current.over = false
  store.gameStatus = 'active'
  store.session.game.cells = ['', '', '', '', '', '', '', '', '']
  store.moveCounter = []
  $('#player-tracker').show()
  $('#player-tracker').text(`Player X, you are up! Make move ${store.moveCounter.length + 1}`)
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
  console.log(responseData)
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
    console.log('Player is ' + playerIs())
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
    console.log(gameWinner())
    if (playerIs() === gameWinner()) {
      wins++
    } else if (playerIs() === gameWinner()) {
      losses++
    }
  }

  console.log('wins = ', wins, 'losses = ', losses, 'ties = ', ties)
  $('#see-record-message').show()
  $('#see-record-message').html(`<p>Games played - ${gamesPlayed}`)

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
  createNewGame
}
