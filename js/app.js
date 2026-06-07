import { Ocean } from './ocean.js';
import { Whale } from './whale.js';
import { Animator } from './animator.js';

class App {
  constructor() {
    this.viewport = document.querySelector('.viewport-container');
    this.stage = document.querySelector('.whale-stage');
    this.codeView = document.getElementById('svg-code');
    this.whaleBtns = document.querySelectorAll('.whale-btn');
    this.actionBtns = document.querySelectorAll('.action-btn');
    this.copyBtn = document.getElementById('copy-code-btn');
    this.whale = new Whale(this.stage, this.codeView);
    this.animator = new Animator(this.stage, this.viewport, d => this.setBtnDisabled(d));
  }

  init() {
    this.whaleBtns.forEach(btn => btn.addEventListener('click', () => this.select(btn.dataset.whale, btn)));
    this.actionBtns.forEach(btn => btn.addEventListener('click', () => this.animator.trigger(btn.dataset.action)));
    this.copyBtn.addEventListener('click', () => this.copy());
    new Ocean(this.viewport).init();
    const defBtn = document.querySelector('[data-whale="blue"]');
    if (defBtn) this.select('blue', defBtn);
  }

  setBtnDisabled(d) {
    this.actionBtns.forEach(b => b.disabled = d);
    this.whaleBtns.forEach(b => b.disabled = d);
  }

  async select(id, btn) {
    this.whaleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    try {
      await this.whale.load(id);
      this.animator.trigger('swim');
    } catch (err) {
      console.error(err);
      this.codeView.textContent = `Error: ${err.message}`;
    }
  }

  copy() {
    navigator.clipboard.writeText(this.codeView.textContent).then(() => {
      const orig = this.copyBtn.textContent;
      this.copyBtn.textContent = 'Copied!';
      this.copyBtn.style.backgroundColor = 'var(--secondary)';
      setTimeout(() => {
        this.copyBtn.textContent = orig;
        this.copyBtn.style.backgroundColor = '';
      }, 1500);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new App().init());
