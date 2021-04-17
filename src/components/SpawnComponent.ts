
export class SpawnComponent {
    public shouldSpawn: boolean = true
    constructor(
        public spawningSet: Array<PlayerJson | EnemyJson | ConditionJson>
    ) {}
};