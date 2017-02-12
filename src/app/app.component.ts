import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, Geolocation, StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


      StatusBar.styleDefault();
      Splashscreen.hide();


      /* Geo test */
      Geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      });
      let watch = Geolocation.watchPosition().subscribe(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);

      });


      /* sqlite test (javascript, not Typescript) */
      let db = new SQLite();
      db.openDatabase({
        name: 'data.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql('select * from developers', {}).then(() => {
           
        }, (err) => {
          console.error('Unable to execute sql: ', err);
        });
      }, (err) => {
        console.error('Unable to open database: ', err);
      });

    });
  }
}
