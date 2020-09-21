import IComponent from "../dataStructures/IComponent";

export default class DrawableComponent implements IComponent {
  static cid: number = 6;
  constructor(
      public priority: number = -1, public color: string = 'rgb(0,8,255)',
      public isFilled: boolean = true) {}

  get cid() {
    return DrawableComponent.cid;
  }
};