import Vector from '../dataStructures/vector.js'

export default class DimensionalComponent {
    constructor(dimension) {
        this.dimension = dimension || new Vector(10, 10);
    }
}