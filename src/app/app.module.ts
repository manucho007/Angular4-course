import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCN4xmpNe_zvJ8fWnINA_F0AtA8_-RsIfY",
    authDomain: "polyprogressive-84031.firebaseapp.com",
    databaseURL: "https://polyprogressive-84031.firebaseio.com",
    projectId: "polyprogressive-84031",
    storageBucket: "polyprogressive-84031.appspot.com",
    messagingSenderId: "563888814774"
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
