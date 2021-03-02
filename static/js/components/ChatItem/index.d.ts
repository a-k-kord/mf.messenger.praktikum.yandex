import { Block } from '../../core/Block/index.js';
import { LinkProps } from "../Link/index.js";
export interface ChatItemProps extends LinkProps {
}
export declare class ChatItem extends Block<ChatItemProps> {
    render(): string;
}
