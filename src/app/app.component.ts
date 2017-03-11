import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio, SQLite, Geolocation, StatusBar, Splashscreen, MediaPlugin } from 'ionic-native';

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

      NativeAudio.preloadSimple('uniqueId1', 'farlig-korsning-inbyggt-mic.m4a').then(function(){
        console.log("Sound loaded")
      }, function() {
        console.log("Sound not loaded")
      });


      /* sqlite test (javascript, not Typescript) */
      let db = new SQLite();
      db.openDatabase({
        name: 'data.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql('select * from developers', {}).then(() => {

        }, (err) => {
          console.error('Unable to execute sql: ', JSON.stringify(err));
        });
      }, (err) => {
        console.error('Unable to open database: ', JSON.stringify(err));
      });

    });
  }
}
