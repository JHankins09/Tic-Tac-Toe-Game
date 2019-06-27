#!/bin/bash

<<<<<<< HEAD
curl "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-type: application/json" \
  --data '{
    "game": {
      "cell": {
        "index": "'"${INDEX}"'",
        "value": "'"${VALUE}"'"
      },
      "over": false
    }
  }'
=======
curl "https://tic-tac-toe-wdi.herokuapp.com/games" \
--include \
--request POST \
--header "Authorization: Token token=${TOKEN}" \
--header "Content-type: application/json" \
>>>>>>> GameEngine

echo
