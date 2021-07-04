import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/server/firebase/firebase.service';
import { Purpose } from 'src/app/form/enum/purpose';
import { FormService } from 'src/app/form/services/form.service';
import { User } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';
import { FormOut } from 'src/app/form/models/formOut.model';
import { Subscription } from 'rxjs';
import { FileFire } from 'src/app/server/firebase/FilleFire.class';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.html']
})

export class signUpComponent implements OnInit {

  user: User = new User();
  oneClick: boolean;
  msg1: string;
  msg2: string;
  success: boolean;
  percentage: number;
  subscription: Subscription[] = [];

  constructor(
    private profile: ProfileService,
    private formServise: FormService<User>,
    private upload: FirebaseService,
    private router: Router
  ) {
    this.formServise.set_form(Purpose.signUp, this.user);
  }


  uploadAndSignUp(formOut: FormOut<User>): void {

    this.user = { ...this.user, ...formOut.value };

    if (formOut.files) {
      this.uploadLogo(formOut.files.logo);
    } else if (formOut.value) {
      this.signUp()
    } else {
      this.msg1 = 'no changes in data!';
    }
  }

  uploadLogo(fileFire: FileFire): void {

    const typefile = fileFire.file.name.match(/\.[0-9a-z]+$/i)[0];

    const pathFire = User.getPathLogo(this.user.id, typefile);

    this.upload.uploadToStorage(pathFire, fileFire)
      .subscribe(
        n => this.percentage = n,
        (err) => {
          console.error(err);
          this.msg1 = err.message;
        },
        () => {
          this.user.logo = pathFire;
          this.signUp();
        }
      );
  }

  signUp() {
    this.oneClick = true;
    this.profile.signUp(this.user).subscribe(
      m => {
        this.success = true
        this.msg2 = m.msg;
      },
      err => {
        this.success = false
        this.msg2 = err.error.msg;
        console.error(err);
      }
    )
  }


  twoClick(): void {
    if (this.success) {
      this.router.navigate(['profile/signin']);
    }
    else {
      this.msg1 = null;
      this.msg2 = null;
      this.oneClick = false;
    }
  }

  ngOnInit(): void { }

}
