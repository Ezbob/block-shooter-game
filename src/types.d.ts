
type MathVector2d = {x: number, y: number};

type InputMathVector2d = MathVector2d | {x: string, y: string}

type ComponentConstructor<T = any> = {new(...a: any): T};

type ComponentInstance = {constructor: Function};

type MovementJson = {
    startAt: MathVector2d,
    velocity: MathVector2d
};

type EnemyJson = {
    event_type: string,
    movement: MovementJson,
    path: {
        waypoints: [MathVector2d],
        type: string
    }
};

type PlayerJson = {
    movement: MovementJson,
    event_type: string
};

type ConditionJson = {
    event_type: string,
    argument: number
};

type ConfigurationJson = {
    CANVAS_HTML_ID: string,
    CANVAS_WIDTH: number,
    CANVAS_HEIGHT: number,
    DEBUG_ON: boolean
};

type LevelJson = {
    title: string,
    level: number,
    events: Array<PlayerJson | EnemyJson | ConditionJson>
}