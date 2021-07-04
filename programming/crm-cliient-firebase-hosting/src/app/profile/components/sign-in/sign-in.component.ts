import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Purpose } from 'src/app/form/enum/purpose';
import { FormOut } from 'src/app/form/models/formOut.model';
import { FormService } from 'src/app/form/services/form.service';
import { ServerService } from 'src/app/server/services/server.service';
import { UsersignIn } from '../../models/user-sign-in.nodel';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class signInComponent {
  usersignIn: UsersignIn;

  constructor(
    private profile: ProfileService,
    private router: Router,
    private formservice: FormService<UsersignIn>,
    private snackBar: MatSnackBar
  ) {
    this.usersignIn = {
      email: '',
      password: ''
    }
    this.formservice.set_form(Purpose.signIn, this.usersignIn);
  }

  signIn(formOut: FormOut<UsersignIn>): void {
    this.usersignIn = formOut.value;
    if (this.usersignIn) {
      this.profile.signIn(this.usersignIn)
        .then(() => this.router.navigate(['profile']))
        .catch(err => this.snackBar.open(err.error.msg,'ok'));
    } else {
      this.snackBar.open('no changes in data!', 'ok');
    }
  }
}
