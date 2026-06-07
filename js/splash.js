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
    Object.assign(el.style, { width: `${size}px`, height: `${size}px`, left: `${this.x}px`, top: `${this.y}px` });
    this.container.appendChild(el);
    const angle = (Math.random() * 120 + 30) * Math.PI / 180;
    const speed = Math.random() * 180 + 70;
    let vx = Math.cos(angle) * speed, vy = -Math.sin(angle) * speed;
    let curX = this.x, curY = this.y, t0 = performance.now();
    const frame = (now) => {
      const dt = (now - t0) / 1000;
      if (dt > 0.8) return el.remove();
      curX += vx * 0.016;
      vy += 400 * 0.016;
      curY += vy * 0.016;
      Object.assign(el.style, { left: `${curX}px`, top: `${curY}px`, opacity: Math.max(0, 1 - dt / 0.8) });
      if (curY > this.container.clientHeight || curX < 0 || curX > this.container.clientWidth) {
        el.remove();
      } else {
        requestAnimationFrame(frame);
      }
    };
    requestAnimationFrame(frame);
  }
}
