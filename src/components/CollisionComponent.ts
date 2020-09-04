import Vector2D from "../dataStructures/Vector2D";

export default class CollisionComponent {
    constructor(
        public isConstraintByCanvas: boolean = true,
        public canvasPadding: Vector2D = new Vector2D(0,0)
    ) {}
};