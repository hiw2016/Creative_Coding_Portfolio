let fireworks = [];
let colors = [
  "#f2002b",
  "#f64021",
  "#f98016",
  "#fcc00b",
  "#ffff00",
  "#00cc66",
  "#496ddb",
  "#7209b7",
  "#a01a7d",
];

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
}

function draw() {
  background(0, 40);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  fireworks.push(new Firework(mouseX, height));
}

class Firework {
  constructor(x, y) {
    this.rocket = new Rocket(x, y);
    this.exploded = false;
    this.particles = [];
  }

  update() {
    if (!this.exploded) {
      this.rocket.update();
      if (this.rocket.vy >= 0) {
        this.exploded = true;
        this.explode();
      }
    } else {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();
        if (this.particles[i].alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }
  }

  explode() {
    let c = random(colors);
    for (let i = 0; i < 80; i++) {
      this.particles.push(new Particle(this.rocket.x, this.rocket.y, c));
    }
  }

  show() {
    if (!this.exploded) {
      this.rocket.show();
    } else {
      for (let p of this.particles) {
        p.show();
      }
    }
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }
}

class Rocket {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = random(-10, -7);
    this.size = 8;
  }

  update() {
    this.y += this.vy;
    this.vy += 0.15;
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = random(-4, 4);
    this.vy = random(-4, 4);
    this.alpha = 255;
    this.size = random(4, 7);
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.alpha -= 4;
  }

  show() {
    noStroke();
    fill(this.color + hex(floor(this.alpha), 2));
    ellipse(this.x, this.y, this.size);
  }
}
