import { GameContext } from "../GameContext";

export interface ISystem {
    update(ctx: GameContext): void;
};