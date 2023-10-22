<template>
  <div>
    <div class="container" ref="container">
      <draggable v-model="items" :options="draggableOptions">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="draggable-item"
        >
          {{ item.text }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      items: [
        { id: 1, text: 'Element 1' },
        { id: 2, text: 'Element 2' },
        { id: 3, text: 'Element 3' },
      ],
    };
  },
  computed: {
    draggableOptions() {
      return {
        group: 'draggableItems',
        preventOnFilter: false,
        move: this.handleMove,
      };
    },
  },
  methods: {
    handleMove(evt) {
      // Empêcher les éléments de sortir de la division
      const containerRect = this.$refs.container.getBoundingClientRect();
      const elementRect = evt.relatedContext.element.getBoundingClientRect();

      if (
        elementRect.left < containerRect.left ||
        elementRect.right > containerRect.right ||
        elementRect.top < containerRect.top ||
        elementRect.bottom > containerRect.bottom
      ) {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow: auto;
}

.draggable-item {
  background-color: #f0f0f0;
  margin: 5px;
  padding: 10px;
  border: 1px solid #999;
  cursor: grab;
}
</style>
