const TEAM_NONE = 0
const TEAM_CIRCLE = 1
const TEAM_CROSS = 2

export {TEAM_NONE, TEAM_CIRCLE, TEAM_CROSS}

export class TicTacToeError extends Error {
}

export class TicTacToe {
  _board
  currentTeam
  winnerTeam

  constructor () {
    this._init()
  }

  start () {
    this._init()
  }

  _init () {
    this._board = [[TEAM_NONE, TEAM_NONE, TEAM_NONE],
      [TEAM_NONE, TEAM_NONE, TEAM_NONE],
      [TEAM_NONE, TEAM_NONE, TEAM_NONE]]
    this.currentTeam = TEAM_CIRCLE
    this.winnerTeam = TEAM_NONE
  }

  get (row, col) {
    return this._board[row][col]
  }

  placeAtBlock (team, row, col) {
    if (this.winnerTeam !== TEAM_NONE) {
      throw new TicTacToeError('The game has been over.')
    }
    if (this.get(row, col) !== TEAM_NONE) {
      throw new TicTacToeError('The place should be empty.')
    }
    if (team !== TEAM_CIRCLE && team !== TEAM_CROSS) {
      throw new TicTacToeError('Invalid team.')
    }
    this._board[row][col] = team
    this._check3Connect(team, row, col)
    this._nextTeam()
  }

  _check3Connect (team, row, col) {
    if (this._board[0][col] === team && this._board[1][col] === team && this._board[2][col] === team) {
      this.winnerTeam = team
    } else if (this._board[row][0] === team && this._board[row][1] === team && this._board[row][2] === team) {
      this.winnerTeam = team
    } else if (this._board[0][0] === team && this._board[1][1] === team && this._board[2][2] === team) {
      this.winnerTeam = team
    } else if (this._board[0][2] === team && this._board[1][1] === team && this._board[2][0] === team) {
      this.winnerTeam = team
    }
  }

  isGameOver () {
    if (this.winnerTeam) {
      return true
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this._board[i][j] === TEAM_NONE) {
          return false
        }
      }
    }
    return true
  }

  _nextTeam () {
    this.currentTeam = this.currentTeam === TEAM_CIRCLE ? TEAM_CROSS : TEAM_CIRCLE
  }
}
