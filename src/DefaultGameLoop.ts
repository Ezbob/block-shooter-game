import { IGameLoop } from './IGameLoop';
import { GameContext } from './GameContext';
import { ISystem } from './systems/ISystem';


export class DefaultGameLoop implements IGameLoop {

    private updateSystems: (ISystem[] | null) = [];
    private drawingSystems: (ISystem[] | null) = [];

    constructor(private gameContext: GameContext) {}

    public run(): void {
        window.requestAnimationFrame(this.loop);
    }

    public setUpdateSystems(update: ISystem[]): IGameLoop {
        this.updateSystems = update
        return this
    }

    public setDrawSystems(draw: ISystem[]): IGameLoop {
        this.drawingSystems = draw
        return this
    }

    private loop = (now: number) => {
        if (this.gameContext.frameClock.isPaused) {
            return window.requestAnimationFrame(this.loop);
        }

        this.gameContext.frameClock.tick(now);

        while ( this.gameContext.frameClock.shouldUpdate()) {
            for (let system of this.updateSystems) {
                system.update(this.gameContext);
            }

            this.gameContext.frameClock.deductLag();
        }

        for (let system of this.drawingSystems) {
            system.update(this.gameContext);
        }

        window.requestAnimationFrame(this.loop);
    }
}