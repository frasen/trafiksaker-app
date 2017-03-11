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
  public active = false;
  public myTrafikData;

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker, myTrafikData: TrafikData) {

    this.myTrafikData = myTrafikData;
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
    this.callBoomRank();
  }

  callBoomRank() {
    console.log("Calling BoomRank")
    let lat = this.locationTracker.lat;
    let lng = this.locationTracker.lng;

    let gps1 = {x: lat, y: lng}
    let gps2 = {x: this.old_lat, y: this.old_lng}

    this.old_lat = lat;
    this.old_lng = lng;

    let milliseconds = 2000;
    console.log("Calling BoomRank. Lat: " + lat + " Lng: " + lng + "Old Lat: " + this.old_lat + " Old Lng: " + this.old_lng + "  Seconds: " + milliseconds)

    let shouldWePlaySound = this.myTrafikData.search(gps1, gps2, milliseconds);
    if(shouldWePlaySound) {
      this.playSound();
    }

    if(this.active) {
      setTimeout(() => this.callBoomRank(), milliseconds);
    }
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
