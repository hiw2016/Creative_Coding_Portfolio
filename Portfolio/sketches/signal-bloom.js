function setup() {
  const canvas = createCanvas(getCanvasWidth(), getCanvasHeight());
  canvas.parent("canvasMount");
}

function draw() {
  background(18, 24, 38);

  let centerX = width / 2;
  let centerY = height / 2;

  for (let i = 0; i < 5; i++) {
    let y = centerY + i * 30 - 60;
    stroke(255 - i * 20, 150 + i * 10, 180 + i * 10);
    strokeWeight(10);
    noFill();
    beginShape();

    for (let x = 0; x <= width; x += 20) {
      let wave = sin(frameCount * 0.03 + x * 0.02 + i) * 30;
      curveVertex(x, y + wave);
    }

    endShape();
  }

  noStroke();
  fill(255, 240, 220);
  circle(centerX, centerY, 50 + sin(frameCount * 0.05) * 10);
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
