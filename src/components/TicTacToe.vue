<template>
  <div id="board" class="container">
    <h1 id="title">{{title}}</h1>
    <h3 id="status-message" v-bind:style="{ color: statusMessageColor }">{{statusMessage}}</h3>
    <div class="row border-b">
      <div class="col border-r" @click="placeAtBlock(0, 0)">{{drawBlock(ticTacToe.get(0, 0))}}</div>
      <div class="col border-r" @click="placeAtBlock(0, 1)">{{drawBlock(ticTacToe.get(0, 1))}}</div>
      <div class="col" @click="placeAtBlock(0, 2)">{{drawBlock(ticTacToe.get(0, 2))}}</div>
    </div>
    <div class="row border-b">
      <div class="col border-r" @click="placeAtBlock(1, 0)">{{drawBlock(ticTacToe.get(1, 0))}}</div>
      <div class="col border-r" @click="placeAtBlock(1, 1)">{{drawBlock(ticTacToe.get(1, 1))}}</div>
      <div class="col" @click="placeAtBlock(1, 2)">{{drawBlock(ticTacToe.get(1, 2))}}</div>
    </div>
    <div class="row">
      <div class="col border-r" @click="placeAtBlock(2, 0)">{{drawBlock(ticTacToe.get(2, 0))}}</div>
      <div class="col border-r" @click="placeAtBlock(2, 1)">{{drawBlock(ticTacToe.get(2, 1))}}</div>
      <div class="col" @click="placeAtBlock(2, 2)">{{drawBlock(ticTacToe.get(2, 2))}}</div>
    </div>
  </div>
</template>

<script>
import {TEAM_CIRCLE, TEAM_CROSS, TicTacToe} from '../service/TicTacToe'

export default {
  data () {
    return {
      title: 'Tic Tac Toe',
      statusMessage: 'Your Turn!',
      statusMessageColor: '#000000',
      ticTacToe: new TicTacToe()
    }
  },
  methods: {
    placeAtBlock: function (row, col) {
      if (!this.ticTacToe.isGameOver()) {
        try {
          this.ticTacToe.placeAtBlock(this.ticTacToe.currentTeam, row, col)
        } catch (e) {
          this.statusMessage = e.message
          this.statusMessageColor = '#ff0000'
          // clear the error message after a while
          setTimeout(() => {
            if (!this.ticTacToe.isGameOver()) {
              this.statusMessage = (this.ticTacToe.currentTeam === TEAM_CIRCLE ? 'Your' : 'Opponent\'s') + 'Turn'
              this.statusMessageColor = '#000000'
            }
          }, 2500)
        }

        // update the status message if the game is over
        if (this.ticTacToe.isGameOver() && !this.ticTacToe.winnerTeam) {
          this.statusMessage = 'Tie!'
          this.statusMessageColor = '#000000'
        } else if (this.ticTacToe.winnerTeam === TEAM_CIRCLE) {
          this.statusMessage = 'You Won!'
          this.statusMessageColor = '#0000FF'
        } else if (this.ticTacToe.winnerTeam === TEAM_CROSS) {
          this.statusMessage = 'You Lose!'
          this.statusMessageColor = '#FF0000'
        }
        // important, since the status changes in the ticTacToe instance won't refresh the view
        // we have to force it manually
        this.$forceUpdate()
      }
    },
    drawBlock: function (team) {
      return team === TEAM_CIRCLE ? 'O' : team === TEAM_CROSS ? 'X' : '-'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 320px;
    height: 320px;
    margin: 100px auto auto;
  }

  .container h1 {
    text-align: center;
    font-size: 50px;
  }

  .row {
    height: 100px;
  }

  .col {
    height: 100px;
    width: 100px;
    float: left;
    font-size: 100px;
    text-align: center;
    line-height: 100px;
  }

  .col:hover {
    background-color: lightgray;
  }

  .border-b {
    border-bottom: 10px solid black;
  }

  .border-r {
    border-right: 10px solid black;
  }

  .winner {
    color: blue;
  }
</style>
