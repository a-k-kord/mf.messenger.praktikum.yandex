import { Block, Children } from '../../core/Block/index.js';
export interface ProfileProps {
}
export declare class Profile extends Block<ProfileProps> {
    constructor(parentElement: HTMLElement, props: ProfileProps, children?: Children, tagName?: string);
    render(): string;
}
