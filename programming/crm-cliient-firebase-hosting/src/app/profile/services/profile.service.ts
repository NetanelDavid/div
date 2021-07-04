import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UsersignIn } from '../models/user-sign-in.nodel';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ServerService } from 'src/app/server/services/server.service';
import { Response } from 'src/app/server/models/response.model';
import { FirebaseService } from 'src/app/server/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  auth: string;
  profile: string;
  timerGetToken: any;
  timerBlur: any;

  constructor(
    private server: ServerService,
    private firebase: FirebaseService,
    private authFire: AngularFireAuth,
    private router: Router
  ) {
    this.auth = '/auth';
    this.profile = '/api/profile';
    this.timerGetToken = {};
    this.setDataUser(this.getIsConnected());

    window.onfocus = this.focus(this);
    window.onblur = this.blur(this);
  }

  getIsConnected(): boolean {
    return Boolean(localStorage.getItem('user'));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'))
  }
  setDataUser(isConnected: boolean, data?: dataUser) {

    if (isConnected) {

      for (let key in data) {
        localStorage.setItem(key, JSON.stringify(data[key]));
      }

      this.noveltytoken()

    } else {
      this.authFire.signOut();
      clearTimeout(this.timerGetToken);
      localStorage.clear();
    }
  }

  focus(t: this) {

    return () => {

      t.setDataUser(t.getIsConnected());
      clearTimeout(t.timerBlur);
    }
  }

  blur(t: this) {
    return () => {

      t.timerBlur = setTimeout(() => {

        console.log('auto sign out');

        clearTimeout(this.timerGetToken);
        t.signOut();
        this.router.navigate(['/profile']);

      }, 1000 * 60 * 60)
    }
  }


  noveltytoken() {
    this.timerGetToken = setTimeout(() =>
      this.server.getWithToken('/api/noveltytoken').subscribe(
        res => {
          this.setDataUser(true, { token: res.token, fireToken: res.fireToken });
        }, (err) => {
          console.error(err);
          this.setDataUser(true);
        }
      ), 1000 * 60 * 10
    );
  }


  signUp(user: User): Observable<Response<any>> {
    return this.server.post<User, any>(this.auth + '/signup', user);
  }

  async signIn(user: UsersignIn): Promise<Response<User>> {
    let res: Response<User>;

    try {
      res = await this.server.post<UsersignIn, User>(this.auth + '/signin', user).toPromise();
      await this.authFire.signInWithCustomToken(res.fireToken);
    } catch (e) {
      return Promise.reject(e);
    }

    if (this.checkUrl(res.obj.logo)) {
      this.setDataUser(true, { token: res.token, user: res.obj, fireToken: res.fireToken });
      return res;
    }

    res.obj.logo = await this.firebase.getUrl(res.obj.logo);
    this.setDataUser(true, { token: res.token, user: res.obj, fireToken: res.fireToken });
    return res;

  }

  signOut(): void {
    this.setDataUser(false);
  }

  getAll(): Observable<Response<User[]>> {
    return this.server.getWithToken<User[]>(this.profile + '/getall');
  }

  async deleteProfile(user: User): Promise<Response<any>> {

    if (user.logo != User.defaultLogo) {
      await this.firebase.deletFile(user.logo);
    }
    return this.server.deleteWithToken(this.profile + '/delete').pipe(tap(
      () => this.setDataUser(false)
    )).toPromise()
  }

  edit(user: User): Observable<Response<User>> {
    return this.server.putWithToken(this.profile + '/edit', user).pipe(tap(
      res => this.setDataUser(true, { token: res.token, user: res.obj })
    ));
  }

  sendAuth(): Observable<Response<any>> {
    let body = {
      subject: 'link for email verification',
      text: 'http://localhost:4200/profile/authmail/',
      code:true,
    }
    return this.server.postWithToken(this.profile + '/sendauth',body);
  }

  testAuth(code: string): Observable<Response<User>> {
    return this.server.getWithToken<User>(this.profile + '/testauth/' + code).pipe(tap(
      res => this.setDataUser(true, { user: res.obj || this.getUser() })
    ));
  }

  private checkUrl(url: string): boolean {
    return new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$', 'i'
    ).test(url);
  }

}

interface dataUser {
  user?: User,
  token?: String,
  fireToken?: String,
}


