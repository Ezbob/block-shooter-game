

export class DrawableComponent {
  constructor(
      public priority: number = -1,
      public color: string = 'rgb(0,8,255)',
      public isFilled: boolean = true) {}
};