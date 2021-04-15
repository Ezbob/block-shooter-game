import { ISystem } from "./systems/ISystem";

export interface IGameLoop {
    run(): void;
    setUpdateSystems(update: ISystem[]): IGameLoop;
    setDrawSystems(draw: ISystem[]) : IGameLoop;
};