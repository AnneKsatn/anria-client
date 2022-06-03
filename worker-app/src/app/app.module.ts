import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SystemModule } from './system/system.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app'
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';


const firebaseConfig = {
  apiKey: "AIzaSyALDGlAnZThQ1KawzmDPVczRjU-5JhrX4c",
  authDomain: "anria-cdbf5.firebaseapp.com",
  projectId: "anria-cdbf5",
  storageBucket: "anria-cdbf5.appspot.com",
  messagingSenderId: "771453273473",
  appId: "1:771453273473:web:6127994a434af30a315480"
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    SystemModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [UsersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
