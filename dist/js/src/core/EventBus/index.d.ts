export declare class EventBus {
    private readonly listeners;
    constructor();
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    emit(event: string, ...args: unknown[]): void;
}
