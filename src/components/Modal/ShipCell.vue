<template>
  <div
    :class="filterClass"
    class="ship-cell"
    @click="handleOnClick"
  >
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    alignment: {
      validator: (value) => {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    }
  },

  data() {
    return {
      damaged: false
    }
  },

  computed: {
    filterClass() {
      const cellClass = []

      if (!this.damaged) {
        cellClass.push('bg-brown')
      }

      if (this.alignment === 'vertical') {
        cellClass.push('block')
      }

      if (this.alignment === 'horizontal') {
        cellClass.push('inline-block')
      }

      return cellClass.join(' ')
    }
  },

  methods: {
    handleOnClick() {
      alert(this.index)
    }
  }
}
</script>

<style scoped>
  .ship-cell {
    height: 40px;
    width: 40px;
    border: 1px;
    border-color: black;
    border-style: solid;
  }
  .bg-brown {
    background: saddlebrown;
  }
  .inline-block {
    display: inline-block;
  }
  .block {
    display: block;
  }
</style>