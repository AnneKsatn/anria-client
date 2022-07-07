import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SystemModule } from './system/system.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToolbarModule } from 'primeng/toolbar';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyALDGlAnZThQ1KawzmDPVczRjU-5JhrX4c",
  authDomain: "anria-cdbf5.firebaseapp.com",
  projectId: "anria-cdbf5",
  storageBucket: "anria-cdbf5.appspot.com",
  messagingSenderId: "771453273473",
  appId: "1:771453273473:web:6127994a434af30a315480"
};

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);


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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    // provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FullCalendarModule,
    ToolbarModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
