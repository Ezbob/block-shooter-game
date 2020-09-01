import Vector from "../dataStructures/vector"

export default class ControllableComponent {
    constructor(deviceType, inputForce) {
        this.deviceType = deviceType || 0
        this.inputForce = inputForce || new Vector(0, 0)
    }
};