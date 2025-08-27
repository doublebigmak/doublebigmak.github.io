import confetti from 'canvas-confetti';

// Big burst from center
export function confettiBurst() {
  confetti({
    particleCount: 180,
    spread: 90,
    startVelocity: 55,
    origin: { x: 0.5, y: 0.4 }, // middle-ish
    gravity: 0.9,
    ticks: 200,
    scalar: 1,
  });
}

// Gentle falling for a short time
export function confettiFall(durationMs = 2500) {
  const end = Date.now() + durationMs;

  (function frame() {
    confetti({
      particleCount: 7,
      spread: 70,
      startVelocity: 0,
      gravity: 1.2,
      origin: { x: Math.random(), y: -0.05 }, // from above top
      drift: (Math.random() - 0.5) * 0.6,
      scalar: 0.9,
      ticks: 300,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function celebrate() {
  confettiBurst();
  confettiFall(2500);
}