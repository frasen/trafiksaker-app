import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NativeAudio} from 'ionic-native';

import { LocationTracker } from '../../providers/location-tracker';
import { TrafikData } from '../../providers/trafik-data';

import proj4 from 'proj4';

// EPSG:3006
proj4.defs([['SWEREF99TM', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']]);

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public old_x: number;
  public old_y: number;
  public active = false;
  public myTrafikData;

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker, myTrafikData: TrafikData) {
    this.myTrafikData = myTrafikData;
    this.old_x = 0;
    this.old_y = 0;
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
    let seconds = 2;

    if (lat != 0 && lng != 0) {
      let result = proj4("WGS84", "SWEREF99TM", [lng, lat])
      let y = result[0]
      let x = result[1]

      console.log("proj4: Raw coordinates: ", [lng, lat], ", Converted: ", y, x)

      let gps1 = {x: this.old_x, y: this.old_y}
      let gps2 = {x: y, y: x}

      this.old_x = x;
      this.old_y = y;

      console.log("Calling BoomRank. x: " + x + " y: " + y + "Old x: " + this.old_x + " Old y: " + this.old_y + "  Seconds: " + seconds)

      let shouldWePlaySound = this.myTrafikData.search(gps1, gps2, seconds);
      if(shouldWePlaySound) {
        this.playSound();
      }
    }

    if(this.active) {
      setTimeout(() => this.callBoomRank(), seconds * 1000);
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
