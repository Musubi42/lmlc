import decomp from "poly-decomp";
import {
  Bodies,
  Common,
  Body,
  Constraint,
} from "matter-js";
Common.setDecomp(decomp);
self.onmessage = async function (event) {
  const { functionName, args } = event.data;

  if (functionName === "createBody") {
    createBody(...args);
  } 

  async function createBody(key, meubles, isMobile, forMainThread, drawHereWidth, drawHereHeight) {
    // Fetch the file from the public folder
    // const response = await fetch(`@/../../tableau/vertices/${key}.json`);
    // Repasser sur public pour éviter les fetch qui fails

    // Vrai vertices
    // const response = await fetch(`/tableau/vertices/${key}.json`);

    // Vertices pour test les tailles
    var response = "";

    
    try {
      response = await fetch(`/tableau/vertices/${key}.json`);
    } catch (error) {
      console.error(error);
      // response = await fetch(`/tableau/vertices/monin.json`);
    }
    
    
    if (!response.ok) {
      console.error(`Error fetching file: ${response.statusText}`);
      response = await fetch(`/tableau/vertices/monin.json`);
      // return;
    }
    const fileContent = await response.json();

    const positionX = meubles[key].body.position.x;
    const positionY = meubles[key].body.position.y;

    const isMoninShadow = meubles[key].sprite.image.match('moninShadow.png');

    let body;
    if (isMobile) {
      body = Bodies.rectangle(Math.random() * render.canvas.width, // x position
    -200, meubles[key].body.size.width, meubles[key].body.size.height, {
      // collisionFilter: {
      //   // category: 2, // You can set your own category here
      //   mask: 0, // Enable or disable collision based on collisionEnabled
      // },
      render: {
        // visible: meubles[key].sprite.image.match('timur.png') ? true : false,
        visible: false,
      },
    });
    } else {
      body = Bodies.fromVertices(300, // x position
    -200, [fileContent], {
        render: {
          visible: false,
        },
      });
    }

    // if (isMoninShadow) {
    //   // body.collisionFilter.mask = -1;
    //   body.collisionFilter = {
    //     category: 1, // You can set your own category here
    //     mask: 0, // Enable or disable collision based on collisionEnabled
    //   };
    // }
    

    Body.setAngle(body, meubles[key].body.angle);


    let width = body.bounds.max.x - body.bounds.min.x;
    let height = body.bounds.max.y - body.bounds.min.y;

    let position = {
      x: Math.random() * (drawHereWidth - width),
      y: Math.random() * (drawHereHeight - height)
    };

    Body.setPosition(body, position);

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
        visible: meubles[key].sprite.image.endsWith('.svg') ? true : false,
      },
    });

    if (forMainThread) {
      self.postMessage({
        functionName: "createBody",
        args: [body, spriteBody, constraint],
      });
    } else {
      return { body, spriteBody, constraint };
    }
  }
};
