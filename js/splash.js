export class Splash {
  constructor(container, x, y) {
    this.container = container;
    this.x = x;
    this.y = y;
  }

  trigger() {
    for (let i = 0; i < 40; i++) this.createParticle();
  }

  createParticle() {
    const el = document.createElement('div');
    el.className = 'splash-particle';
    const size = Math.random() * 8 + 3;
    Object.assign(el.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${this.x}px`,
      top: `${this.y}px`,
    });
    this.container.appendChild(el);

    const angle = (Math.random() * 120 + 30) * Math.PI / 180;
    const speed = Math.random() * 180 + 70;
    let vx = Math.cos(angle) * speed;
    let vy = -Math.sin(angle) * speed;
    let curX = this.x, curY = this.y;
    const startTime = performance.now();
    let lastTime = startTime;

    const frame = (now) => {
      const elapsed = (now - startTime) / 1000;
      if (elapsed > 0.8) return el.remove();

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      vy += 400 * dt;
      curX += vx * dt;
      curY += vy * dt;

      Object.assign(el.style, {
        left: `${curX}px`,
        top: `${curY}px`,
        opacity: Math.max(0, 1 - elapsed / 0.8),
      });

      if (curY > this.container.clientHeight || curX < 0 || curX > this.container.clientWidth) {
        el.remove();
      } else {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }
}
