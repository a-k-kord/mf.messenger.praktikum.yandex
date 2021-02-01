import { Listeners } from "../EventBus";



export class Validation {
    private readonly listeners: Listeners;

    constructor() {
        this.listeners = {};
    }

    addListener(el: HTMLElement, event: keyof HTMLElementEventMap , callback: () => any): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        el.addEventListener(event, callback);
        this.listeners[event].push(callback);
    }

    removeListener(el: HTMLElement, event: keyof HTMLElementEventMap, callback: () => any): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => {
                if(listener !== callback) {
                    el.removeEventListener(event, callback);
                    return true;
                }
                return false;
            }
        );
    }

    removeAllListeners(el: HTMLElement): void {
        Object.keys(this.listeners).map((event: keyof HTMLElementEventMap) => {
            this.listeners[event].map((callback: () => any) => {
                el.removeEventListener(event, callback);
            })
        });
    }

}