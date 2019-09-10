import { Component } from '@angular/core';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private firebaseMessaging: FirebaseMessaging) {
    // this.messaging();
  }

  // messaging(){
  //   this.firebaseMessaging.logEvent('page_view', {page: "dashboard"})
  // .then((res: any) => console.log(res))
  // .catch((error: any) => console.error(error));
  // }

}
