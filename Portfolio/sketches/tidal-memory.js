let drops = [];

function setup() {
  const canvas = createCanvas(getCanvasWidth(), getCanvasHeight());
  canvas.parent("canvasMount");

  for (let i = 0; i < 40; i++) {
    drops.push({
      x: random(width),
      y: random(height),
      speed: random(1, 3),
    });
  }
}

function draw() {
  background(190, 231, 247);

  stroke(255);
  strokeWeight(12);
  noFill();

  for (let y = 120; y < height; y += 90) {
    beginShape();
    for (let x = 0; x <= width; x += 30) {
      let wave = sin(frameCount * 0.03 + x * 0.03 + y * 0.01) * 20;
      curveVertex(x, y + wave);
    }
    endShape();
  }

  noStroke();
  fill(255, 255, 255, 170);

  for (let i = 0; i < drops.length; i++) {
    let drop = drops[i];
    circle(drop.x, drop.y, 8);
    drop.y = drop.y + drop.speed;

    if (drop.y > height) {
      drop.y = 0;
      drop.x = random(width);
    }
  }
}

function mousePressed() {
  drops.push({
    x: mouseX,
    y: mouseY,
    speed: random(1, 3),
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
