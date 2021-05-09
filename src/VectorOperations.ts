
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
    const len = Vec2dLength(out);
    if (len != 0) {
        Vec2dDivMut(out, Vec2dLength(out));
        return true;
    } else {
        return false;
    }
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
    const len = Vec2dLength(out);
    if (len != 0) {
        return Vec2dDiv(out, len);
    } else {
        return {x: 0, y: 0};
    }
}

const Vec2dLength = (out: MathVector2d): number => {
    return Math.sqrt(Math.pow(out.x, 2) + Math.pow(out.y, 2));
}

const Vec2dLerp = (from: MathVector2d, to: MathVector2d, p: number): MathVector2d => {
    let v = Vec2dMul(from, p)
    Vec2dAddMut(v, Vec2dMul(to, (p - 1)));
    return v
}


/**
 * Parse a vector that may have string member such as percentage or "middle" members.
 * @param gtx GameContext
 * @param vector Incoming vector
 * @param offsets additional offsets to add and subtract to the vector
 * @returns a vector that has it's string member resolved
 * @throws Error in case of strings cannot be parsed
 */
const Vec2dParse = (vector: MathVector2d | {x: string, y: string}, canvasBoundaries: MathVector2d, offsets: MathVector2d = {x: 0, y: 0}): MathVector2d => {
    let xPos = vector.x
    if (typeof vector.x === "string") {

        if (vector.x === "middle") {
            xPos = (canvasBoundaries.x / 2) - offsets.x
        } else if (vector.x.endsWith("%")) {
            let parsed = parseInt(vector.x) / 100
            xPos = (canvasBoundaries.x * parsed) - offsets.x
        } else {
            throw new Error("X position string argument could not be parsed")
        }
    }

    let yPos = vector.y
    if (typeof vector.y === "string") {
        if (vector.y == "middle") {
            yPos = (canvasBoundaries.y / 2) + offsets.y
        } else if (vector.y.endsWith("%")) {
            let parsed = parseInt(vector.y) / 100
            yPos = (canvasBoundaries.y * parsed) + offsets.y
        } else {
            throw new Error("Y position string argument could not be parsed")
        }
    }

    return { x: xPos as number, y: yPos as number }
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
    Vec2dNormalize,
    Vec2dLerp,
    Vec2dParse
};