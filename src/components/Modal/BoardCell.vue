<template>
  <div :class="className" class="board-cell" @click="handleOnClick" @drop="dropHandler" @dragover="allowDrop">

  </div>
</template>

<script>
export default {
  props: {
    row: Number,
    colmun: Number,
    status: Object,
    gameStart: Boolean
  },

  data() {
    return {

    }
  },

  computed: {
    className() {
      const { status } = this

      if (status.hideCell && !status.hit) {
        return 'bg-dark-grey'
      }

      if (status.hit && status.hasShip) {
        return 'bg-red'
      }

      if (status.hit && !status.hasShip) {
        return 'bg-white'
      }

      if (status.hasShip && !status.hit && !status.hideCell) {
        return 'bg-green'
      }

      if (!status.hasShip && !status.hideCell && !status.hit) {
        return 'bg-grey'
      }

      return 'bg-grey'
    }
  },

  methods: {
    handleOnClick() {
      if (this.gameStart) {
        const { colmun, row } = this

        this.$emit('cell-hit', { row, colmun })
      }
    },

    dropHandler() {
      const { colmun, row } = this

      this.$emit('ship-dropped', { row, colmun })
    },

    allowDrop(event) {
      event.preventDefault()
    }
  }
}
</script>

<style scoped>
  .board-cell {
    height: 100%;
    width: 100%;
  }
  .bg-grey {
    background: #F5F5F5;
  }
  .bg-dark-grey {
    background: #505050;
  }
  .bg-green {
    background: #228B22;
  }
  .bg-red {
    background: #8B0000;
  }
  .bg-white {
    background: #fff;
  }
</style>