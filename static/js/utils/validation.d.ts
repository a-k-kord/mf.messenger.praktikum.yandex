export declare type FormInputs = {
    data: Record<string, string>;
    form: HTMLFormElement;
    errorInputs: HTMLInputElement[];
    isValid: boolean;
};
export declare function validateLimitedString(event: Event, minLength?: number, maxLength?: number): void;
export declare function validatePasswordConfirm(event: Event, minLength?: number, maxLength?: number): void;
export declare function validateEmail(event: Event): void;
export declare function validatePhone(event: Event): void;
