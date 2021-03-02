import { Block, Props } from '../../core/Block/index.js';
export interface ImageProps extends Props {
    src?: string;
    alt?: string;
}
export declare class Image extends Block<ImageProps> {
    render(): string;
}
