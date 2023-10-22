<template>
  <div>
<ul><li>test</li></ul>
  </div>
</template>

<script>
import {Draggable} from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

draggable.on('drag:start', () => console.log('drag:start'));
draggable.on('drag:move', () => console.log('drag:move'));
draggable.on('drag:stop', () => console.log('drag:stop'));
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
