<template>
  <div>
    <h3 class="text-center" v-text="`Player ${index}`"></h3>

    <!-- hide switch goes here -->
    <div>
      <div class="custom-control custom-switch text-center" @click="hideCell = !hideCell">
        <input type="checkbox" class="custom-control-input" v-model="hideCell">
        <label class="custom-control-label">Hide Table Cell</label>
      </div>
    </div>

    <!-- Board goes here -->
    <table class="table table-bordered">
      <tr v-for="(row, rowNumber) in board" :key="rowNumber">
        <td v-for="(column, colmunNumber) in row" :key="colmunNumber" class="board-td">
          <BoardCell
            :row="rowNumber"
            :colmun="colmunNumber"
            :status="column"
            :game-start="gameStart"
            @ship-dropped="handleShipDropped"
            @cell-hit="handleCellHit"
            />
        </td>
      </tr>
    </table>

    <!-- inventory goes here -->
    <div>
      <div class="row">
        <div class="col-sm-6" v-for="ship in ships" :key="ship.index">
          <div class="card" v-if="!ship.placed">
            <div class="card-body text-center">
              <div v-text="`Ship #${ship.index}`"></div>
              <button class="btn btn-info" @click="rotateShip(ship)">Rotate</button>
              <Ship
                :length="ship.length"
                :alignment="ship.alignment"
                @ship-drag="handleShipDrag(ship.index)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoardCell from './Modal/BoardCell.vue'
import Ship from './Modal/Ship.vue'
import { checkShipPlacement } from './Functions/Validations.js'

export default {
  props: {
    size: Number,
    index: Number,
    gameStart: Boolean
  },

  data() {
    return {
      board: [],
      dragedShip: {},
      hideCell: false,
      ships: [
        {
          index: 1,
          length: 2,
          alignment: 'horizontal',
          placed: false
        },
        {
          index: 2,
          length: 3,
          alignment: 'vertical',
          placed: false
        }
      ]
    }
  },

  mounted() {
    this.initBoard()
  },

  watch: {
    hideCell(val) {
      this.board.forEach(row => {
        row.forEach(column => {
          column.hideCell = val
        })
      })
    },

    board: {
      deep: true,
      handler(board) {
        if (!this.gameStart) {
          return false
        }

        let shipRemaining = 0

        board.forEach(row => {
          row.forEach(column => {
            if (column.hasShip && !column.hit) {
              shipRemaining ++
            }
          })
        })

        if (shipRemaining === 0) {
          alert(`Game Over! Player ${this.index} lose the game`)
        }
      }
    }
  },

  methods: {
    handleCellHit(coordinate) {
      this.board[coordinate.row][coordinate.colmun].hit = true
    },

    initBoard() {
      const status = {
        hit: false,
        hasShip: false,
        hideCell: false
      }

      for (let i = 0; i < this.size; i ++) {
        const row = []

        for (let j = 0; j < this.size; j ++) {
          row.push({ ...status})
        }

        this.board.push(row)
      }
    },

    rotateShip(ship) {
      if (ship.alignment === 'horizontal') {
        ship.alignment = 'vertical'
      } else {
        ship.alignment = 'horizontal'
      }
    },

    handleShipDrag(index) {
      this.dragedShip = this.ships.find(ship => ship.index === index)
    },

    handleShipDropped(coordinate) {
      if (!checkShipPlacement(coordinate, this.board, this.dragedShip)) {
        alert(`
          You can not place the ship there.
          Either it is out of bound or it overlaps with other ships.
        `)

        return false
      }

      if (this.dragedShip.alignment === 'horizontal') {
        for (let i = coordinate.colmun; i < coordinate.colmun + this.dragedShip.length; i ++) {
          this.board[coordinate.row][i].hasShip = true
        }
      }

      if (this.dragedShip.alignment === 'vertical') {
        for (let i = coordinate.row; i < coordinate.row + this.dragedShip.length; i ++) {
          this.board[i][coordinate.colmun].hasShip = true
        }
      }

      const shipMatch = this.ships.find(ship => ship.index === this.dragedShip.index)

      shipMatch.placed = true
    }
  },

  components: {
    BoardCell,
    Ship
  }
}
</script>

<style scoped>
  .board-td {
    padding: 0px;
    height: 40px;
    width: 40px;
  }
</style>