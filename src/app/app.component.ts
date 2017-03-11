import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio, StatusBar, Splashscreen, File, BackgroundMode} from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { TrafikData } from '../providers/trafik-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;


  constructor(platform: Platform, myTrafikData: TrafikData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      BackgroundMode.enable();

      StatusBar.styleDefault();
      Splashscreen.hide();

      console.log("Loading trafikdata...");
      myTrafikData.load().then((data) => {
        console.log("Loading complete.");
      });


      NativeAudio.preloadSimple('uniqueId1', 'farlig-korsning-inbyggt-mic.m4a').then(function(){
        console.log("Sound loaded")
      }, function() {
        console.log("Sound not loaded")
      });

    });
  }
}
