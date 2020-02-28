<template>
  <div class="container">
    <div>
      <h3>Instructions</h3>
      <ul>
        <li>Drag the ship towards the board. Rotate the ship if needed.</li>
        <li>Turn on 'Hide Table Cell' switch when ready.</li>
        <li>When both player are ready, turn on the 'Start the game' switch.</li>
      </ul>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div>
          <div class="custom-control custom-switch text-center" @click="gameStart = !gameStart">
            <input type="checkbox" class="custom-control-input" v-model="gameStart">
            <label class="custom-control-label">Start the Game</label>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <Board :size='10' :game-start="gameStart" :index="1" />
      </div>
      <div class="col-sm-6">
        <Board :size='10' :game-start="gameStart" :index="2" />
      </div>

    </div>
  </div>
</template>

<script>
import Board from './Board.vue'

export default {
  data() {
    return {
      gameStart: false
    }
  },

  components: {
    Board
  }
}
</script>
