import { IGameLoop } from './IGameLoop';
import { SharedVariables } from './SharedVariables';
import { ISystem } from './systems/ISystem';


export class DefaultGameLoop implements IGameLoop {

    private updateSystems: (ISystem[] | null) = [];
    private drawingSystems: (ISystem[] | null) = [];

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

    private loop = () => {
        if (SharedVariables.frameClock.isPaused) {
            return window.requestAnimationFrame(this.loop);
        }

        SharedVariables.frameClock.tick();

        while (SharedVariables.frameClock.shouldUpdate()) {
            for (let system of this.updateSystems) {
                system.update();
            }

            SharedVariables.frameClock.deductLag();
        }

        for (let system of this.drawingSystems) {
            system.update();
        }

        window.requestAnimationFrame(this.loop);
    }
}