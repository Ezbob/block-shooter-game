
export default class PathComponent {
    constructor(path, reverseWhenDone, followingVelocity) {
        this.path = path;
        this.reverseWhenDone = reverseWhenDone || false;
        this.nextWayPoint = null;
        this.followingVelocity = followingVelocity || 5;
    }
};
