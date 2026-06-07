import { Splash } from './splash.js';
export class Animator {
  constructor(stage, viewport, setButtonsDisabled) {
    this.stage = stage;
    this.viewport = viewport;
    this.setButtonsDisabled = setButtonsDisabled;
    this.activeTimeout = null;
    this.splashTimeouts = [];
  }
  clear() {
    if (this.activeTimeout) clearTimeout(this.activeTimeout);
    this.splashTimeouts.forEach(clearTimeout);
    this.splashTimeouts = [];
  }
  trigger(action) {
    this.clear();
    this.stage.classList.remove('swim-active', 'dive-active', 'breach-active');
    if (action === 'swim') return this.stage.classList.add('swim-active');
    this.setButtonsDisabled(true);
    this.stage.classList.add(`${action}-active`);
    if (action === 'dive') {
      this.scheduleSplash(1000, 250, 180);
      this.activeTimeout = setTimeout(() => this.reset(), 3500);
    } else if (action === 'breach') {
      this.scheduleSplash(1200, this.viewport.clientWidth * 0.65, 180);
      this.scheduleSplash(3200, this.viewport.clientWidth * 0.35, 180);
      this.activeTimeout = setTimeout(() => this.reset(), 4500);
    }
  }
  scheduleSplash(delay, x, y) {
    this.splashTimeouts.push(setTimeout(() => new Splash(this.viewport, x, y).trigger(), delay));
  }
  reset() {
    this.stage.classList.remove('dive-active', 'breach-active');
    this.stage.classList.add('swim-active');
    this.setButtonsDisabled(false);
  }
}
