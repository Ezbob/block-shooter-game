
type HTMLCanvasLayer = {
  element: HTMLCanvasElement,
  context: CanvasRenderingContext2D
}
export class CanvasManager {
  private _isAttached: boolean = false;

  private canvasLayers: {
    gameLayer: HTMLCanvasLayer,
    uiLayer: HTMLCanvasLayer,
    backgroundLayer: HTMLCanvasLayer
  } = {
    gameLayer: {
      element: null,
      context: null
    },
    uiLayer: {
      element: null,
      context: null
    },
    backgroundLayer: {
      element: null,
      context: null
    }
  }

  private prerenderLayers: {
    gameLayer: HTMLCanvasLayer,
    uiLayer: HTMLCanvasLayer,
    backgroundLayer: HTMLCanvasLayer
  } = {
    gameLayer: {
      element: null,
      context: null
    },
    uiLayer: {
      element: null,
      context: null
    },
    backgroundLayer: {
      element: null,
      context: null
    }
  }
  private _height: number;
  private _width: number;

  constructor(private idPrefix: string, width: number, height: number) {

    let setDimensions = (element: HTMLCanvasElement, width: number, height: number) => {
      element.setAttribute('width', "" + width);
      element.setAttribute('height', "" + height);
    }

    let isAttached = (layers: {
      gameLayer: HTMLCanvasLayer,
      uiLayer: HTMLCanvasLayer,
      backgroundLayer: HTMLCanvasLayer
    }) => {
      return layers.gameLayer.context && layers.gameLayer.element && layers.uiLayer.context && layers.uiLayer.element && layers.backgroundLayer.context && layers.backgroundLayer.element
    }

    try {
      this.canvasLayers.gameLayer.element       = document.getElementById(this.idPrefix + "game-layer") as HTMLCanvasElement;
      this.canvasLayers.uiLayer.element         = document.getElementById(this.idPrefix + "ui-layer") as HTMLCanvasElement;
      this.canvasLayers.backgroundLayer.element = document.getElementById(this.idPrefix + "background-layer") as HTMLCanvasElement;

      this.canvasLayers.gameLayer.context       = this.canvasLayers.gameLayer.element.getContext('2d')
      this.canvasLayers.uiLayer.context         = this.canvasLayers.uiLayer.element.getContext('2d')
      this.canvasLayers.backgroundLayer.context = this.canvasLayers.backgroundLayer.element.getContext('2d')

      setDimensions(this.canvasLayers.backgroundLayer.element, width, height)
      setDimensions(this.canvasLayers.uiLayer.element, width, height)
      setDimensions(this.canvasLayers.gameLayer.element, width, height)

      this.prerenderLayers.gameLayer.element       = document.createElement('canvas');
      this.prerenderLayers.uiLayer.element         = document.createElement('canvas');
      this.prerenderLayers.backgroundLayer.element = document.createElement('canvas');

      this.prerenderLayers.gameLayer.context       = this.prerenderLayers.gameLayer.element.getContext('2d')
      this.prerenderLayers.uiLayer.context         = this.prerenderLayers.uiLayer.element.getContext('2d')
      this.prerenderLayers.backgroundLayer.context = this.prerenderLayers.backgroundLayer.element.getContext('2d')

      setDimensions(this.prerenderLayers.backgroundLayer.element, width, height)
      setDimensions(this.prerenderLayers.uiLayer.element, width, height)
      setDimensions(this.prerenderLayers.gameLayer.element, width, height)
   
      this._width = width;
      this._height = height;
    } catch (exception) {
      this._isAttached = false;
      throw exception;
    }
    if (isAttached(this.canvasLayers)) {
      this._isAttached = true;
    } else {
      this._isAttached = false;
    }
  }

  get canvasWidth() {
    return this._width;
  }

  get canvasHeight() {
    return this._height;
  }

  getUiCanvasContext() {
    return this.prerenderLayers.uiLayer.context;
  }

  getBackgroundContext() {
    return this.prerenderLayers.backgroundLayer.context;
  }

  getGameContext() {
    return this.prerenderLayers.gameLayer.context;
  }

  getUiCanvasElement() {
    return this.prerenderLayers.uiLayer.element;
  }

  getBackgroundElement() {
    return this.prerenderLayers.backgroundLayer.element;
  }

  getGameElement() {
    return this.prerenderLayers.gameLayer.element;
  }

  clear() {
    this.canvasLayers.gameLayer.context.clearRect(0, 0,  this.canvasWidth, this.canvasHeight)
    this.canvasLayers.uiLayer.context.clearRect(0,0, this.canvasWidth, this.canvasHeight)
    this.canvasLayers.backgroundLayer.context.fillStyle = 'white'
    this.canvasLayers.backgroundLayer.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  flushDraws() {
    this.canvasLayers.gameLayer.context.drawImage(this.prerenderLayers.gameLayer.element, 0, 0)
    this.canvasLayers.uiLayer.context.drawImage(this.prerenderLayers.uiLayer.element, 0, 0)
    this.canvasLayers.backgroundLayer.context.drawImage(this.prerenderLayers.backgroundLayer.element, 0, 0)

    this.prerenderLayers.gameLayer.context.clearRect(0,0, this.canvasWidth, this.canvasHeight)
    this.prerenderLayers.uiLayer.context.clearRect(0,0, this.canvasWidth, this.canvasHeight)
    this.prerenderLayers.backgroundLayer.context.clearRect(0,0, this.canvasWidth, this.canvasHeight)
  }

  isAttached() {
    return this._isAttached;
  };
};