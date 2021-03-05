import { Block, Children, Props } from '../../core/Block/index';
import { FormInputs } from '../../utils/validation';
export interface ProfileProps extends Props {
}
export declare class Profile extends Block<ProfileProps> {
    constructor(parentElement: HTMLElement, props: ProfileProps, children?: Children, tagName?: string);
    mutateProfileDataControls(data: any): void;
    logoutUser(): void;
    hideErrors(form: HTMLFormElement): void;
    toggleProfileEditableForm(isEditable: boolean): void;
    togglePasswordEditableForm(isEditable: boolean): void;
    saveNewPassword(inputs: FormInputs): void;
    saveAvatar(inputs: FormInputs): void;
    saveProfile(inputs: FormInputs): void;
    show(): void;
    render(): string;
}
