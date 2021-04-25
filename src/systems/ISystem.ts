import { GameContext } from "../GameContext";

export interface ISystem {
    update(gtx: GameContext): void;
};