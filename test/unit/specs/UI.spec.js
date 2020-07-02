import Vue from 'vue'
import TicTacToe from '../../../src/components/TicTacToe'

describe('UI.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(TicTacToe)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#board #title').textContent)
      .toEqual('Tic Tac Toe')
    expect(vm.$el.querySelector('#board #status-message').textContent)
      .toEqual('Your Turn!')
  })
})
