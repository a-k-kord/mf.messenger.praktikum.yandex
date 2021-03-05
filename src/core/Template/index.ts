import '../../vendor/eta.min.js';

declare global {
    interface Window {
        Eta: {render: (string, object) => {}  };
    }
}

export interface Slots {
    [slotName: string]: HTMLElement
}

interface TemplateProps<TProps> {
    props?: TProps,
    slots?: Slots
}

export function compileTemplate<TProps>(template: string, props: TemplateProps<TProps>): string {
    return <string>window.Eta.render(template, props);
}