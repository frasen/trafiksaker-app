import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NativeAudio} from 'ionic-native';

import { LocationTracker } from '../../providers/location-tracker';
import { TrafikData } from '../../providers/trafik-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public old_lat: number;
  public old_lng: number;
  public active = true;

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker, myTrafikData: TrafikData) {

      this.old_lat = 0;
      this.old_lng = 0;
      // TODO: Change these to use real data
      let gps1 = {x: 6782644, y: 599140}
      let gps2 = {x: 6782645, y: 599140}
      let elapsed_time = 15;

      [1, 2, 3, 4, 5].forEach(() => {
        let result = myTrafikData.search(gps1, gps2, elapsed_time)
        if (result) {
          console.log("This is a potential boom!");
        }
        else {
          console.log("This is a not boom!");
        }
      })

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
    this.active = true;
    // while(this.active) {
    //   this.sleep(1000);
    //   console.log("Running BoomRank")
    //   let lat = this.locationTracker.lat;
    //   let lng = this.locationTracker.lng;
    //   console.log("Lat: " + lat + " Lng: " + lng);
    //   console.log("Lat: " + this.old_lat + " Lng: " + this.old_lng);
    //
    //   this.old_lat = lat;
    //   this.old_lng = lat;
    // }
  }

  stop(){
    this.active = false;
    this.locationTracker.stopTracking();
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
}
