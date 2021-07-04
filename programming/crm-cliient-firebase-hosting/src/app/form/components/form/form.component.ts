import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from '../../classes/form.class';
import { FormService } from '../../services/form.service';
import { FormOut } from '../../models/formOut.model';
import { FileFire } from 'src/app/server/firebase/FilleFire.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent<T> implements OnDestroy {

  @Output() clickEvent: EventEmitter<FormOut<T>>
  form: Form;
  subscription: Subscription;
  firstValues: T;
  out: FormOut<T>;

  constructor(private formService: FormService<T>) {
    this.out = {
      value: {} as T,
    }

    this.clickEvent = new EventEmitter<FormOut<T>>();
    this.subscription = this.formService.get_form().subscribe(
      f => {
        this.form = f;
        this.firstValues = f.value;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  input(key: string) {
    
    if (this.firstValues[key] != this.form.value[key]) {
      this.out.value[key] = this.form.value[key];
    } else {
      delete this.out.value[key];
    }
  }

  InputFile(newFile: { name: string, file: FileFire }) {
    this.out.files = this.out.files || {};
    this.out.files[newFile.name] = newFile.file;
  }

  click() {
    for (let key of Object.keys(this.out)) {
      if (!Object.keys(this.out[key]).length) {
        delete this.out[key];
      }
    }

    this.clickEvent.emit(this.out);
    
    this.out = {
      value: {} as T,
    }

  }
}