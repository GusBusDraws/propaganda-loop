// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />

let imgs;
let img;
let shape;
let p3d;
let p2d;
// let nFiles = 828;
let nFiles = 2;
let frame;
let sign = 1;

function preload() {
  imgs = [];
  shape = loadModel('data/10msd_196.stl');
  for (let i = 1; i <= nFiles; i++) {
    let n = ('000'+i).slice(-3);
    img = loadImage(`data/frames/frame-${n}.png`);
    imgs.push(img)
  }
}

function setup() {
  createCanvas(imgs[0].width, imgs[0].height)
  frameRate(30);
  frame = 1;
  // Create the p5.Graphics object in WebGL mode.
  p3d = createGraphics(imgs[0].width, imgs[0].height, WEBGL);
  p2d = createGraphics(100, 100);
  p2d.background('#ff0000')
  console.log('Press SPACE to stop looping or r to reset.')
}

function draw() {
  if (frame > nFiles-1 || (frame == 1 && sign < 0)) {
    sign = sign * -1
  }
  // console.log(frame);
  // Draw the image.
  // image(imgs[frame-1], 0, 0);
  image(imgs[0], 0, 0);
  img = imgs[0];

  // Enable orbiting with the mouse.
  // p3d.orbitControl();

  // Draw the shape.
  p3d.noStroke();
  p3d.model(shape);
  p3d.ambientLight();
  p3d.texture(p2d);
  image(p3d, 0, 0);

  frame = frame + sign*1;
}

function resetSketch() {
  background(0)
}
