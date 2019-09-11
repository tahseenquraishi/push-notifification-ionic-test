import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';


// const firebaseMessagin = (<any>cordova.plugins).firebase;
// const notification = (<any>cordova.plugins).notification;

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
    private firebase: Firebase,
    private push: Push
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.firebaseMethod();
      // this.fbMessage();
      // this.notifications();
      this.pushPlugin();
    });

  }


  // firebaseMethod() {
  //   let self = this;
  //   console.log(window);
  //   // console.log(window.Plugin);
  //   // console.log(window.PluginArray);

  //   // const plugin = (<any>window).FirebasePlugin;
  //   // or
  //   // const plugin = (window as any).FirebasePlugin;

  //   console.log(cordova);
  //   console.log(cordova.plugins);


  //   this.firebase.getToken().then((res) => {
  //     console.log(res, 'get token');
  //     alert('get Token');
  //   }).catch((err) => {
  //     console.log(err, 'err in get token');
  //     alert('err in get token');
  //   });

  //   this.firebase.onNotificationOpen()
  //     .subscribe((success) => {
  //       console.log('onNotificationOpen', success);
  //     }, (err) => {
  //       console.log('onNotificationOpen error', err);
  //     })

  //   this.firebase.grantPermission()
  //     .then((res) => {
  //       console.log(res, 'grantPermission');
  //     }).catch((err) => {
  //       console.log(err, 'grantPermission');
  //     })
  //   this.firebase.hasPermission()
  //     .then((res) => {
  //       console.log(res, 'hasPermission');
  //     }).catch((err) => {
  //       console.log(err, 'hasPermission');
  //     })
  // }


  // fbMessage() {

  //   const firebaseMessagin = (<any>cordova.plugins).firebase;

  //   firebaseMessagin.messaging.getToken().then((token) => {
  //     // this just makes sure the token in my db is up to date.
  //     console.log(token);
  //   });

  //   this.firebaseMessaging.getToken().then((res) => {
  //     console.log(res, 'get token');
  //     alert('get Token');
  //   }).catch((err) => {
  //     console.log(err, 'err in get token');
  //     alert('err in get token');
  //   });


  //   this.firebaseMessaging.onBackgroundMessage().subscribe((success) => {
  //     console.log('onBackgroundMessage', success);
  //     localStorage.setItem('ha', 'ha');
  //     this.localNotifications.schedule({
  //       id: 1,
  //       title: '2',
  //       text: 'Single ILocalNotification 1',
  //       data: { secret: 'key' }
  //     });
  //     // alert('onBackgroundMessage');
  //   }, (error) => {
  //     console.log('onBackgroundMessage error', error);
  //     alert('onBackgroundMessage error');
  //   })

  //   this.firebaseMessaging.onMessage().subscribe((success) => {
  //     console.log('on message', success);

  //     this.localNotifications.schedule({
  //       id: 1,
  //       text: 'Single ILocalNotification 2',
  //       title: '2',
  //       data: { secret: 'key' }
  //     });
  //     // alert('on message success');
  //   }, (error) => {
  //     console.log('on message error', error);
  //     alert('on message error');
  //   })

  //   this.firebaseMessaging.requestPermission({ forceShow: true }).then((res) => {
  //     console.log('request permission', res);
  //     alert('request permission success');
  //   }).catch((error) => {
  //     console.log('request permission error', error);
  //     alert('request permission error');
  //   })
  // }


  // notifications() {
  //   // const firebaseMessagin = (<any>cordova.plugins).firebase;
  //   // const notification = (<any>cordova.plugins).notification;


  //   let self = this;
  //   firebaseMessagin.messaging.getToken().then((token) => {
  //     // this just makes sure the token in my db is up to date.
  //     console.log('token', token);
  //   })
  //   notification.local.requestPermission((granted) => {
  //     if (granted) {
  //       console.log('granted', granted);
  //       firebaseMessagin.messaging.onMessage((payload) => {
  //         console.log('New foreground FCM message: ', payload)
  //         self.localNotification(payload)
  //         localStorage.setItem('foreground', 'ha');
  //       })
  //       firebaseMessagin.messaging.onBackgroundMessage((payload) => {
  //         console.log('New background FCM message: ', payload)
  //         self.localNotification(payload);
  //         localStorage.setItem('background', 'ha');

  //       })
  //     } else {
  //       console.log('granted else', granted);
  //     }
  //   })
  // }

  // The local notification plugin code.
  // localNotification(payload) {
  //   // icon: 'res://notification',
  //   //   smallIcon: 'res://notification',
  //   notification.local.schedule({
  //     title: payload.fromName,
  //     data: payload,
  //     text: 'Has granted you access to a Fluss.',
  //     color: '1A78B4',

  //     actions: [
  //       { id: 'accept', title: 'Accept' },
  //       { id: 'reject', title: 'Reject' }
  //     ]
  //   })
  //   notification.local.on('click', (notification) => {
  //     console.log('clicked', notification)
  //   }, this)
  //   notification.local.on('accept', (notification, eopts) => {
  //     console.log('accepted', notification, eopts)
  //   })
  //   notification.local.on('reject', (notification, eopts) => {
  //     console.log('rejected', notification, eopts)
  //   })
  // }

  pushPlugin() {
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });

    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
    }).then(() => console.log('Channel created'));

    // Delete a channel (Android O and above)
    // this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

    // Return a list of currently configured channels
    this.push.listChannels().then((channels) => console.log('List of channels', channels))

    // to initialize push notifications

    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    }

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


  }

}




// first create channel
// create issue on github
// then install push plugin

// cordova-support-google-services