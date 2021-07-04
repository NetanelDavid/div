import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from '../environments/environment';
import { FormComponent} from './form/components/form/form.component';
import { AppComponent } from './global/components/app.component/app.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { signUpComponent } from './profile/components/sign-up/sign-up.component';
import { signInComponent } from './profile/components/sign-in/sign-in.component';
import { signOutComponent } from './profile/components/sign-out/sign-out.component';
import { DeleteComponent } from './profile/components/delete/delete.component';
import { GetAllComponent } from './profile/components/get-all/get-all.component';
import { AuthMailComponent } from './profile/components/auth-mail/auth-mail.component';
import { HomeComponent } from './global/components/home/home.component';
import { UnderscorePipe } from './form/pipe/underscore.pipe';
import { ImageComponent } from './form/components/image/image.component';
import { ProgressComponent} from '../app/global/components/progress/progress.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    signUpComponent,
    signInComponent,
    signOutComponent,
    DeleteComponent,
    GetAllComponent,
    AuthMailComponent,
    HomeComponent,
    FormComponent,
    UnderscorePipe,
    ImageComponent,
    ProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
