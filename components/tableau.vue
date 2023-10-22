<template>
  <div>
    <draggable-container>
      <div class="draggable-element">Élément 1</div>
      <div class="draggable-element">Élément 2</div>
    </draggable-container>
    <draggable-element><div class="draggable-element">Élément 2</div></draggable-element>
  </div>
</template>

<script>
import DraggableContainer from "@/components/DraggableContainer.vue";

export default {
  components: {
    DraggableContainer,
  },
};
</script>

<style scoped>
.draggable-element {
 
  width: 50px;
  height: 50px; /* Ajustez la hauteur des éléments à 50px */
  background-color: #3498db;
  color: #fff;
  text-align: center;
  line-height: 50px;
  cursor: grab;
}

.draggable-element:active {
  cursor: grabbing;
}
</style>
