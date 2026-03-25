let gardenCircles = [];

function setup() {
  const canvas = createCanvas(getCanvasWidth(), getCanvasHeight());
  canvas.parent("canvasMount");

  for (let i = 0; i < 25; i++) {
    gardenCircles.push({
      x: random(width),
      y: random(height),
      size: random(30, 90),
      speed: random(0.3, 1),
    });
  }
}

function draw() {
  background(18, 24, 45, 40);

  for (let i = 0; i < 25; i++) {
    fill(255);
    noStroke();
    circle(random(width), random(height), 2);
  }

  for (let i = 0; i < gardenCircles.length; i++) {
    let c = gardenCircles[i];

    c.y = c.y - c.speed;
    if (c.y < -40) {
      c.y = height + 40;
    }

    fill(255, 170, 190, 80);
    circle(c.x, c.y, c.size);

    fill(130, 210, 255, 90);
    circle(c.x + 20, c.y - 10, c.size * 0.7);
  }
}

function mousePressed() {
  gardenCircles.push({
    x: mouseX,
    y: mouseY,
    size: random(30, 90),
    speed: random(0.3, 1),
  });
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight());
}

function getCanvasWidth() {
  return document.getElementById("canvasMount").clientWidth;
}

function getCanvasHeight() {
  return Math.max(window.innerHeight * 0.68, 460);
}
