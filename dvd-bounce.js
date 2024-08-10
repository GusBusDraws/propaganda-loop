// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />

let dvdShape;
let angle = 0;
let rotationSpeed = 2;
let bg = '#000000'

let staticScale = 0.75;

let bounce = true;
let bounceScale = 0.5;
let x;
let y;
let xspeed = 10;
let yspeed = 10;
let xspeedSign;
let yspeedSign;
let rightBuffer = 150;
let leftBuffer = 200;
let topBuffer = 225;
let bottomBuffer = 200;
let cam1;
let cam2;

function preload() {
  // shape = loadModel('data/armadillo-0.2x-skull.stl');
  // shape = loadModel('data/angler-fish-1x-binary.stl');
  dvdShape = loadModel('data/angler-fish-0.5x-20msd-head-simplified-centered.stl');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // Create the first camera.
  cam1 = createCamera();
  resetSketch();
  frameRate(22);
  angleMode(DEGREES);
  console.log('Press SPACE to stop looping or r to reset.')
}

function draw() {
  background(bg);
  // Enable orbiting with the mouse.
  orbitControl();

  // Set scene
  // rotateZ(angle);
  // rotateX(angle);
  translate(0, 25, 0)
  rotateX(90);
  // Bounce (if set)
  if (bounce) {
    scale(bounceScale);
    translate(x, 0, y)
    x = x + xspeed
    y = y + yspeed
    if (x + xspeed >= width - rightBuffer) {
      xspeed = -1 * xspeed
      x = width - rightBuffer
    } else if (x + xspeed <= -width + leftBuffer) {
      xspeed = -1 * xspeed
      x = -width + leftBuffer
    }
    if (y + yspeed >= height - topBuffer) {
      yspeed = -1 * yspeed
      y = height - topBuffer
    } else if (y + yspeed <= -height + bottomBuffer) {
      yspeed = -1 * yspeed
      y = -height + bottomBuffer
    }
  } else {
    scale(staticScale);
  }
  // Draw the shape.
  rotateZ(angle);
  noStroke();
  normalMaterial();
  model(dvdShape);
  // Rotate for next frame
  angle += rotationSpeed;
  // if (frameCount < 181) {
  //   let i = frameCount - 1
  //   let n = ('000'+i).slice(-3);
  //   saveCanvas(`frame${n}.png`);
  // }
}

function resetSketch() {
  cam2 = createCamera();
  cam2.set(cam1);
  if (bounce) {
    x = random(-width + leftBuffer, width - rightBuffer)
    y = random(-height + bottomBuffer, height - topBuffer)
    xspeedSign = random([-1, 1]);
    xspeed = xspeedSign * xspeed;
    yspeedSign = random([-1, 1]);
    yspeed = yspeedSign * yspeed;
  } else {
    x = 0;
    y = 0;
  }
}

function keyPressed() {
    // Set spacebar to toggle play/pause of drawing loop
    if (key === ' ') {
      if (isLooping()) {
        noLoop();
        console.log('STOPPED. Press SPACE to resume.')
      } else {
        loop();
        console.log('RESUMED. Press SPACE to stop.')
      }
    }
    if (keyCode === ENTER) {
      resetSketch();
    }
    if (key === 'r') {
      resetSketch();
    }
    if (key === 's') {
      if (bounce) {
        bounce = false;
      } else {
        bounce = true;
      }
    }
  }
  
