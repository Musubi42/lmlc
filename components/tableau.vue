<template>
  <div class="container">
    <div ref="draggableArea" class="draggable-area">
      <img v-for="item in items" :key="item.id" class="draggable-item"
        :style="{ top: `${item.y}px`, left: `${item.x}px`, width: `${item.width || itemWidth}px`, height: `${item.height || itemHeight}px` }"
        @mousedown="dragStart(item, $event)" :src="item.src" draggable="false" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, src: "/images/sac-bleu.png", width: 300, height: 315 },
        { id: 2, src: "/images/timur_berry.png", width: 136, height: 314 },
        { id: 3, src: "/images/gif-meuble.gif", width: 250, height: 280 },
        { id: 4, src: "/images/monin.png", width: 100, height: 333 },
        { id: 5, src: "/images/bourges2024.png", width: 250, height: 280 }
      ],
      currentItem: null,
      offsetX: 0,
      offsetY: 0,
      itemWidth: 50,
      itemHeight: 50,
    };
  },

  mounted() {
    this.assignRandomPositionsToItems();
  },
  methods: {
    dragStart(item, event) {
      this.currentItem = item;
      this.offsetX = event.clientX - item.x;
      this.offsetY = event.clientY - item.y;
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.dragEnd);
    },
    drag(event) {
      if (!this.currentItem) return;

let newX = event.clientX - this.offsetX;
let newY = event.clientY - this.offsetY;

// Vérification des limites
const maxX = this.$refs.draggableArea.offsetWidth - this.currentItem.width;
const maxY = this.$refs.draggableArea.offsetHeight - this.currentItem.height;

if (newX < 0) newX = 0;
if (newY < 0) newY = 0;
if (newX > maxX) newX = maxX;
if (newY > maxY) newY = maxY;

const collidingItem = this.isColliding(newX, newY);
      if (collidingItem) {
        // Poussez l'élément en collision
        if (newX < collidingItem.x) {
          collidingItem.x += this.itemWidth;
        } else {
          collidingItem.x -= this.itemWidth;
        }

        if (newY < collidingItem.y) {
          collidingItem.y += this.itemHeight;
        } else {
          collidingItem.y -= this.itemHeight;
        }

        // Vérifiez à nouveau les limites pour l'élément poussé
        if (collidingItem.x < 0) collidingItem.x = 0;
        if (collidingItem.y < 0) collidingItem.y = 0;
        if (collidingItem.x > maxX) collidingItem.x = maxX;
        if (collidingItem.y > maxY) collidingItem.y = maxY;
      }

      this.currentItem.x = newX;
      this.currentItem.y = newY;
    },
    dragEnd() {
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.dragEnd);
      this.currentItem = null;
    },
    isColliding(newX, newY) {
  for (let item of this.items) {
    if (item !== this.currentItem) {
      // Vérifier si le rectangle de l'élément actuellement déplacé
      // est en collision avec un autre élément.
      if (
        newX < item.x + item.width &&
        newX + this.currentItem.width > item.x &&
        newY < item.y + item.height &&
        newY + this.currentItem.height > item.y
      ) {
        return item; // retourne l'élément en collision
      }
    }
  }
  return null; // pas de collision
}, 
     assignRandomPositionsToItems() {
      const maxX = this.$refs.draggableArea.offsetWidth - this.itemWidth;
      const maxY = this.$refs.draggableArea.offsetHeight - this.itemHeight;

      this.items.forEach(item => {
        let coordinates;
        do {
          coordinates = this.generateRandomCoordinates(maxX, maxY);
        } while (this.isPositionTaken(coordinates));

        item.x = coordinates.x;
        item.y = coordinates.y;
      });
    },

    generateRandomCoordinates(maxX, maxY) {
      return {
        x: Math.random() * maxX,
        y: Math.random() * maxY
      };
    },

    isPositionTaken(coordinates) {
      const threshold = 50; 
      for (let item of this.items) {
        if (
          coordinates.x < item.x + threshold &&
          coordinates.x + threshold > item.x &&
          coordinates.y < item.y + threshold &&
          coordinates.y + threshold > item.y
        ) {
          return true; // la position est prise
        }
      }
      return false; // la position est libre
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.draggable-area {
  position: relative;
  width: 800px;
  height: 800px;
  border: 1px solid #ccc;
  /* Motif à petits carreaux */
  background-image:
    linear-gradient(45deg, #f5f5f5 25%, transparent 25%),
    linear-gradient(-45deg, #f5f5f5 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f5f5f5 75%),
    linear-gradient(-45deg, transparent 75%, #f5f5f5 75%);
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
}

.draggable-item {
  position: absolute;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
