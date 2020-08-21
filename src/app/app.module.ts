import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

var firebaseConfig = {
  apiKey: "AIzaSyBHvL7d5OW5QDpK0YqBEWrMmyIDsmrQ7HI",
  authDomain: "ionic-chat-45e6d.firebaseapp.com",
  databaseURL: "https://ionic-chat-45e6d.firebaseio.com",
  projectId: "ionic-chat-45e6d",
  storageBucket: "ionic-chat-45e6d.appspot.com",
  messagingSenderId: "208428815063",
  appId: "1:208428815063:web:bcdc1171be14cb3fbb5692",
  measurementId: "G-HK99YNMNWK"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
