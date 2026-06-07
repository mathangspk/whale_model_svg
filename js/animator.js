import { Splash } from './splash.js';

export class Animator {
  constructor(stage, viewport, setButtonsDisabled) {
    this.stage = stage;
    this.viewport = viewport;
    this.setButtonsDisabled = setButtonsDisabled;
    this.activeAnim = null;
    this.resetTimeout = null;
    this.splashTimeouts = [];
  }

  clear() {
    if (this.activeAnim) {
      this.activeAnim.cancel();
      this.activeAnim = null;
    }
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
      this.resetTimeout = null;
    }
    this.splashTimeouts.forEach(clearTimeout);
    this.splashTimeouts = [];
  }

  trigger(action) {
    this.clear();
    this.stage.classList.remove('swim-active', 'dive-active', 'breach-active');

    if (action === 'swim') {
      this.stage.classList.add('swim-active');
      return;
    }

    this.setButtonsDisabled(true);
    this.stage.classList.add(`${action}-active`);

    if (action === 'dive') this._runDive();
    else if (action === 'breach') this._runBreach();
  }

  _runDive() {
    const vw = this.viewport.clientWidth;
    const vh = this.viewport.clientHeight;

    this.activeAnim = this.stage.animate([
      { transform: 'translate(0px, 0px) rotate(0deg)', opacity: 1, offset: 0 },
      { transform: `translate(-${vw * 0.05}px, ${vh * 0.07}px) rotate(-15deg)`, offset: 0.15 },
      { transform: `translate(-${vw * 0.18}px, ${vh * 0.38}px) rotate(-35deg)`, offset: 0.40 },
      { transform: `translate(-${vw * 0.32}px, ${vh * 0.60}px) rotate(-20deg)`, opacity: 0.5, offset: 0.70 },
      { transform: `translate(-${vw * 0.44}px, ${vh * 0.72}px) rotate(-5deg)`, opacity: 0.1, offset: 0.92 },
      { transform: `translate(-${vw * 0.52}px, ${vh * 0.76}px) rotate(0deg)`, opacity: 0, offset: 1 },
    ], {
      duration: 3500,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards',
    });

    this._scheduleSplash(1000, 250, 180);
    this.resetTimeout = setTimeout(() => this.reset(), 3500);
  }

  _runBreach() {
    const vw = this.viewport.clientWidth;
    const vh = this.viewport.clientHeight;

    this.activeAnim = this.stage.animate([
      { transform: `translate(${vw * 0.35}px, ${vh * 0.85}px) rotate(35deg)`, opacity: 0, offset: 0 },
      { transform: `translate(${vw * 0.35}px, ${vh * 0.85}px) rotate(35deg)`, opacity: 1, offset: 0.05 },
      { transform: `translate(${vw * 0.12}px, ${vh * 0.25}px) rotate(35deg)`, offset: 0.25 },
      { transform: `translate(-${vw * 0.08}px, -${vh * 0.50}px) rotate(-15deg)`, offset: 0.45 },
      { transform: `translate(-${vw * 0.18}px, -${vh * 0.42}px) rotate(-45deg)`, offset: 0.55 },
      { transform: `translate(-${vw * 0.30}px, ${vh * 0.22}px) rotate(-60deg)`, offset: 0.75 },
      { transform: `translate(-${vw * 0.38}px, ${vh * 0.60}px) rotate(-25deg)`, opacity: 0.8, offset: 0.92 },
      { transform: `translate(-${vw * 0.46}px, ${vh * 0.75}px) rotate(0deg)`, opacity: 0, offset: 1 },
    ], {
      duration: 4500,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'forwards',
    });

    this._scheduleSplash(1200, this.viewport.clientWidth * 0.65, 180);
    this._scheduleSplash(3200, this.viewport.clientWidth * 0.35, 180);
    this.resetTimeout = setTimeout(() => this.reset(), 4500);
  }

  _scheduleSplash(delay, x, y) {
    this.splashTimeouts.push(setTimeout(() => new Splash(this.viewport, x, y).trigger(), delay));
  }

  reset() {
    if (this.activeAnim) {
      this.activeAnim.cancel();
      this.activeAnim = null;
    }
    this.stage.classList.remove('dive-active', 'breach-active');
    this.stage.classList.add('swim-active');
    this.setButtonsDisabled(false);
  }
}
