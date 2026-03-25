let bubbles = [];
const sketches = [
  { name: "Aquarium", fileName: "sketch1" },
  { name: "Solar System", fileName: "sketch2" },
  { name: "Balloons", fileName: "sketch3" },
  { name: "Fireworks", fileName: "sketch4" },
];
let bubbleImage;

function preload() {
  bubbleImage = loadImage("./img/bubble.png");
}

function createBubbles() {
  bubbles = [];
  const baseRadius = min(windowWidth, windowHeight) < 700 ? 62 : 84;

  for (let i = 0; i < sketches.length; i++) {
    let x = random(baseRadius, width - baseRadius);
    let y = random(baseRadius, height - baseRadius);
    let r = random(baseRadius * 0.8, baseRadius * 1.1);
    let vx = random(-1.6, 1.6);
    let vy = random(-1.6, 1.6);

    if (abs(vx) < 0.4) vx = 0.4 * (vx < 0 ? -1 : 1);
    if (abs(vy) < 0.4) vy = 0.4 * (vy < 0 ? -1 : 1);

    bubbles.push(
      new Bubble(x, y, r, vx, vy, sketches[i].name, sketches[i].fileName),
    );
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createBubbles();

  textAlign(CENTER, CENTER);
  textSize(min(windowWidth, windowHeight) < 700 ? 12 : 14);
}

function draw() {
  background("#f7fbfd");

  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      bubbles[i].checkCollision(bubbles[j]);
    }
  }
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }

  const hoveringBubble = bubbles.some((bubble) =>
    bubble.contains(mouseX, mouseY),
  );
  cursor(hoveringBubble ? HAND : ARROW);
}

class Bubble {
  constructor(x, y, r, vx, vy, name, fileName) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.name = name;
    this.fileName = fileName;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // check edges
    if (this.x < this.r || this.x > width - this.r) {
      this.vx *= -1;
    }
    if (this.y < this.r || this.y > height - this.r) {
      this.vy *= -1;
    }
  }

  checkCollision(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    let minDist = this.r + other.r;

    if (distance < minDist) {
      let tempVx = this.vx;
      let tempVy = this.vy;

      this.vx = other.vx;
      this.vy = other.vy;

      other.vx = tempVx;
      other.vy = tempVy;

      let overlap = minDist - distance;
      let angle = atan2(dy, dx);

      this.x -= (cos(angle) * overlap) / 2;
      this.y -= (sin(angle) * overlap) / 2;
      other.x += (cos(angle) * overlap) / 2;
      other.y += (sin(angle) * overlap) / 2;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(this.x, this.y, this.r, 0, TWO_PI);
    drawingContext.clip();

    if (bubbleImage) {
      image(bubbleImage, this.x, this.y, this.r * 2, this.r * 2);
    } else {
      noStroke();
      fill(255, 220);
      circle(this.x, this.y, this.r * 2);
    }

    drawingContext.restore();

    stroke(255, 255, 255, 135);
    strokeWeight(2);
    noFill();
    circle(this.x, this.y, this.r * 2);

    noStroke();
    fill(34, 49, 63);
    textStyle(BOLD);
    textSize(this.r * 0.2);
    text(this.name, this.x, this.y);
    pop();
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) <= this.r;
  }
}

function mousePressed() {
  const clickedBubble = bubbles.find((bubble) =>
    bubble.contains(mouseX, mouseY),
  );

  if (clickedBubble) {
    window.location.href = `./sketches/${clickedBubble.fileName}.html`;
  }
}

function touchStarted() {
  const tappedBubble = bubbles.find((bubble) =>
    bubble.contains(touchX, touchY),
  );

  if (tappedBubble) {
    window.location.href = `./sketches/${tappedBubble.fileName}.html`;
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textSize(min(windowWidth, windowHeight) < 700 ? 12 : 14);
  createBubbles();
}
