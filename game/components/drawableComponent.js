
export default class DrawableComponent {
  constructor(color, isFilled) {
    this.color = color || 'rgb(0,8,255)';
    this.isFilled = isFilled || true;
  }
};