'use strict'

const config = require('./../config.js')
const store = require('./../store.js')

// API call to create a new game
const createGame = formData => {
  return $.ajax({
    url: config.apiUrl + '/games',
    data: formData,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// API call to update game
const updateGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.session.game.id,
    data: {
      'game': {
        'cell': {
          'index': store.current.index,
          'value': store.current.value
        },
        'over': false
      }
    },
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// API call to get a gameEvents
const getGame = (id) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// In Process
const getGames = formData => {
  return $.ajax({
    url: config.apiUrl + '/games',
    data: formData,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getGames,
  createGame,
  updateGame,
  getGame
}
