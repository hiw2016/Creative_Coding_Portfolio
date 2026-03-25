let balloons = [];
let colors = ["#9eccf0", "#f5c8c4", "#f59c9a", "#ffbe98", "#ffe7ab", "#c5dba9"];
let canvas;

function getCanvasSize() {
  const mount = document.getElementById("canvasMount");
  return {
    width: mount ? mount.clientWidth : 600,
    height: mount ? Math.max(420, window.innerHeight * 0.68) : 600,
  };
}

function setup() {
  const { width, height } = getCanvasSize();
  canvas = createCanvas(width, height);
  canvas.parent("canvasMount");

  for (let i = 0; i < 10; i++) {
    balloons.push(new Balloon(random(width), random(height, height + 200)));
  }
}

function draw() {
  background(200, 230, 255);

  for (let i = balloons.length - 1; i >= 0; i--) {
    balloons[i].float();
    balloons[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i < balloons.length; i++) {
    let d = dist(mouseX, mouseY, balloons[i].x, balloons[i].y);

    if (d < balloons[i].size / 2) {
      balloons[i].popped = true;
    }
  }
}

class Balloon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(40, 70);
    this.speed = random(1, 3);
    this.stringLength = random(100, 200);
    this.col = random(colors);
    this.popped = false;
  }

  float() {
    if (!this.popped) {
      this.y -= this.speed;
    }
  }

  display() {
    if (!this.popped) {
      stroke(255);
      line(this.x, this.y, this.x, this.y + this.stringLength);

      noStroke();
      fill(this.col);
      ellipse(this.x, this.y, this.size, this.size * 1.2);
    }
  }
}

function windowResized() {
  const { width, height } = getCanvasSize();
  resizeCanvas(width, height);
}
