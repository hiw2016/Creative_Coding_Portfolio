let planets = [];
let stars = [];
let canvas;

function getCanvasSize() {
  const mount = document.getElementById("canvasMount");
  const width = mount ? mount.clientWidth : 800;
  const height = mount ? Math.min(width, window.innerHeight * 0.7) : 800;
  return { width, height: Math.max(420, height) };
}

function setup() {
  const { width, height } = getCanvasSize();
  canvas = createCanvas(width, height);
  canvas.parent("canvasMount");
  angleMode(RADIANS);

  // stars
  for (let i = 0; i < 150; i++) {
    stars.push(new Star());
  }
  // mercury
  planets.push(new Planet(50, 0.02, 5, color(163, 163, 163)));
  // venus
  planets.push(new Planet(75, 0.015, 10, color(191, 132, 44)));
  // earth
  planets.push(new Planet(100, 0.02, 15, color(25, 51, 112)));
  // mars
  planets.push(new Planet(125, 0.015, 10, color(196, 95, 65)));
  // jupiter
  planets.push(new Planet(150, 0.02, 25, color(207, 184, 151)));
  // saturn
  planets.push(new Planet(200, 0.015, 40, color(227, 221, 197)));
  // uranus
  planets.push(new Planet(250, 0.02, 15, color(36, 173, 189)));
  // neptune
  planets.push(new Planet(300, 0.015, 25, color(59, 106, 235)));
}

function draw() {
  background(10);
  // stars
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }

  // sun
  translate(width / 2, height / 2);
  noStroke();
  fill(255, 200, 0);
  ellipse(0, 0, 80);

  for (let i = 0; i < planets.length; i++) {
    planets[i].orbit();
    planets[i].display();
  }
}

class Planet {
  constructor(distance, speed, size, col) {
    this.distance = distance; // distance from sun
    this.angle = random(TWO_PI);
    this.speed = speed; // rotation speed
    this.size = size;
    this.col = col;
  }

  orbit() {
    this.angle += this.speed;
  }

  display() {
    push();
    rotate(this.angle);
    translate(this.distance, 0);
    fill(this.col);
    noStroke();
    ellipse(0, 0, this.size);

    // ring
    if (this.distance == 200) {
      strokeWeight(5);
      stroke(255, 100);
      noFill();
      ellipse(0, 0, this.size + 10, this.size / 2);
    }
    pop();
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
  }

  display() {
    noStroke();
    fill(255);
    circle(this.x, this.y, this.size);
  }
}

function windowResized() {
  const { width, height } = getCanvasSize();
  resizeCanvas(width, height);
}
