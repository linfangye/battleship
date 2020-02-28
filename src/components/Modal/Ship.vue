<template>
  <div>
    <div draggable="true" class="ship" @drag="dragHandler" >
      <ShipCell :alignment="alignment" v-for="index in length" :index="index" :key="index" />
    </div>
  </div>
</template>

<script>
import ShipCell from './ShipCell.vue'

export default {
  props: {
    length: Number,
    alignment: {
      validator: (value) => {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    }
  },

  data() {
    return {

    }
  },

  methods: {
    dragHandler() {
      this.$emit('ship-drag')
    }
  },

  components: {
    ShipCell
  }
}
</script>

<style>
  .ship {
    display: inline-block;
    margin: 20px;
  }
</style>
