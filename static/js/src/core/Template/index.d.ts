import '../../vendor/eta.min.js';
declare global {
    interface Window {
        Eta: {
            render: (string: any, object: any) => {};
        };
    }
}
export interface Slots {
    [slotName: string]: HTMLElement;
}
interface TemplateProps<TProps> {
    props?: TProps;
    slots?: Slots;
}
export declare function compileTemplate<TProps>(template: string, props: TemplateProps<TProps>): string;
export {};
