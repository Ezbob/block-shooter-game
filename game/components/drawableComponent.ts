
export default class DrawableComponent {
  color: any;
  isFilled: any;
  constructor(color?: string, isFilled?: boolean) {
    this.color = color || 'rgb(0,8,255)';
    this.isFilled = isFilled || true;
  }
};