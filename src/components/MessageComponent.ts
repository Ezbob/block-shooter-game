
export class MessageComponent {
    constructor(
        public message: string,
        public position: MathVector2d | {x: string, y: string},
        public pixelSize: number,
        public fontFaceName: string = 'Arial',
        public color: string = 'black',
        public isFilled: boolean = true) {}
};