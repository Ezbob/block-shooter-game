import { IGameLoop } from './IGameLoop';
import { SharedVariables } from './SharedVariables';
import { ISystem } from './systems/ISystem';


export class DefaultGameLoop implements IGameLoop {

    private updateSystems: (ISystem[] | null) = null;
    private drawingSystems: (ISystem[] | null) = null;

    public run(updateSystems: ISystem[], drawingSystems: ISystem[] = []): void {
        this.updateSystems = updateSystems;
        this.drawingSystems = drawingSystems;
        window.requestAnimationFrame(this.loop);
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