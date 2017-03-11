import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { NativeAudio} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {
      
  }

  playSound(){
    console.log("Playing sound");

    NativeAudio.play('uniqueId1').then(function(){
      console.log("Sound played")
    }, function() {
      console.log("Sound not played")
    });
  }

  start(){
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }
}
