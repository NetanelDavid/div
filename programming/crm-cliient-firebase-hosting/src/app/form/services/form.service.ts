import { Injectable } from '@angular/core';
import { AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerService } from 'src/app/server/services/server.service';
import { Form } from '../classes/form.class';
import { InputSet } from '../classes/input.class';
import { Purpose } from '../enum/purpose';

@Injectable({
  providedIn: 'root'
})

export class FormService<T> {

  static _form: Form;
  static form: BehaviorSubject<Form>;
  static server: ServerService;
  static obj: any;

  private keysContinue = ['role', 'auth_amail', 'tempCode', '_id'];

  constructor(server: ServerService) {
    FormService._form = new Form(null);
    FormService.form = new BehaviorSubject(FormService._form);
    FormService.server = server;
  }

  get_form(): Observable<Form> {
    return FormService.form;
  }

  set_form(purpose: Purpose, obj: T) {

    FormService._form = new Form(purpose);
    FormService.obj = obj;

    for (let key of Object.keys(obj)) {

      if (this.keysContinue.indexOf(key) != -1) {
        continue;
      }

      if (key == 'logo') {
        FormService._form.files[key] = {
          readonly: purpose <= Purpose.view,
          src: obj[key],
        }
        continue;
      }

      FormService._form.addInput(key, new InputSet(key, obj[key], purpose, this.get_validators(key, purpose), this.get_asyncValidators(key, purpose)));
    }
    FormService.form.next(FormService._form);
  }


  static email(control: InputSet): ValidationErrors | null {
    return Validators.email(control) ? { msg: "this is not a valid email" } : null;
  }

  static required(control: InputSet): ValidationErrors | null {
    return Validators.required(control) ? { msg: "this is a required field" } : null;
  }

  static id(control: InputSet): ValidationErrors | null {
    const res = { msg: 'this is not a valid id' };
    let id = String(control.value).trim();
    if (id.length > 9 || isNaN(+id)) return res;

    id = ("00000000" + id).slice(-9);
    let check = Array.from(id, Number).reduce((counter, num, i) => {
      const step = num * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    })
    return check % 10 != 0 ? res : null;
  }


  static unique(control: InputSet): Observable<ValidationErrors | null> {
    return FormService.server.post<object, ValidationErrors | null>(

      `/auth/uniquenesstest/${FormService.obj._id || 'not _id'}`,
      { [control.name]: control.value }
    ).pipe(map(
      res => {
        return res.obj ? { msg: `this ${control.name} already exists` } : null;
      }
    ))
  }


  static comper(control: InputSet): ValidationErrors | null {

    let password = FormService._form.inputs.password;
    let password_confirmation = FormService._form.inputs.password_confirmation;
    if (!password || !password_confirmation) {
      return null;
    }

    let check = password.value == password_confirmation.value;

    if (control == password) {
      password_confirmation.setErrors(check ? null : { msg: 'the passwords do not match' });
      FormService.form.next(FormService._form);
      return null;
    }
    return check ? null : { msg: 'the passwords do not match' };
  }

  static minAndMax(control: InputSet): ValidationErrors | null {
    if (Validators.minLength(6)(control)) {
      return { msg: `minimum 6 characters` };
    }
    if (Validators.maxLength(10)(control)) {
      return { msg: `maximum 10 characters` };
    }
    return null;
  }

  static tel(control: InputSet): ValidationErrors | null {
    
    let value = `${control.value}`;
    let length = value.length;

    if (/[^0-9]/.test(value)) {
      return { msg: 'only digits please' };
    }

    if (!value.startsWith('0')) {
      return { msg: 'start with 0 please' }
    }

    if (length > 0 && length != 10) {
      return { msg: '10 digits please' };
    }

    return null;
  }

  static map: Map<Function, { keys: Array<string>, purpose?: Purpose[] }> = new Map(
    [
      [FormService.required, {
        keys: ["business_name",
          "first_name",
          "last_name",
          "email",
          "password",
          "password_confirmation",
          "tel",
          "logo",
          "id"
        ]
      }],
      [FormService.email, { keys: ["email"] }],
      [FormService.id, { keys: ['id'] }],
      [FormService.minAndMax, { keys: ['password'], purpose: [Purpose.edit, Purpose.signUp] }],
      [FormService.comper, { keys: ['password', 'password_confirmation'], purpose: [Purpose.signUp] }],
      [FormService.tel, { keys: ['tel'] }],
    ]
  );

  static mapAsync: Map<Function, { keys: Array<string>, purpose?: Purpose[] }> = new Map(
    [
      [FormService.unique, { keys: ['business_name', 'email', 'tel', 'id'], purpose: [Purpose.signUp, Purpose.edit] }],
    ]
  );

  get_validators(key: string, purpose: Purpose): ValidatorFn[] {
    let res = [];
    FormService.map.forEach((v, k) => {
      if (v.keys.indexOf(key) != -1 && (!v.purpose || v.purpose.indexOf(purpose) != -1)) {
        res.push(k)
      }
    })
    return res;
  }

  get_asyncValidators(key: string, purpose: Purpose): AsyncValidatorFn[] {
    let res = [];
    FormService.mapAsync.forEach((v, k) => {
      if (v.keys.indexOf(key) != -1 && (!v.purpose || v.purpose.indexOf(purpose) != -1)) {
        res.push(k)
      }
    })
    return res;
  }

}

