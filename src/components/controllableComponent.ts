import Vector from "../dataStructures/vector"

export default class ControllableComponent {
    public deviceType: number
    public inputForce: Vector
    constructor(deviceType?: number, inputForce?: Vector) {
        this.deviceType = deviceType || 0;
        this.inputForce = inputForce || new Vector(0, 0);
    }
};