import { Listeners } from "../EventBus";

export class Validation {
    private readonly listeners: Listeners;

    constructor() {
        this.listeners = {};
    }

    addListener(el: HTMLElement, event: string, callback: Function): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    removeListener(el: HTMLElement, event: string, callback: Function): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => {
                listener
                return listener !== callback
            }
        );
    }

    removeAllListeners(el: HTMLElement): void {
        // for(let {event: listener} in this.listeners) {
        //     el.removeEventListener(event, listener);
        // }
        //
        // this.listeners[event] = this.listeners[event].filter(
        //     listener => {
        //         listener
        //         return listener !== callback
        //     }
        // );
    }

}