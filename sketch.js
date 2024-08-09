// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />

let imgs;
let nFiles = 828;
// let nFiles = 80;
let frame;
let sign = 1;

function preload() {
  imgs = [];
  for (let i = 1; i <= nFiles; i++) {
    let n = ('000'+i).slice(-3);
    let img = loadImage(`data/frames/frame-${n}.png`);
    imgs.push(img)
  }
}

function setup() {
  createCanvas(imgs[0].width, imgs[0].height)
  frameRate(30);
  frame = 1;
  console.log('Press SPACE to stop looping or r to reset.')
}

function draw() {
  if (frame > nFiles-1 || (frame == 1 && sign < 0)) {
    sign = sign * -1
  }
  console.log(frame);
  // Draw the image.
  image(imgs[frame-1], 0, 0);
  frame = frame + sign*1;
}

function resetSketch() {
  background(0)
}
