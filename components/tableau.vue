<template>
  <div class="content">
    <div id="drawhere"></div>
    <div class="spotify-draggable">
      <div class="spotify-handle">
        <!-- Vous pouvez mettre une image de flèche ici ou utiliser une icône de fonte -->
        <p>tire moi</p>
      </div>
      <spotify id="myIframe"/> 
    </div>
    <div class="background" />
    <div class="text">
      <!-- Votre contenu textuel ici -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#drawhere {
  z-index: -10;
}
.spotify-draggable {
  position: absolute;
  top: 50px; // Position initiale
  left: 50px;
  z-index: 20;
}

.spotify-handle {
  position: absolute;
  top: -30px; /* Place la poignée au-dessus de l'iframe */
  left: 0;
  width: 100%;
  height: 30px; /* Hauteur de la barre de titre */
  background-color: #ccc; /* Couleur de la barre de titre */
  cursor: move; /* Change le curseur pour indiquer qu'il s'agit d'une zone déplaçable */
  display: flex;
  justify-content: center; /* Centre l'icône dans la barre de titre */
  align-items: center;
}

#myIframe {

  pointer-events: auto;
}
.content {
  overflow: hidden;
  /* Hide scrollbars */
  height: 100vh;
  width: 100vw;
  background-image:
    linear-gradient(45deg, #f5f5f5 25%, transparent 25%),
    linear-gradient(-45deg, #f5f5f5 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f5f5f5 75%),
    linear-gradient(-45deg, transparent 75%, #f5f5f5 75%);
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  background-position: center;
  z-index: -2;
}
</style>

<style>
canvas {
  background: transparent;
}
</style>
<script>
import {
  Engine,
  Render,
  Bodies,
  Mouse,
  MouseConstraint,
  Runner,
  Composite,
  Composites,
  Vertices,
  Common,
  Events,
  Body,
  Constraint
} from 'matter-js'
import decomp from 'poly-decomp'

const gifFrames = [
  '/images/gif/frame_0.gif',
  '/images/gif/frame_1.gif',
  '/images/gif/frame_2.gif',
];

function dragElement(element, dragHandle) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  dragHandle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export default {

  data: function () {
    return {
      debug: null,
      canvasProp: {
        wallWidth: 50,
      },
      currentFrame: 0,
      maxFrame: gifFrames.length - 1,
      frameInterval: 1000, // Interval in ms for changing frames
      frameTimer: 0, // A timer for frame changes
      book: null,
      currentPage: 1,
      totalPages: 3,
      pageTextures: [
      '/images/gif/frame_0.gif',
  '/images/gif/frame_1.gif',
  '/images/gif/frame_2.gif',
      ],
    }
  },
  mounted() {
    if (process.client) {
      window.decomp = decomp
      let width = window.innerWidth,
        height = window.innerHeight,
        renderOptions = {
          width,
          height,
          showAngleIndicator: false,
          wireframes: false,
          background: 'transparent',
        }
        
      // create an engine
      let engine = Engine.create(),
        world = engine.world
      world.gravity.scale = 0
      world.gravity.x = 1
      world.gravity.y = 1

      // create a renderer
      var render = Render.create({
        element: document.querySelector('#drawhere'),
        engine,
        options: renderOptions,
      })
  
      let offset = this.canvasProp.wallWidth,
        options = { isStatic: true }

      const items = [
        { id: 1, src: "/images/sac-bleu.png", width: 300, height: 315, rotation: 0 },
        { id: 2, src: "/images/timur_berry.png", width: 200, height: 314, rotation: 0 },
        { id: 5, src: "/images/bourges2024.png", width: 250, height: 280, rotation: 0 },

      ];

      Composite.add(world, [
        Bodies.rectangle(
          width / 2,
          offset / -2,
          width + offset * 2,
          offset,
          options
        ),
        Bodies.rectangle(
          offset / -2,
          height / 2,
          offset,
          height + offset * 2,
          options
        ),
        Bodies.rectangle(
          width + offset / 2,
          height / 2,
          offset,
          height + offset * 2,
          options
        ),
        Bodies.rectangle(
          width / 2,
          height + offset / 2,
          width + offset * 2,
          offset,
          options
        ),
      ])



      items.forEach(item => {
        const body = Bodies.rectangle(
          Math.random() * width,
          Math.random() * height,
          item.width,
          item.height,
          {
            angle: item.rotation * (Math.PI / 180),
            render: {
              sprite: {
                texture: item.src,
                xScale: item.width / 1000,
                yScale: item.height / 1000,
              },
              render: {
      fillStyle: 'transparent', // Ajustez si nécessaire
      strokeStyle: 'transparent', // Ajustez si nécessaire
      lineWidth: 0,
      sprite: {
        texture: item.src,
        xScale: item.width / 1000,
        yScale: item.height / 1000,
      }
    }
            },
          }
        );
        Composite.add(world, body);
      });

      var gifObject = Bodies.rectangle(
        Math.random() * width,
        Math.random() * height,
        200, 200,
        {
          angle: 0 * (Math.PI / 180),
          render: {
            sprite: {
              texture: gifFrames[this.currentFrame],
              xScale: 200 / 800, // calculez l'échelle appropriée
              yScale: 200 / 800,
            }
          },
        }
      );
      this.$nextTick(() => {
      let spotifyDraggable = document.querySelector('.spotify-draggable');
      let spotifyHandle = spotifyDraggable.querySelector('.spotify-handle');
      if (spotifyDraggable && spotifyHandle) {
        dragElement(spotifyDraggable, spotifyHandle);
      }
    });

      
      var bottle = Bodies.rectangle(
        Math.random() * width,
        Math.random() * height,
        250, 333,
        {
          angle: 0 * (Math.PI / 180),
          render: {
            sprite: {
              texture: "/images/monin.png",
              xScale: 250 / 800, // calculez l'échelle appropriée
              yScale: 333 / 800,
            }
          },
        }
      );
      Composite.add(world, bottle);

      this.book = Composite.create({ label: 'Book' });

// Ajoutez chaque page au composite de livre
for (let i = 0; i < this.totalPages; i++) {
  let page = Bodies.rectangle(400, 200, 150, 200, {
    render: {
      sprite: {
        texture: '/images/' + this.pageTextures[i],
        xScale: 1,
        yScale: 1
      }
    }
  });
  Composite.add(this.book, page);
}

// Ajoutez le livre composite au monde
Composite.add(world, this.book);

      const updateTexture = () => {
        const position = { x: gifObject.position.x, y: gifObject.position.y };
        Composite.remove(world, gifObject);
        gifObject = Bodies.rectangle(
          position.x,
          position.y,
          200, 200,
          {
            angle: 0 * (Math.PI / 180),
            render: {
              sprite: {
                texture: gifFrames[this.currentFrame],
                xScale: 200 / 800, // calculez l'échelle appropriée
                yScale: 200 / 800,
              }
            },
          }
        );
        Composite.add(world, gifObject);

      };

      // Add an event to change the frame on each interval
      this.updateInterval = setInterval(() => {
        this.currentFrame = (this.currentFrame + 1) % gifFrames.length;
        updateTexture(gifObject);
      }, this.frameInterval);

      
      var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            render: {
              visible: false,
            },
          },
        })

     Composite.add(world, mouseConstraint)

      // keep the mouse in sync with rendering
      render.mouse = mouse

      // fit the render viewport to the scene
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
      })

      // run the engine
      Runner.run(engine)
      // run the renderer
      Render.run(render)
    }
  },
  destroyed() {
    Events.off(engine, 'beforeUpdate');
  }
}
</script>
