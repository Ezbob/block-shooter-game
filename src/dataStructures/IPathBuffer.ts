
export interface IPathBuffer<T> {
    next(): T | null;
    first(): T | null;
    length: number;
    [Symbol.iterator](): Generator<T>;
};