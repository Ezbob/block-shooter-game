
type MathVector2d = {x: number, y: number};

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