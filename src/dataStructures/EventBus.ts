
export default class EventBus {
    private eventHandlers: Map<string, Array<(...args: any[]) => void>> = new Map();

    public fireEvent(event: string, ...args: any[]) {
        let handlers = this.eventHandlers.get(event);
        if (handlers) {
            for (let handler of handlers) {
                handler(...args);
            }
        }
    }

    public subscribe(event: string, handler: (...args: any[]) => void): number {
        let handlers = this.eventHandlers.get(event);
        if (!handlers) {
            handlers = [];
            this.eventHandlers.set(event, handlers);
        }
        return handlers.push(handler);
    }

    public unSubscribe(event: string, token: number) {
        let handlers = this.eventHandlers.get(event)
        handlers.splice(token, 1);
    }
};