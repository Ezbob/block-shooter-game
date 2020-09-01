import Vector from '../dataStructures/vector'

export default class DimensionalComponent {
    dimension: Vector;
    constructor(dimension?: Vector) {
        this.dimension = dimension || new Vector(10, 10);
    }
}