let confetti = [];
let canvases = [];
let ctxList = [];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function startConfetti() {
  canvases = Array.from(document.querySelectorAll(".confetti-canvas"));

  ctxList = canvases.map((canvas) => ({
    ctx: canvas.getContext("2d"),
    type: canvas.classList.contains("confetti-ribbon") ? "ribbon" : "basic",
    canvas,
  }));

  resizeCanvasAll();

  const colors = ["#FBC4C4", "#E6C1C1"];
  const total = 10;
  const inside = Math.floor(total * 0.5);

  for (let i = 0; i < total; i++) {
    const spawnInside = i < inside;

    confetti.push({
      x: Math.random() * window.innerWidth,
      y: spawnInside
        ? randomRange(0, window.innerHeight)
        : randomRange(-window.innerHeight, 0),
      r: randomRange(3, 6),
      d: randomRange(0.3, 0.6),
      color: colors[Math.floor(Math.random() * colors.length)],
      horizontalSpeed: Math.random() < 0.5 ? -0.4 : 0.4,
      tiltAngle: randomRange(0, Math.PI),
      rotation: randomRange(0, Math.PI * 2),
      rotationSpeed: randomRange(-0.005, 0.005),
    });
  }

  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctxList.forEach(({ ctx, canvas }) =>
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  );

  confetti.forEach((c) => {
    c.y += c.d;
    c.x += c.horizontalSpeed;
    c.x += Math.sin(c.tiltAngle) * 0.2;
    c.tiltAngle += 0.03;
    c.rotation += c.rotationSpeed;

    if (c.x < -20 || c.x > window.innerWidth + 20) {
      c.x = Math.random() * window.innerWidth;
      c.y = -10;
    }
    if (c.y > window.innerHeight) {
      c.y = -10;
      c.x = Math.random() * window.innerWidth;
    }

    drawConfettiToAll(c);
  });

  requestAnimationFrame(updateConfetti);
}

function drawConfettiToAll(c) {
  ctxList.forEach(({ ctx, type }) => {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rotation);

    if (type === "basic") {
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.r / 2, -c.r * 2, c.r, c.r * 4);
    } else if (type === "ribbon") {
      const gradient = ctx.createLinearGradient(0, 0, 30, 0);
      gradient.addColorStop(0, "#F9D976");
      gradient.addColorStop(0.5, "#F39C12");
      gradient.addColorStop(1, "#F9D976");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(1, c.r);
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.95;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(10, -20, 20, 20, 30, 0);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = Math.max(0.5, c.r / 4);
      ctx.beginPath();
      ctx.bezierCurveTo(5, -10, 15, 10, 25, 0);
      ctx.stroke();

      ctx.globalAlpha = 1;
    }

    ctx.restore();
  });
}

function resizeCanvasAll() {
  canvases.forEach((c) => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  });
}

window.addEventListener("resize", resizeCanvasAll);

window.startConfetti = startConfetti;
