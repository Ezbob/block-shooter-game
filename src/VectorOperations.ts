
const Vec2dAddMut = (out: MathVector2d, other: MathVector2d) => {
    out.x += other.x;
    out.y += other.y;
}

const Vec2dSubMut = (out: MathVector2d, other: MathVector2d) => {
    out.x -= other.x;
    out.y -= other.y;
}

const Vec2dMulMut = (out: MathVector2d, scalar: number) => {
    out.x *= scalar;
    out.y *= scalar;
}

const Vec2dDivMut = (out: MathVector2d, scalar: number) => {
    out.x /= scalar;
    out.y /= scalar;
}

const Vec2dNormalizeMut = (out: MathVector2d) => {
    Vec2dDivMut(out, Vec2dLength(out));
}



const Vec2dAdd = (out: MathVector2d, other: MathVector2d): MathVector2d => {
    return {
        x: out.x + other.x,
        y: out.y + other.y
    };
}

const Vec2dSub = (out: MathVector2d, other: MathVector2d): MathVector2d => {
    return {
        x: out.x - other.x,
        y: out.y - other.y
    };
}

const Vec2dMul = (out: MathVector2d, scalar: number): MathVector2d => {
    return {
        x: out.x * scalar,
        y: out.y * scalar
    };
}

const Vec2dDiv = (out: MathVector2d, scalar: number) => {
    return {
        x: out.x * scalar,
        y: out.y * scalar
    };
}

const Vec2dNormalize = (out: MathVector2d): MathVector2d => {
    return Vec2dDiv(out, Vec2dLength(out));
}


const Vec2dLength = (out: MathVector2d): number => {
    return Math.sqrt(Math.pow(out.x, 2) + Math.pow(out.y, 2));
}



export {
    Vec2dAddMut,
    Vec2dSubMut,
    Vec2dMulMut,
    Vec2dDivMut,
    Vec2dNormalizeMut,
    Vec2dLength,
    Vec2dAdd,
    Vec2dSub,
    Vec2dMul,
    Vec2dDiv,
    Vec2dNormalize
};