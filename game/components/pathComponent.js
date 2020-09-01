import Vector from "../dataStructures/vector";

export default class PathComponent {
    constructor(path, reverseWhenDone, followingVelocity) {
        this.path = path;
        this.reverseWhenDone = reverseWhenDone || false;
        this.nextWayPoint = null;
        this.followingVelocity = followingVelocity || new Vector(5, 5);
    }
};
