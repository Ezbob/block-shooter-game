import { LazyLevelEvents } from "../LazyLevelEvents";

export class SpawnComponent {
    public shouldSpawn: boolean = true
    constructor(
        public spawningSet: LazyLevelEvents | null = null
    ) {}
};