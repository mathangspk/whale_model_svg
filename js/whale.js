export class Whale {
  constructor(stage, codeView) {
    this.stage = stage;
    this.codeView = codeView;
  }
  async load(id) {
    const res = await fetch(`svg/${id}.svg?t=${Date.now()}`);
    if (!res.ok) throw new Error(`Load failed: ${id}`);
    const svgText = await res.text();
    this.stage.innerHTML = svgText;
    const svg = this.stage.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
    }
    this.codeView.textContent = svgText.trim();
  }
}
