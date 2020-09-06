
export default class IdGenerator {
    private id: number = 0;

    public generate(): number {
        return this.id++;
    }
};