<template>
  <div
    class="bg-cover h-full w-full bg-white relative overflow-hidden"
    id="drawhere"
    ref="drawhere" 
  >

    <!-- Just containing all SVG path -->
    <div>
      <path id="bouillonMobile" />

      <path id="timurQualiPNGMobile" />

      <path id="sacBleuMobile" />

      <path id="fauteuilRougeMobile" />

      <path id="unMobile" />

      <path id="deuxMobile" />

      <path id="moninMobile" />

      <path id="sacBleu" />

      <path id="timurBig" />

      <path id="bouillon" />

      <path id="un" />

      <path id="deux" />

      <path id="timurQualiSVG" />

      <path id="moninGrand" />

      <path id="timurQualiPNG" />

      <path id="moninShadow" />

      <path id="monin" />

      <path id="timur" />

      <path id="bourges2024" />

      <path id="tableRouge" />

      <path id="fauteuilRouge" />

      <path id="lampeRouge" />
    </div>

    <div id="drawhere" class="h-auto -z-10"></div>
  </div>
</template>

<style>
canvas {
  background: transparent;
}
</style>

<script async>
import decomp from "poly-decomp";
import "pathseg";

export default {
  setup() {
    const drawhere = ref(null);

    const isMobile = stateIsMobile();

    return { 
      drawhere,
      isMobile,
    };
  },
  data: function () {
    return {
      canvasProp: {
        wallWidth: 5000,
      },
      currentFrame: 0,
      // meubles: {},
    };
  },
  async mounted() {
    if (process.client) {
      const response = await fetch('/tableau/meubles.json');
      const meubles = await response.json();

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
          const Events = Matter.Events;
          const Body = Matter.Body;
          const Constraint = Matter.Constraint;


          // let drawhereWidth = window.getComputedStyle(drawhere, null).getPropertyValue('width');
          // let drawhereHeight = window.getComputedStyle(drawhere, null).getPropertyValue('height');
          // let drawhereWidth = 400;
          // let drawhereHeight = 400;

          let drawhereHeight = document.getElementById("drawhere").offsetHeight;
          let drawhereWidth = document.getElementById("drawhere").offsetWidth;

          console.log("drawhereHeight", drawhereHeight);
          console.log("drawhereWidth", drawhereWidth);

          window.decomp = decomp;
          const width = drawhereWidth;
          const height = drawhereHeight;
          const renderOptions = {
            width,
            height,
            showAngleIndicator: false,
            wireframes: false,
            background: "transparent",
          };

          // create an engine
          let engine = Engine.create();
          engine.positionIterations = 200;
          engine.velocityIterations = 100;

          let world = engine.world;

          engine.world.gravity.scale = 0;
          engine.world.gravity.y = 0;
          engine.world.gravity.x = 0;

          // create a renderer
          var render = Render.create({
            element: document.querySelector("#drawhere"),
            engine,
            options: renderOptions,
          });

          const worker = new Worker(
            new URL("/assets/workers/tableau.js", import.meta.url),
            { type: "module" }
          );

          // Changer l'ordre de rendu des objets permet de faire passer les uns au-dessus des autres
          const isMobile = this.isMobile;
          
          var uniqueBody = {}
          if (isMobile) {
            uniqueBody = { moninMobile, bouillonMobile, timurQualiPNGMobile, unMobile, deuxMobile, sacBleuMobile };
          } else {
            uniqueBody = { sacBleu, monin, timur, bouillon, un, deux, timurQualiPNG, moninGrand };
          }

          function createsUniqueBody() {
            const forMainThread = true;
            for (let key in uniqueBody) {
              worker.postMessage({
                functionName: "createBody",
                args: [key, meubles, isMobile, forMainThread, drawhereWidth, drawhereHeight],
              });
            }
          }

          createsUniqueBody();

          // scaleVertices = function (vertices, scaleFactor) {
          //   for (let i = 0; i < vertices.length; i++) {
          //     vertices[i].x *= scaleFactor;
          //     vertices[i].y *= scaleFactor;
          //   }
          // };

          worker.onmessage = function (event) {
            const { functionName, args } = event.data;

            if (functionName === "createBody") {
              const [body, spriteBody, constraint] = args;
              // TODO: La frequence de rafraichissement de la physique est trop lente, ce qui fait que les objets ne sont pas dans le même axe
              Events.on(engine, "beforeUpdate", function (event) {
                // Set the angle of the spriteBody to the angle of the body
                Body.setAngle(spriteBody, body.angle);
              });

              if (spriteBody.parts[0].render.sprite.texture.match("moninShadow")) {
                Composite.add(world, body);
              } else {
                Composite.add(world, [body, spriteBody, constraint]);
              }
            }

            // Render the world
            Render.run(render);
          };


          // On peut jouer avec, mais il n'y a pas de collision
          // Composite.add(world, Bodies.rectangle(
          //   200,
          //   200,
          //   200,
          //   200,
          //   {
          //     collisionFilter: {
          //       category: 0x0002, // You can set your own category here
          //       mask: 0x0002, // Enable or disable collision based on collisionEnabled
          //     },
          //     render: {
          //       opacity: 1,
          //       sprite: {
          //         texture: meubles["moninShadow"].sprite.image,
          //         xScale: meubles["moninShadow"].sprite.xScale,
          //         yScale: meubles["moninShadow"].sprite.yScale,
          //         xOffset: 0,
          //         yOffset: 0,
          //       }
          //     }
          //   }
          // ))

          var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
              mouse: mouse,
              constraint: {
                render: {
                  visible: false,
                },
              },
              collisionFilter: {
                category: 0x0002 // Adjust this value as needed
              },
            });

          // Allow to scoll on the canvas
          mouseConstraint.mouse.element.removeEventListener(
            "mousewheel",
            mouseConstraint.mouse.mousewheel
          );
          mouseConstraint.mouse.element.removeEventListener(
            "DOMMouseScroll",
            mouseConstraint.mouse.mousewheel
          );

          Composite.add(world, mouseConstraint);

          // keep the mouse in sync with rendering
          render.mouse = mouse;

          // const gifObjects = ["fauteuilRouge", "lampeRouge", "tableRouge"];
          var gifObjects = []; 

          if (isMobile) {
            gifObjects = ["fauteuilRougeMobile", "fauteuilBlancMobile", "fauteuilVertMobile"];;
          } else {
            gifObjects = ["fauteuilRouge", "fauteuilBlanc", "fauteuilVert"];;
          }

          async function CreateBodyFromJSON(key) {
            // Fetch the vertices from the public folder
            const response = await fetch(`/tableau/vertices/${meubles[key].vertices.fileName}.json`);
            // assets/tableau/vertices/tableRouge.json
            if (!response.ok) {
              console.error(`Error fetching file: ${response.statusText}`);
              return;
            }
            const fileContent = await response.json();

            const positionX = meubles[key].body.position.x;
            const positionY = meubles[key].body.position.y;
            // let body = Bodies.fromVertices(positionX, positionY, [fileContent], {
            //   render: {
            //     visible: true,
            //     sprite: {
            //         // xScale: meubles[key].sprite.xScale,
            //         // yScale: meubles[key].sprite.yScale,
            //         xScale: 0.2,
            //         yScale: 0.2,
            //       },
            //   },
            // });

            let scaledVertices = await scaleVertices(fileContent, meubles[key].vertices.xScale, meubles[key].vertices.yScale);

            let body = Bodies.fromVertices(positionX, positionY, [scaledVertices], {
              render: {
                visible: false,
              },
            });

            Body.setAngle(body, meubles[key].body.angle);

            let spriteBody = Bodies.rectangle(
              body.bounds.min.x,
              body.bounds.min.y,
              body.bounds.max.x,
              body.bounds.max.y,
              {
                collisionFilter: {
                  mask: 0,
                },
                render: {
                  opacity: 1,
                  sprite: {
                    texture: meubles[key].sprite.image,
                    xScale: meubles[key].sprite.xScale,
                    yScale: meubles[key].sprite.yScale,
                    // xScale: 0.2,
                    // yScale: 0.2,
                    xOffset: 0,
                    yOffset: 0,
                  },
                },
              }
            );

            let constraint = Constraint.create({
              bodyA: body,
              bodyB: spriteBody,
              stiffness: 1,
              length: 0,
              pointB: {
                x: meubles[key].constraint.x,
                y: meubles[key].constraint.y,
              },
              render: {
                visible: false,
              },
            });

            Events.on(engine, "beforeUpdate", function (event) {
              // Set the angle of the spriteBody to the angle of the body
              Body.setAngle(spriteBody, body.angle);
            });

            return { body, spriteBody, constraint };
          }


          async function scaleVertices(vertices, scaleX, scaleY) {
            return vertices.map(vertex => ({
              x: vertex.x * scaleX,
              y: vertex.y * scaleY
            }));
          }

          async function animateGif() {
            // Preload bodies for all frames
            const preloadedBodies = await Promise.all(
              gifObjects.map((key) => CreateBodyFromJSON(key))
            );

            let currentFrame = 0;
            let initialGifBody = preloadedBodies[currentFrame];

            setInterval(() => {
              // If there's a body from the last frame, remove it
              if (initialGifBody) {
                // Increment the frame
                let nextFrame = (currentFrame + 1) % gifObjects.length;

                var speed = Body.getVelocity(initialGifBody.body);

                meubles[gifObjects[nextFrame]].body.position.x =
                  initialGifBody.body.position.x;
                meubles[gifObjects[nextFrame]].body.position.y =
                  initialGifBody.body.position.y;

                Body.setVelocity(initialGifBody.body, 0);
                Body.setVelocity(initialGifBody.spriteBody, 0);

                Composite.remove(world, initialGifBody.body, true);
                Composite.remove(world, initialGifBody.spriteBody, true);
                Composite.remove(world, initialGifBody.constraint, true);
              }

              currentFrame = (currentFrame + 1) % gifObjects.length;

              // Get the preloaded body for the next frame
              initialGifBody = preloadedBodies[currentFrame];

              Body.setPosition(initialGifBody.body, {
                x: meubles[gifObjects[currentFrame]].body.position.x,
                y: meubles[gifObjects[currentFrame]].body.position.y,
              });

              Body.setVelocity(initialGifBody.body, speed);
              Body.setVelocity(initialGifBody.spriteBody, speed);

              // Add the body to the world
              Composite.add(world, [
                initialGifBody.body,
                initialGifBody.spriteBody,
                initialGifBody.constraint,
              ]);
            }, 3000);
          }

          animateGif();

          const offset = this.canvasProp.wallWidth;
          const options = {
            isStatic: true,
            // removeCollinear: 0,
            restitution: 0,
            collisionFilter: {
              category: 0xFFFFFFFF, // You can set your own category here
              // mask: 0x0002, // Enable or disable collision based on collisionEnabled
            },
            render: {
              fillStyle: 'transparent', // This will make the rectangle red
            },
          };

          // Ce sont les murs du tableau
          Composite.add(world, [
            Bodies.rectangle(width / 2, (offset / -2) + 64, width + offset * 2, offset, options), // Plafond
            Bodies.rectangle(
              offset / -2,
              height / 2,
              offset,
              height + offset * 2,
              options
            ), // Mur gauche
            Bodies.rectangle(
              width + offset / 2,
              height / 2,
              offset,
              height + offset * 2,
              options
            ), // Mur droit
            Bodies.rectangle(
              width / 2,
              height + offset / 2,
              width + offset * 2,
              offset,
              options
            ), // Sol
          ]);

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
    // Events.off(engine, "beforeUpdate");
    // worker.terminate();
  },
  methods: {
    loadScript(src, callback) {
      let script = document.createElement("script");
      script.src = src;
      script.onload = callback;
      document.body.appendChild(script);
    },
  },
};
</script>
