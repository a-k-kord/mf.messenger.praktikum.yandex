export declare class Validation {
    private readonly listeners;
    constructor();
    addListener(el: HTMLElement, event: keyof HTMLElementEventMap, callback: () => any): void;
    removeListener(el: HTMLElement, event: keyof HTMLElementEventMap, callback: () => any): void;
    removeAllListeners(el: HTMLElement): void;
}
