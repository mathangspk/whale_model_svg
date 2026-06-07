export class Ocean {
  constructor(container) {
    this.container = container;
  }
  init() {
    setInterval(() => {
      if (!document.hidden) this.createBubble();
    }, 250);
  }
  createBubble() {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 8 + 4;
    const startX = Math.random() * this.container.clientWidth;
    Object.assign(b.style, { width: `${size}px`, height: `${size}px`, left: `${startX}px`, top: `${this.container.clientHeight}px` });
    this.container.appendChild(b);
    const maxRise = this.container.clientHeight - 180;
    const drift = Math.random() * 60 - 30;
    const anim = b.animate([
      { transform: 'translateY(0) translateX(0)', opacity: 0.7 },
      { transform: `translateY(-${maxRise}px) translateX(${drift}px)`, opacity: 0 }
    ], { duration: Math.random() * 3000 + 3000, easing: 'linear' });
    anim.onfinish = () => b.remove();
  }
}
