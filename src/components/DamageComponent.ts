import IComponent from "../dataStructures/IComponent";

export default class DamageComponent implements IComponent {
    static cid: number = 4;

    constructor(
        public damage: number
    ) {}

    get cid() {
        return DamageComponent.cid;
    }
};