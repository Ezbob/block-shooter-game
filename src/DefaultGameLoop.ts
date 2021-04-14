import { IGameLoop } from './IGameLoop';
import { SharedVariables } from './SharedVariables';
import { ISystem } from './systems/ISystem';
import * as Stats from 'stats.js';

export class DefaultGameLoop implements IGameLoop {

    private updateSystems: (ISystem[] | null) = null;
    private drawingSystems: (ISystem[] | null) = null;
    private updateState: Stats = new Stats();
    private renderState: Stats = new Stats();
    private isStateInitialized: boolean = false;

    constructor(private updateStateDomId = 'updateState', private renderStateDomId = 'renderState') {
        this.initStats()
    }

    public run(updateSystems: ISystem[], drawingSystems: ISystem[] = []): void {
        this.updateSystems = updateSystems;
        this.drawingSystems = drawingSystems;
        window.requestAnimationFrame(this.loop);
    }

    public initStats() {
        if (SharedVariables.debugging.debugOn && !this.isStateInitialized) {
            this.updateState.dom.style.position = this.renderState.dom.style.position = "relative";
            
            this.updateState.showPanel(0);
            document.getElementById(this.updateStateDomId).appendChild(this.updateState.dom);
            
            this.renderState.showPanel(0);
            document.getElementById(this.renderStateDomId).appendChild(this.renderState.dom);
        }
        this.isStateInitialized = true
    }

    private loop() {
        if (SharedVariables.frameClock.isPaused) {
            return window.requestAnimationFrame(this.loop);
        }

        SharedVariables.frameClock.tick();

        while (SharedVariables.frameClock.shouldUpdate()) {
            if (SharedVariables.debugging.debugOn) {
                this.updateState.begin();
            }
        
            for (let system of this.updateSystems) {
                system.update();
            }

            SharedVariables.frameClock.deductLag();
        
            if (SharedVariables.debugging.debugOn) {
                this.updateState.end();
            }
        }

        if (SharedVariables.debugging.debugOn) {
            this.renderState.begin();
        }

        for (let system of this.drawingSystems) {
            system.update();
        }

        if (SharedVariables.debugging.debugOn) {
            this.renderState.end();
        }

        window.requestAnimationFrame(this.loop);
    }
}