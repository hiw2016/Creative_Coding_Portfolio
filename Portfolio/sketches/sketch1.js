let fish = [];
let food = [];
let bubbles = [];
let plants = [];
let colors = ["#f4cfc7", "#e79796", "#ffbe98", "#ffc98b", "#c6c09c", "#c8d9e6"];
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
  installCanvasInteractions();

  // fish
  for (let i = 0; i < 8; i++) {
    fish.push(new Fish(random(width), random(height)));
  }

  // plants
  for (let i = 0; i < 30; i++) {
    plants.push(new Plant(random(width), height));
  }

  // bubbles
  for (let i = 0; i < 30; i++) {
    bubbles.push(new Bubble(random(width), height));
  }
}

function draw() {
  background("#648ec0");

  // plants
  for (let i = 0; i < plants.length; i++) {
    plants[i].display();
  }

  // bubbles
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();

    if (bubbles[i].y < 0) {
      bubbles.splice(i, 1);
    }
  }

  // food
  for (let i = food.length - 1; i >= 0; i--) {
    food[i].update();
    food[i].display();
  }

  // fish
  for (let i = 0; i < fish.length; i++) {
    fish[i].update();
    fish[i].eat(food);
    fish[i].display();
  }
}

function addFood(x, y) {
  for (let i = 0; i < 12; i++) {
    food.push(new Food(x + random(-15, 15), y));
  }
}

function handleCanvasPointer(clientX, clientY) {
  const rect = canvas.elt.getBoundingClientRect();
  addFood(clientX - rect.left, clientY - rect.top);
}

function installCanvasInteractions() {
  const canvasElement = canvas.elt;

  canvasElement.addEventListener("click", (event) => {
    handleCanvasPointer(event.clientX, event.clientY);
  });

  canvasElement.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      handleCanvasPointer(touch.clientX, touch.clientY);
      event.preventDefault();
    },
    { passive: false },
  );
}

function mousePressed() {
  addFood(mouseX, mouseY);
}

function touchStarted() {
  addFood(touchX, touchY);
  return false;
}

class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1, 2);
    this.size = random(20, 35);
    this.color = random(colors);
  }

  update() {
    this.x += this.speed;
    if (this.x > width) this.x = 0;
  }

  eat(foodArray) {
    for (let i = foodArray.length - 1; i >= 0; i--) {
      let d = dist(this.x, this.y, foodArray[i].x, foodArray[i].y);
      if (d < this.size) {
        foodArray.splice(i, 1);
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    noStroke();
    ellipse(0, 0, this.size, this.size * 0.6);
    triangle(
      -this.size / 2,
      0,
      -this.size,
      -this.size / 4,
      -this.size,
      this.size / 4,
    );
    pop();
  }
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xVel = random(-0.3, 0.3);
    this.yVel = random(0.5, 1.2);
    this.size = random(4, 7);
  }

  update() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  display() {
    noStroke();
    fill(255, 200, 0);
    ellipse(this.x, this.y, this.size);
  }
}

class Bubble {
  constructor(x, y) {
    this.x = random(0, windowWidth);
    this.y = random(0, windowHeight);
    this.size = random(5, 15);
    this.speed = random(0.5, 2);
  }

  update() {
    this.y -= this.speed;
  }

  display() {
    noFill();
    strokeWeight(2);
    stroke(255, 150);
    ellipse(this.x, this.y, this.size);
  }
}

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = random(60, 120);
  }

  display() {
    stroke("#799851");
    strokeWeight(5);
    line(this.x, this.y, this.x, this.y - this.height);
  }
}

function windowResized() {
  const { width, height } = getCanvasSize();
  resizeCanvas(width, height);
}
