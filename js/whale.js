export class Whale {
  constructor(stage, codeView) {
    this.stage = stage;
    this.codeView = codeView;
    this._cache = {};
  }

  async load(id) {
    if (!this._cache[id]) {
      const res = await fetch(`svg/${id}.svg`);
      if (!res.ok) throw new Error(`Load failed: ${id}`);
      this._cache[id] = await res.text();
    }
    const svgText = this._cache[id];
    this.stage.innerHTML = svgText;
    const svg = this.stage.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
    }
    this.codeView.textContent = svgText.trim();
  }
}
