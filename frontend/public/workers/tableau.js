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

  async function createBody(key, meubles, forMainThread) {
    // Fetch the file from the public folder
    const response = await fetch(`/images/${key}.json`);
    if (!response.ok) {
      console.error(`Error fetching file: ${response.statusText}`);
      return;
    }
    const fileContent = await response.json();

    const positionX = meubles[key].body.position.x;
    const positionY = meubles[key].body.position.y;
    let body = Bodies.fromVertices(positionX, positionY, [fileContent], {
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
