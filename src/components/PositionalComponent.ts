
export class PositionalComponent {
  constructor(
      public position: MathVector2d = {x: 0, y: 0},
      public velocity: MathVector2d = {x: 0, y: 0},
      public dimension: MathVector2d = {x: 10, y: 10},
      public breakingForcePercentage: number = 0.6) {}
}