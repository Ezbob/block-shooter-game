import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PositionComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Variables from '../SharedVariables'

import ISystem from './ISystem';

export default class DrawingSystem implements ISystem {
  update(): void {
    let entities = EntityManager.getEntitiesByComponentIds(
        DimensionalComponent.cid, DrawableComponent.cid, PositionComponent.cid);

    entities.sort((a, b) => {
      let aDrawComp = a.getComponentById(DrawableComponent.cid) as DrawableComponent;
      let bDrawComp = b.getComponentById(DrawableComponent.cid) as DrawableComponent;
      return aDrawComp.priority - bDrawComp.priority;
    });

    let ctx = Variables.canvasManager.getCanvasContext();
    for (let d of entities) {
      let drawComp = d.getComponentById(DrawableComponent.cid) as DrawableComponent;
      let dimenComp = d.getComponentById(DimensionalComponent.cid) as DimensionalComponent;
      let posComp = d.getComponentById(PositionComponent.cid) as PositionComponent;

      if (drawComp.isFilled) {
        let old = ctx.fillStyle;
        ctx.fillStyle = drawComp.color;
        ctx.fillRect(
            posComp.position.x, posComp.position.y, dimenComp.dimension.x,
            dimenComp.dimension.y);
        ctx.fillStyle = old;
      } else {
        let old = ctx.strokeStyle;
        ctx.strokeStyle = drawComp.color;
        ctx.strokeRect(
            posComp.position.x, posComp.position.y, dimenComp.dimension.x,
            dimenComp.dimension.y);
        ctx.strokeStyle = old;
      }
    }
  }
};