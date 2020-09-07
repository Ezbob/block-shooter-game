import SharedVariables from "../SharedVariables";
import IComponent from "../dataStructures/IComponent";

export default class DamageComponent implements IComponent {
    static cid: number = SharedVariables.componentIdGenerator.generate();

    constructor(
        public damage: number
    ) {}

    get cid() {
        return DamageComponent.cid;
    }
};