import { AbstractControlOptions, FormGroup, ValidatorFn } from "@angular/forms";
import { Purpose } from "../enum/purpose";
import { FileForm } from "../models/fileForm.model";
import { InputSet } from "./input.class";

export class Form extends FormGroup {

    inputs: { [key: string]: InputSet };
    files: { [key: string]: FileForm };

    textButton: string;

    constructor(purpose: Purpose) {

        super({});

        this.inputs = {};
        this.files = {};

        switch (purpose) {

            case Purpose.edit:
                this.textButton = 'save';
                break;
            case Purpose.signIn:
                this.textButton = 'sign in';
                break;
            case Purpose.signUp:
                this.textButton = 'sign up';
                break;
            case Purpose.view:
                this.textButton = 'edit';
                break;
        }
    }

    addInput(name: string, input: InputSet) {
        this.inputs[name] = input;
        this.addControl(name, input);
    }
    
}