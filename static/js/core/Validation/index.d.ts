export declare class Validation {
    private readonly listeners;
    constructor();
    addListener(el: HTMLElement, event: string, callback: Function): void;
    removeListener(el: HTMLElement, event: string, callback: Function): void;
    removeAllListeners(el: HTMLElement): void;
}
