<template>
  <div
    class="content bg-cover h-full w-full bg-fond-tableau relative overflow-hidden"
    ref="drawhere"
  >
    <div id="drawhere" class="h-auto -z-10"></div>
    <div class="spotify-draggable absolute top-[50px] left-[50px] z-20">
      <div
        class="spotify-handle absolute top-[-30px] left-0 w-full h-[30px] bg-[#ccc] cursor-move flex justify-center items-center"
      >
        <!-- Vous pouvez mettre une image de flèche ici ou utiliser une icône de fonte -->
        <p>tire moi</p>
      </div>
      <spotify id="myIframe" class="pointer-events-auto" />
    </div>
    <div
      class="absolute top-0 left-0 w-screen h-screen object-cover bg-center -z-10"
    ></div>
    <div class="text">
      <!-- Votre contenu textuel ici -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
// .content {
//   // overflow: hidden;
//   /* Hide scrollbars */
// }
</style>

<style>
canvas {
  background: transparent;
}
</style>

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script> -->
<script>
// import Matter from "matter-js";

// import {
//   Engine,
//   Render,
//   Bodies,
//   Mouse,
//   MouseConstraint,
//   Runner,
//   Composite,
//   Composites,
//   Vertices,
//   Common,
//   Events,
//   Body,
//   Constraint,
// } from "matter-js";

// import Phaser from "phaser";
import decomp from "poly-decomp";

// const gifFrames = [
//   "/images/gif/frame_0.gif",
//   "/images/gif/frame_1.gif",
//   "/images/gif/frame_2.gif",
// ];

