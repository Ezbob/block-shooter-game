import Vector from "../dataStructures/vector"

export default class ControllableComponent {
    constructor(deviceType, inverse) {
        this.deviceType = deviceType || 0
        inverse = inverse ? inverse : {}
        this.inverse = new Vector(
            inverse.inverseX ? -1 : 1,
            inverse.inverseY ? -1 : 1
        )
    }
};