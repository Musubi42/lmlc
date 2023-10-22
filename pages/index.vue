<template>
  <div class="container">
  <div class="container-tableau bg-slate-950 mx-auto">
    <draggable-container>
      <div class="draggable-element"></div>
    </draggable-container>
    <draggable-container>
      <div class="draggable-element"></div>
    </draggable-container>

  </div>
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
  position: absolute;
  width: 100px;
  height: 50px;
  background-color: #3498db;
  color: #fff;
  text-align: center;
  line-height: 50px;
  cursor: grab;
}

.container-tableau{
  width: 800px;
  background-color: #3498db;
}
.draggable-element:active {
  cursor: grabbing;
}
</style>
