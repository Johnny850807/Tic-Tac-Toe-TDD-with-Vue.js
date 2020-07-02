import {
  TEAM_CIRCLE,
  TEAM_NONE,
  TEAM_CROSS,
  TicTacToe
} from '../../../src/service/TicTacToe'

let ticTacToe

beforeEach(() => {
  ticTacToe = new TicTacToe()
  ticTacToe.start()
})

test('When the game started, the board should be empty.', () => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      expect(ticTacToe.get(row, col)).toBe(TEAM_NONE)
    }
  }
})

test('When the game restarted, the statuses should be cleared.', () => {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 0)
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 1)
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 2)
  ticTacToe.start()
  expect(ticTacToe.get(0, 0)).toBe(TEAM_NONE)
  expect(ticTacToe.winnerTeam).toBe(TEAM_NONE)
  expect(ticTacToe.currentTeam).toBe(TEAM_CIRCLE)
})

test('When the game started, The circle side player takes the first turn.', () => {
  expect(ticTacToe.currentTeam).toBe(TEAM_CIRCLE)
})

test('When player chooses a empty block to place, the placement should succeed', () => {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 0)
  expect(ticTacToe.get(0, 0)).toBe(TEAM_CIRCLE)
})

test('When player chooses a non-empty block to place, error thrown', () => {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 0)
  expect(() => {
    ticTacToe.placeAtBlock(TEAM_CROSS, 0, 0) // repeatedly place twice so this will be invalid
  }).toThrow(Error)
})

test('When place with a non-existing team, error thrown', () => {
  expect(() => {
    ticTacToe.placeAtBlock(1000 /* non-existing team */, 0, 0)
  }).toThrow(Error)
})

test('When the placement succeeds, the current team is switched', () => {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 0)
  expect(ticTacToe.currentTeam).toBe(TEAM_CROSS)

  ticTacToe.placeAtBlock(TEAM_CROSS, 0, 1)
  expect(ticTacToe.currentTeam).toBe(TEAM_CIRCLE)
})

test('When 3-connect in a row, the team wins', () => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      ticTacToe.placeAtBlock(TEAM_CIRCLE, row, col)
      if (ticTacToe.winnerTeam) {
        expect(ticTacToe.winnerTeam).toBe(TEAM_CIRCLE)
      } else {
        // mock the opponent's placement at the other row
        ticTacToe.placeAtBlock(TEAM_CROSS, (row + 1) % 3, col)
      }
    }
    ticTacToe.start() // restart to clear the board
  }
})

test('When 3-connect in a column, the team wins', () => {
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 3; row++) {
      ticTacToe.placeAtBlock(TEAM_CIRCLE, row, col)
      if (ticTacToe.winnerTeam) {
        expect(ticTacToe.winnerTeam).toBe(TEAM_CIRCLE)
      } else {
        // mock the opponent's placement at the other row
        ticTacToe.placeAtBlock(TEAM_CROSS, row, (col + 1) % 3)
      }
    }
    ticTacToe.start() // restart to clear the board
  }
})

test('When 3-connect in a right diagonal, the team wins', () => {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 0)
  ticTacToe.placeAtBlock(TEAM_CROSS, 2, 0) // simulate opponent
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 1, 1)
  ticTacToe.placeAtBlock(TEAM_CROSS, 2, 1) // simulate opponent
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 2, 2)
  expect(ticTacToe.winnerTeam).toBe(TEAM_CIRCLE)
})

test('When 3-connect in a left diagonal, the team wins', () => {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 2)
  ticTacToe.placeAtBlock(TEAM_CROSS, 0, 0) // simulate opponent
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 1, 1)
  ticTacToe.placeAtBlock(TEAM_CROSS, 1, 0) // simulate opponent
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 2, 0)
  expect(ticTacToe.winnerTeam).toBe(TEAM_CIRCLE)
})

test('Given a tie game, when invoke isGameOver, should return true', () => {
  givenTieGame()
  expect(ticTacToe.isGameOver()).toBe(true)
})

test('Given a game that Circle wins, when invoke isGameOver, should return true', () => {
  givenGameThatCircleWins()
  expect(ticTacToe.isGameOver()).toBe(true)
})

test('Given a tie game, the winner team should be none', () => {
  givenTieGame()
  expect(ticTacToe.winnerTeam).toBe(TEAM_NONE)
})

test('Given a tie game, when places at any block, throw error', () => {
  givenTieGame()

  expect(() => ticTacToe.placeAtBlock(TEAM_CIRCLE, 1, 1))
    .toThrow(Error)
})

function givenGameThatCircleWins () {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 2)
  ticTacToe.placeAtBlock(TEAM_CROSS, 0, 0) // simulate opponent
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 1, 1)
  ticTacToe.placeAtBlock(TEAM_CROSS, 1, 0) // simulate opponent
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 2, 0)
}

test('Given a game the Circle wins, when places at any block, throw error', () => {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 2)
  ticTacToe.placeAtBlock(TEAM_CROSS, 0, 0) // simulate opponent
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 1, 1)
  ticTacToe.placeAtBlock(TEAM_CROSS, 1, 0) // simulate opponent
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 2, 0)

  expect(() => ticTacToe.placeAtBlock(TEAM_CIRCLE, 1, 1))
    .toThrow(Error)
})

function givenTieGame () {
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 0)
  ticTacToe.placeAtBlock(TEAM_CROSS, 0, 1)
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 0, 2)
  ticTacToe.placeAtBlock(TEAM_CROSS, 1, 0)
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 1, 1)
  ticTacToe.placeAtBlock(TEAM_CROSS, 1, 2)
  ticTacToe.placeAtBlock(TEAM_CROSS, 2, 0)
  ticTacToe.placeAtBlock(TEAM_CIRCLE, 2, 1)
  ticTacToe.placeAtBlock(TEAM_CROSS, 2, 2)
}
