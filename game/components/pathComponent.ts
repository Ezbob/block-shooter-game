import Vector from "../dataStructures/vector";
import CircularBuffer from "../dataStructures/circularBuffer";

export default class PathComponent {
    path: CircularBuffer<Vector>;
    reverseWhenDone: boolean;
    nextWayPoint: Vector | null;
    followingVelocity: Vector;
    constructor(path?: CircularBuffer<Vector>, reverseWhenDone?: boolean, followingVelocity?: Vector) {
        this.path = path || new CircularBuffer<Vector>();
        this.reverseWhenDone = reverseWhenDone || false;
        this.nextWayPoint = null;
        this.followingVelocity = followingVelocity || new Vector(5, 5);
    }
};
