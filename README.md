# Tic-Tac-Toe

## Getting Started

### Planning

#### Initial User Stories
* As a player, I want to see my play history so I can see how my performance stacks up game over game.

* As a player, I want to be able to use the app with as little effort as possible so I can use it at my leasure.

* As a player, I want to be able to easily play this game on my phone so I don't have to have a computer with me.

* As a player, I want to share my score with friends on social media!

* As an app owner, I want to make signing up as simple as possible to all the most number of people to enjoy my game.

* As a player, I want to know how I am doing in comparison to the other users.

* As a player, I want to select if I'm playing with a friend locally, online, or against a computer.

* As a player, I want to be able to select a dificulty so that I can challenge myself as I get better.


#### Initial Wire framing

https://app.moqups.com/4UD0R7wRns/view/page/ad64222d5

#### This project was planned to be built in 3 primary parts:
  1. Integration into API
  * Develop UI integration for web-based use of game
  * Enhance functionality to allow for progressive use via sign-in
  2. Development of GameEngine
    * Initial development of game logic leveraging JS
    * Restructure and segment game logic for easier future feature implimentation
  3. Styling and re-facing of UI
    * Optomize web useability
    * Impliment mobile UI
  4. Include additional bonus feature
    * Online competitive play
    * Difficulty setting (easy, medium, hard, challeng)

### Development Process

While a large poriton of application development was executed acording to the above, there are some significant changes
that would be recommended for future development/re-build.

  1. Development and execution of a game wireframe is highly encouraged.
    * By prioritizing the build of API integraiton, much of the functionality was either omitted, removed, or altered to accomidate for the actual game UI.
  1. JS Build Control.
    * Many functions in the GameEngine were built seperately, but at the point of implimentation were easier to apply as a singular function. This applies to many of the catch applications, such as 'Space already used' or 'Game over' alert notifications. This was built as a seperate listener based on current game surcumstance, however would have been better applied as an if/else to the origional functionality - namely as an if/then to game piece placement.


## Unresolved issues / features for future release

- AI bot
  * easy
  * medium
  * hard
  * challenge

- Responsive Design
  * Mobile UI
  * Tablet UI

- Interactive UI
  * Stronger form usage
  * Higher sign-up rate upon visit

- Automatic Sign In

- Custom Playing Tokens

- Recall / Finish incomplete games

- Session data
  * Session game counter and W/L/T record

- Multiplayer

- SEO enabled

## Built With (technologies used)

### The technologies include in the build of this game are:
- JavaScript
- JSON
- AJAX
- CSS
- HTML

## Versioning

### Scripts

#### Game
  This houses all AJAX and JS functionality that impacts actual game-play.

#### User
  This houses all AJAX and JS functionality that impacts user account creation, login, or changes.

### Branching

  #### API
    Used while implimenting any changes to API calls or event listeners directly related to user account creation or manipulation. This included:
      * Create account
      * Log-in
      * Log-out
      * Create Game
      * Retrieve game's played
      * Change Password

  #### GameEngine
    Used while applying game logic and UI functionality as reponse to event listeners/handlers firing. This includes all DOM changes rendered on screen such as:

      * Game token placement
      * All alert/messaging changes
      * screen changes
      * etc.

## Author
### James B. Hankins

LinkedIn:   https://www.linkedin.com/in/james-hankins/
GitHub:     https://github.com/JHankins09

## Acknowledgments
This project is built as the result of participating in General Assembly Boston's Software Engineering Immersive course.
