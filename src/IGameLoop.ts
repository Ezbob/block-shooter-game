import { ISystem } from "./systems/ISystem";

export interface IGameLoop {
    run(update: ISystem[], draw: ISystem[]): void;
};