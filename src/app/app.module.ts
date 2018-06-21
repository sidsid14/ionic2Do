import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Dialogs } from '@ionic-native/dialogs';
import { MyApp } from './app.component';
import { TaskListPage } from '../pages/tasklist/tasklist';

export const firebaseConfig = {
  apiKey: "AIzaSyCwTx5nhmk34tID9STdWf6lrikxnKdlggM",
  authDomain: "ionic2do-5e8ad.firebaseapp.com",
  databaseURL: "https://ionic2do-5e8ad.firebaseio.com",
  projectId: "ionic2do-5e8ad",
  storageBucket: "ionic2do-5e8ad.appspot.com",
  messagingSenderId: "1087269644281"
};

@NgModule({
  declarations: [
    MyApp,
    TaskListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
