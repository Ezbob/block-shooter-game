import { LazyLevelEvents } from "../LazyLevelEvents";

export class SpawnComponent {
    public spawningSet: LazyLevelEvents | null = null
    public shouldSpawn: boolean = true
    constructor(
        public filename: string | null
    ) {}
};