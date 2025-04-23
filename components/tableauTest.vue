<template>
  <div
    class="bg-cover h-full w-full bg-white relative overflow-hidden"
    id="drawhere"
    ref="drawhere" 
  >

    <!-- Just containing all SVG path -->
    <div>
      


      <path id="timurBig" />

      <path id="bouillon" />

      <path id="bourgesUn" />

      <path id="bourgesDeux" />

      <path id="timurQualiSVG" />

      <path id="moninGrand" />

      <path id="timurQualiPNG" />

      <path id="moninShadow" />


      <path id="timur" />

      <path id="bourges2024" />

      <path id="tableRouge" />

      <path id="fauteuilRouge" />

      <path id="lampeRouge" />
      <!-- Desktop -->
      <path id="sacBleu" />

      <!-- Mobile -->
      <path id="bouillonMobile" />

      <path id="monin" />

      <path id="timurQualiPNG" />


      <path id="timurQualiPNGMobile" />

      <path id="sacBleuMobile" />

      <path id="fauteuilRougeMobile" />

      <path id="bourgesUnMobile" />

      <path id="bourgesDeuxMobile" />

      <path id="moninMobile" />
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

    const useTableauPreFetchImages = tableauPreFetchImages();

    // console.log(useTableauPreFetchImages.value);
    return { 
      drawhere,
      isMobile,
      useTableauPreFetchImages,
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

          console.log("Adding mousemove event to engine");
          // Add mouse hover event
          Events.on(engine, 'mousemove', function(event) {
            console.log("Mousemove triggered", event.mouse.position);
            const mousePosition = event.mouse.position;
            const hoveredBodies = Matter.Query.point(Composite.allBodies(world), mousePosition);
            
            if (hoveredBodies.length > 0) {
              const hoveredBody = hoveredBodies[0];
              console.log('Found hovered body:', hoveredBody);
              if (hoveredBody.label && !hoveredBody.label.includes('_sprite')) {
                console.log('Hovered element:', hoveredBody.label);
              }
            }
          });

          console.log("import.meta.url : ", import.meta.url);

          const worker = new Worker(
            new URL("/assets/workers/tableau.js", import.meta.url),
            { type: "module" }
          );

          // Changer l'ordre de rendu des objets permet de faire passer les uns au-dessus des autres
          const isMobile = this.isMobile;
          
          var uniqueBody = {}
          if (isMobile) {
            uniqueBody = { moninMobile, bouillonMobile, timurQualiPNGMobile, bourgesUnMobile, bourgesDeuxMobile, sacBleuMobile };
          } else {
            // TODO: Il faut rajouter le bouillon
            uniqueBody = { sacBleu, monin, bourgesUn, bourgesDeux, timurQualiPNG, bouillon };
          }

          // console.log(this.useTableauPreFetchImages.value);

          let images = Object.entries(this.useTableauPreFetchImages.value).reduce((acc, [key, value]) => {
            // Process the key and value if necessary
            // For example, to convert the value to a string:
            let newValue = String(value);

            // Add the processed key-value pair to the accumulator object
            acc[key] = newValue;

            return acc;
          }, {});

          // console.log(images);

          function createsUniqueBody() {
            const forMainThread = true;
            for (let key in uniqueBody) {
              worker.postMessage({
                functionName: "createBody",
                args: [key, meubles, isMobile, forMainThread, drawhereWidth, drawhereHeight, images],
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
              const [body, spriteBody, constraint, elementKey] = args;
              console.log('Creating body for:', elementKey);
              
              // TODO: La frequence de rafraichissement de la physique est trop lente, ce qui fait que les objets ne sont pas dans le même axe
              Events.on(engine, "beforeUpdate", function (event) {
                // Set the angle of the spriteBody to the angle of the body
                Body.setAngle(spriteBody, body.angle);
              });

              // Add hover event
              body.label = elementKey;
              spriteBody.label = elementKey + "_sprite";
              console.log('Added labels to body:', body.label);

              if (spriteBody.parts[0].render.sprite.texture.match("moninShadow")) {
                Composite.add(world, body);
              } else {
                Composite.add(world, [body, spriteBody, constraint]);
              }
            }

            // Render the world
            Render.run(render);
          };

          // Log all bodies in the world periodically to check if labels are present
          setTimeout(() => {
            console.log('All bodies in world:', Composite.allBodies(world).map(body => body.label));
          }, 2000);

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

          console.log("Adding mouse events");
          
          // Add style for hover text
          const hoverTextStyle = document.createElement('style');
          hoverTextStyle.textContent = `
            .hover-text {
              position: fixed;
              transform: translate(-50%, -50%);
              pointer-events: none;
              color: white;
              background: rgba(0, 0, 0, 0.7);
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 14px;
              z-index: 1000;
              font-family: Arial, sans-serif;
            }
          `;
          document.head.appendChild(hoverTextStyle);

          // Create hover text element
          const hoverText = document.createElement('div');
          hoverText.className = 'hover-text';
          hoverText.style.display = 'none';
          document.body.appendChild(hoverText);

          // Add mousemove event using MouseConstraint
          Events.on(mouseConstraint, 'mousemove', function(event) {
            const hoveredBodies = Matter.Query.point(Composite.allBodies(world), event.mouse.position);
            
            if (hoveredBodies.length > 0) {
              const hoveredBody = hoveredBodies[0];
              if (hoveredBody.label && !hoveredBody.label.includes('_sprite')) {
                console.log('Hovered element:', hoveredBody.label);
                
                // Find the sprite body associated with this body
                const spriteBody = Composite.allBodies(world).find(
                  body => body.label === hoveredBody.label + '_sprite'
                );
                
                if (spriteBody) {
                  // Get the center position of the sprite body
                  const bounds = spriteBody.bounds;
                  const centerX = (bounds.max.x + bounds.min.x) / 2;
                  const centerY = (bounds.max.y + bounds.min.y) / 2;

                  // Update hover text content and position
                  hoverText.textContent = hoveredBody.label;
                  hoverText.style.display = 'block';
                  hoverText.style.left = `${centerX}px`;
                  hoverText.style.top = `${centerY}px`;
                }
              }
            } else {
              // Hide text when not hovering any body
              hoverText.style.display = 'none';
            }
          });

          // Hide text when mouse leaves canvas
          render.canvas.addEventListener('mouseleave', () => {
            hoverText.style.display = 'none';
          });

          // Clean up on component unmount
          onBeforeUnmount(() => {
            hoverText.remove();
            hoverTextStyle.remove();
          });

          // Add mouseout event to reset the last hovered element
          // Events.on(mouseConstraint, 'mouseout', function(event) {
          //   Composite.allBodies(world).forEach(body => {
          //     if (body.render && body.render.sprite) {
          //       body.render.opacity = 1;
          //       Body.setScale(body, 1, 1);
          //     }
          //   });
          // });

          // Add mouse hover event using MouseConstraint
          Events.on(mouseConstraint, 'mousedown', function(event) {
            console.log("Mouse down", event.mouse.position);
            const hoveredBodies = Matter.Query.point(Composite.allBodies(world), event.mouse.position);
            
            if (hoveredBodies.length > 0) {
              const hoveredBody = hoveredBodies[0];
              if (hoveredBody.label && !hoveredBody.label.includes('_sprite')) {
                console.log('Clicked element:', hoveredBody.label);
              }
            }
          });

          // Allow to scroll on the canvas
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
            let gifRefreshInterval = 0;

            // setInterval((gifRefreshInterval) => {
            //   // If there's a body from the last frame, remove it
            //   if (initialGifBody) {
            //     // Increment the frame
            //     let nextFrame = (currentFrame + 1) % gifObjects.length;

            //     var speed = Body.getVelocity(initialGifBody.body);

            //     meubles[gifObjects[nextFrame]].body.position.x =
            //       initialGifBody.body.position.x;
            //     meubles[gifObjects[nextFrame]].body.position.y =
            //       initialGifBody.body.position.y;

            //     Body.setVelocity(initialGifBody.body, 0);
            //     Body.setVelocity(initialGifBody.spriteBody, 0);

            //     Composite.remove(world, initialGifBody.body, true);
            //     Composite.remove(world, initialGifBody.spriteBody, true);
            //     Composite.remove(world, initialGifBody.constraint, true);
            //   }

            //   currentFrame = (currentFrame + 1) % gifObjects.length;

            //   // Get the preloaded body for the next frame
            //   initialGifBody = preloadedBodies[currentFrame];

            //   Body.setPosition(initialGifBody.body, {
            //     x: meubles[gifObjects[currentFrame]].body.position.x,
            //     y: meubles[gifObjects[currentFrame]].body.position.y,
            //   });

            //   Body.setVelocity(initialGifBody.body, speed);
            //   Body.setVelocity(initialGifBody.spriteBody, speed);

            //   // Add the body to the world
            //   Composite.add(world, [
            //     initialGifBody.body,
            //     initialGifBody.spriteBody,
            //     initialGifBody.constraint,
            //   ]);

            //   setTimeout(() => {
            //     gifRefreshInterval = 3000;
            //   }, 3000);
            // }, 3000);

            (function gifRefresh() {
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

              setTimeout(gifRefresh, 3000);
            })();
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

          // Verify events are properly bound
          console.log("Engine events:", engine.events);
          console.log("Mouse events bound:", Events.eventNames(engine));
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
