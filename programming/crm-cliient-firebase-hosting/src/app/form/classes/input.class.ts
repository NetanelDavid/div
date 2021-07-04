import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";
import { Purpose } from "../enum/purpose";

export class InputSet extends FormControl {

    type: string;
    readonly: boolean;
    name: string;

    constructor(key: string, value: string, purpose: Purpose, validators: ValidatorFn[], asyncValidators: AsyncValidatorFn[]) {

        super(value, validators, asyncValidators);
        switch (key) {
            case 'password':
            case 'email':
            case 'tel':
                this.type = key;
                break;
            case 'password_confirmation':
                this.type = 'password';
                break;
            case 'logo':
                this.type = 'img';
                break;
            default:
                this.type = 'text';
                break;
        }
        this.name = key;
        this.readonly = purpose <= Purpose.view || (key =='id' && purpose < Purpose.signUp);
    }
}