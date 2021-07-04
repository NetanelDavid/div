import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './global/components/home/home.component';
import { AuthMailComponent } from './profile/components/auth-mail/auth-mail.component';
import { DeleteComponent } from './profile/components/delete/delete.component';
import { GetAllComponent } from './profile/components/get-all/get-all.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { signInComponent } from './profile/components/sign-in/sign-in.component';
import { signOutComponent } from './profile/components/sign-out/sign-out.component';
import { signUpComponent } from './profile/components/sign-up/sign-up.component';
import { ImageComponent } from './form/components/image/image.component';

const routes: Routes = [
  { path: 'test', component: ImageComponent },
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/signin', component: signInComponent },
  { path: 'profile/signout', component: signOutComponent },
  { path: 'profile/getall', component: GetAllComponent },
  { path: 'profile/delete', component: DeleteComponent },
  { path: 'profile/signup', component: signUpComponent },
  { path: 'profile/authmail/:code', component: AuthMailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
