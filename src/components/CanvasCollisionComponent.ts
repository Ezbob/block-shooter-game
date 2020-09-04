import Vector2D from "../dataStructures/Vector2D";

export default class CanvasCollisionComponent {
    constructor(
        public canvasPaddingX: Vector2D = new Vector2D(0,0),
        public canvasPaddingY: Vector2D = new Vector2D(0,0)
    ) {}
};