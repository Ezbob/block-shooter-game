import { LazyLevelEvents } from "../LazyLevelEvents";

export class SpawnComponent {
    public spawningSet: LazyLevelEvents | null = null
    constructor(
        public filename: string | null
    ) {}
};