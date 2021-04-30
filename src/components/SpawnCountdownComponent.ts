import { SpawnComponent } from "./SpawnComponent";

export class SpawnCountdownComponent {
    constructor(
        public countdown: number,
        public spawn: SpawnComponent
    ) {}
};