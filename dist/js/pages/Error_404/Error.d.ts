import { Block } from "../../core/Block/index.js";
declare type ErrorProps = {
    errNum?: string;
    errMessage?: string;
};
export declare class Error extends Block<ErrorProps> {
    constructor(props: any, parent: any, children: any);
    render(): string;
}
export {};
