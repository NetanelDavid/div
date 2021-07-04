import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, tap } from 'rxjs/operators';
import { Purpose } from 'src/app/form/enum/purpose';
import { FormOut } from 'src/app/form/models/formOut.model';
import { FormService } from 'src/app/form/services/form.service';
import { FirebaseService } from 'src/app/server/firebase/firebase.service';
import { User } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  purpose: Purpose;
  isConnected: boolean;
  msgEmail: string;
  percentage: number;

  constructor(
    private profile: ProfileService,
    private formService: FormService<User>,
    private upload: FirebaseService,
    private snackBar: MatSnackBar
  ) {
    this.isConnected = this.profile.getIsConnected();
    if (this.isConnected) {

      this.purpose = Purpose.view;
      this.user = this.profile.getUser();

      this.frase();

    }
  }

  clickEvent(formOut: FormOut<User>): void {
    if (this.purpose == Purpose.edit) {
      this.save(formOut);
    } else {
      this.edit()
    }
  }

  save(formOut: FormOut<User>): void {

    if (!formOut.files && !formOut.value) {
      this.snackBar.open('no changes in data!', 'ok');
      this.finishSave();
    }

    else if (formOut.files) {
      this.saveFile(formOut);
    }

    else if (formOut.value) {
      this.saveData(formOut.value);
    }

    else {
      this.finishSave();
    }
  }

  saveFile(formOut: FormOut<User>) {

    const typeFile = formOut.files.logo.file.name.match(/\.[0-9a-z]+$/i)[0];
    const path = User.getPathLogo(this.user.id, typeFile);

    if (this.user.logo != User.defaultLogo) {
      this.upload.deletFile(this.user.logo);
    }

    this.upload.uploadToStorage(path, formOut.files.logo, true).pipe(
      tap(n => {
        this.percentage = n;
      }),
      finalize(() => {
        formOut.files.logo.sorageRef.getDownloadURL().subscribe(url => {
          this.user.logo = url;
          this.saveData(formOut.value);
        })
      })
    ).subscribe();
  }

  saveData(data: User) {
    this.user = { ...this.user, ...data };
    this.profile.edit(this.user).subscribe(
      res => {
        this.profile.setDataUser(true, { user: res.obj, token: res.token });
        this.user = res.obj;
        this.snackBar.open(res.msg, 'ok');
        this.finishSave();
      }
    );
  }

  finishSave() {
    this.purpose = Purpose.view;
    this.frase();
  }

  edit(): void {
    this.purpose = Purpose.edit;
    this.frase();
  };

  frase(): void {
    this.formService.set_form(this.purpose, this.user);
    if (!this.user.auth_amail) {
      this.msgEmail = 'your email has not yet been verified click to receive email verification.';
    }
  }

  ngOnInit(): void {
  }

  sendAuth() {
    this.profile.sendAuth().subscribe(

      res => this.snackBar.open(res.msg,'ok'),
      err => this.snackBar.open(err.error.msg, 'ok'),
      () => this.msgEmail = null
    );
  }

}