function dragElement(element, dragHandle) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
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
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export default {
  // head() {
  //   return {
  //     title: "Payment Page - My awesome project", // Other meta information
  //     script: [
  //       {
  //         hid: "Matter",
  //         src: "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.js",
  //         defer: true,
  //         body: true,
  //       },
  //     ],
  //   };
  // },
  data: function () {
    return {
      debug: null,
      canvasProp: {
        wallWidth: 5000,
      },
      currentFrame: 0,
      // maxFrame: gifFrames.length - 1,
      frameInterval: 1000, // Interval in ms for changing frames
      frameTimer: 0, // A timer for frame changes
      book: null,
      currentPage: 1,
      totalPages: 3,
      // pageTextures: [
      //   "/images/gif/frame_0.gif",
      //   "/images/gif/frame_1.gif",
      //   "/images/gif/frame_2.gif",
      // ],
      handbagPhysics: null,
      game: null,
      // gameConfig: {
      //   type: Phaser.AUTO,
      //   width: 800,
      //   height: 600,
      //   physics: {
      //     default: "matter",
      //     matter: {
      //       gravity: { y: 0.5 },
      //       debug: true,
      //     },
      //   },
      //   scene: {
      //     preload: this.preload,
      //     create: this.create,
      //   },
      // },
    };
  },
  mounted() {
    if (process.client) {
      this.loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.js",
        () => {
          // From here how can I access the Matter object? Like Engine or Render
          const Engine = Matter.Engine;
          const Render = Matter.Render;
          const Bodies = Matter.Bodies;
          const Mouse = Matter.Mouse;
          const MouseConstraint = Matter.MouseConstraint;
          const Runner = Matter.Runner;
          const Composite = Matter.Composite;
          const Composites = Matter.Composites;
          const Vertices = Matter.Vertices;
          const Common = Matter.Common;
          const Events = Matter.Events;
          const Body = Matter.Body;
          const Constraint = Matter.Constraint;

          let drawhereWidth = this.$refs.drawhere.offsetWidth;
          let drawhereHeight = this.$refs.drawhere.offsetHeight;

          window.decomp = decomp;
          let width = drawhereWidth,
            height = drawhereHeight,
            renderOptions = {
              width,
              height,
              showAngleIndicator: false,
              wireframes: false,
              background: "transparent",
            };

          // create an engine
          let engine = Engine.create(),
            world = engine.world;
          world.gravity.scale = 0;
          world.gravity.x = 1;
          world.gravity.y = 1;

          // create a renderer
          var render = Render.create({
            element: document.querySelector("#drawhere"),
            engine,
            options: renderOptions,
          });

          let offset = this.canvasProp.wallWidth,
            options = { isStatic: true };

          // Pour chaque items faire un SVG de la forme de l'item
          const items = [
            {
              id: 1,
              src: "/images/sac-bleu.png",
              width: 300,
              height: 315,
              rotation: 0,
            },
            {
              id: 2,
              src: "/images/timur_berry.png",
              width: 200,
              height: 314,
              rotation: 0,
            },
            {
              id: 5,
              src: "/images/bourges2024.png",
              width: 250,
              height: 280,
              rotation: 0,
            },
          ];

          // add all of the bodies to the world
          // Pour le handbag blue
          // Phaser
          // this.game = new Phaser.Game(this.gameConfig);

          fetch("images/handbag-blue.json")
            .then((response) => response.json())
            .then((handbagPhysics) => {
              this.handbagPhysics = handbagPhysics;

              // const handbagBody =
              //   Phaser.Physics.Matter.PhysicsEditorParser.parseBody(
              //     0,
              //     0,
              //     this.handbagPhysics.handbag_blue,
              //     1
              //   );

              // const handbag = Bodies.rectangle(
              //   Math.random() * width,
              //   Math.random() * height,
              //   200,
              //   200,
              //   {
              //     angle: 0 * (Math.PI / 180),
              //     render: {
              //       sprite: {
              //         texture: "images/sac-bleu.png",
              //         xScale: 200 / 800, // Adjust the scale as necessary
              //         yScale: 200 / 800,
              //       },
              //     },
              //     chamfer: { radius: 10 },
              //   }
              // );
              // Body.setVertices(handbag, handbagBody.vertices);
              // console.log(Body.getVertices(handbag));
              // Composite.add(world, handbag);
            });

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
          ]);

          items.forEach((item) => {
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
                    fillStyle: "transparent", // Ajustez si nécessaire
                    strokeStyle: "transparent", // Ajustez si nécessaire
                    lineWidth: 0,
                    sprite: {
                      texture: item.src,
                      xScale: item.width / 1000,
                      yScale: item.height / 1000,
                    },
                  },
                },
              }
            );
            Composite.add(world, body);
          });

          // var gifObject = Bodies.rectangle(
          //   Math.random() * width,
          //   Math.random() * height,
          //   200,
          //   200,
          //   {
          //     angle: 0 * (Math.PI / 180),
          //     render: {
          //       sprite: {
          //         texture: gifFrames[this.currentFrame],
          //         xScale: 200 / 800, // calculez l'échelle appropriée
          //         yScale: 200 / 800,
          //       },
          //     },
          //   }
          // );
          this.$nextTick(() => {
            let spotifyDraggable = document.querySelector(".spotify-draggable");
            let spotifyHandle =
              spotifyDraggable.querySelector(".spotify-handle");
            if (spotifyDraggable && spotifyHandle) {
              dragElement(spotifyDraggable, spotifyHandle);
            }
          });

          var bottle = Bodies.rectangle(
            Math.random() * width,
            Math.random() * height,
            250,
            333,
            {
              angle: 0 * (Math.PI / 180),
              render: {
                sprite: {
                  texture: "/images/monin.png",
                  xScale: 250 / 800, // calculez l'échelle appropriée
                  yScale: 333 / 800,
                },
              },
            }
          );
          Composite.add(world, bottle);

          this.book = Composite.create({ label: "Book" });

          // Ajoutez chaque page au composite de livre
          // for (let i = 0; i < this.totalPages; i++) {
          //   let page = Bodies.rectangle(400, 200, 150, 200, {
          //     render: {
          //       sprite: {
          //         texture: "/images/" + this.pageTextures[i],
          //         xScale: 1,
          //         yScale: 1,
          //       },
          //     },
          //   });
          //   Composite.add(this.book, page);
          // }

          // Ajoutez le livre composite au monde
          Composite.add(world, this.book);

          // const updateTexture = () => {
          //   const position = { x: gifObject.position.x, y: gifObject.position.y };
          //   Composite.remove(world, gifObject);
          //   gifObject = Bodies.rectangle(position.x, position.y, 200, 200, {
          //     angle: 0 * (Math.PI / 180),
          //     render: {
          //       sprite: {
          //         texture: gifFrames[this.currentFrame],
          //         xScale: 200 / 800, // calculez l'échelle appropriée
          //         yScale: 200 / 800,
          //       },
          //     },
          //   });
          //   Composite.add(world, gifObject);
          // };

          // Add an event to change the frame on each interval
          // this.updateInterval = setInterval(() => {
          //   this.currentFrame = (this.currentFrame + 1) % gifFrames.length;
          //   updateTexture(gifObject);
          // }, this.frameInterval);

          var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
              mouse: mouse,
              constraint: {
                render: {
                  visible: false,
                },
              },
            });

          Composite.add(world, mouseConstraint);

          // keep the mouse in sync with rendering
          render.mouse = mouse;

          // fit the render viewport to the scene
          Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height },
          });

          // run the engine
          Runner.run(engine);
          // run the renderer
          Render.run(render);
        }
      );
      // Check if the code run on the client side
      // document.getElementById("drawhere").innerHeight;
      // this.handleSpotify();
    }
  },
  unmounted() {
    Events.off(engine, "beforeUpdate");
  },
  methods: {
    loadScript(src, callback) {
      let script = document.createElement("script");
      script.src = src;
      script.onload = callback;
      document.body.appendChild(script);
    },
    handleSpotify() {
      let drawhereWidth = this.$refs.drawhere.offsetWidth;
      let drawhereHeight = this.$refs.drawhere.offsetHeight;

      window.decomp = decomp;
      let width = drawhereWidth,
        height = drawhereHeight,
        renderOptions = {
          width,
          height,
          showAngleIndicator: false,
          wireframes: false,
          background: "transparent",
        };

      // create an engine
      let engine = Engine.create(),
        world = engine.world;
      world.gravity.scale = 0;
      world.gravity.x = 1;
      world.gravity.y = 1;

      // create a renderer
      var render = Render.create({
        element: document.querySelector("#drawhere"),
        engine,
        options: renderOptions,
      });

      // Play Spotify track
      // You would need to implement this part based on how you're integrating with Spotify
    },
  },
};
</script>
