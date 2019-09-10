import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseMessaging: FirebaseMessaging,
    private localNotifications: LocalNotifications,
    private firebase: Firebase
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firebaseMethod();

    });

  }


  firebaseMethod(){

    this.firebase.getToken().then((res) => {
      console.log(res, 'get token');
      alert('get Token');
    }).catch((err) => {
      console.log(err, 'err in get token');
      alert('err in get token');
    });

      this.firebase.onNotificationOpen()
        .subscribe((success)=>{
          console.log('onNotificationOpen', success);
        },(err)=>{
          console.log('onNotificationOpen error', err);
        })

        this.firebase.grantPermission()
          .then((res)=>{
            console.log(res, 'grantPermission');
          }).catch((err)=>{
            console.log(err, 'grantPermission');
          })
        this.firebase.hasPermission()
          .then((res)=>{
            console.log(res, 'hasPermission');
          }).catch((err)=>{
            console.log(err, 'hasPermission');
          })
  }


  fbMessage(){
    
    this.firebaseMessaging.getToken().then((res) => {
      console.log(res, 'get token');
      alert('get Token');
    }).catch((err) => {
      console.log(err, 'err in get token');
      alert('err in get token');
    });


    this.firebaseMessaging.onBackgroundMessage().subscribe((success) => {
      console.log('onBackgroundMessage', success);
      localStorage.setItem('ha', 'ha');
      this.localNotifications.schedule({
        id: 1,
        title: '2',
        text: 'Single ILocalNotification 1',
        data: { secret: 'key' }
      });
      // alert('onBackgroundMessage');
    }, (error) => {
      console.log('onBackgroundMessage error', error);
      alert('onBackgroundMessage error');
    })

    this.firebaseMessaging.onMessage().subscribe((success) => {
      console.log('on message', success);

      this.localNotifications.schedule({
        id: 1,
        text: 'Single ILocalNotification 2',
        title: '2',
        data: { secret: 'key' }
      });
      // alert('on message success');
    }, (error) => {
      console.log('on message error', error);
      alert('on message error');
    })

    this.firebaseMessaging.requestPermission({forceShow: true}).then((res) => {
      console.log('request permission', res);
      alert('request permission success');
    }).catch((error) => {
      console.log('request permission error', error);
      alert('request permission error');
    })
  }

}
