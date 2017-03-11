import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio, StatusBar, Splashscreen, File, BackgroundMode} from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { TrafikData } from '../providers/trafik-data';
import { LocationTracker } from '../providers/location-tracker';

interface IPoint {
   x: number;
   y: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // Enable the app to run in the background
      BackgroundMode.enable();

      StatusBar.styleDefault();
      Splashscreen.hide();


      NativeAudio.preloadSimple('uniqueId1', 'farlig-korsning-inbyggt-mic.m4a').then(function(){
        console.log("Sound loaded")
      }, function() {
        console.log("Sound not loaded")
      });

    });
  }

  data = [
    {"Ar": 2016, "Manad": 7, "Lan": "G\u00e4vleborgs l\u00e4n", "Kommun": "S\u00f6derhamn", "Olycksvag": "83, 588", "Platstyp": "Gatu-/V\u00e4gkorsning", "Olyckstyp": "K (korsande-motorfordon)", "Svarighetsgrad": "Lindrig olycka", "Vaglag": "V\u00e4gbanan torr", "Vaderlek": "Uppeh\u00e5llsv\u00e4der", "Ljusforhallande": "Dagsljus", "XSweref": 6782646, "YSweref": 599140, "Trafikelement1": "Personbil", "Trafikelement2": "Personbil", "Trafikelement3": "", "Trafikelement4": "", "Trafikelement5": "", "Trafikelement6": "", "Trafikelement7": "", "Trafikelement8": "", "Trafikelement9": "", "Trafikelement10": "", "Trafikelement11": "", "Trafikelement12": "", "Trafikelement13": "", "Trafikelement14": "", "Trafikelement15": "", "Trafikelement16": "", "Trafikelement17": "", "Trafikelement18": "", "Trafikelement19": "", "Trafikelement20": "", "Trafikelement21": ""},
    {"Ar": 2016, "Manad": 7, "Lan": "\u00d6sterg\u00f6tlands l\u00e4n", "Kommun": "Norrk\u00f6ping", "Olycksvag": "899, Nyk\u00f6pingsv\u00e4gen", "Platstyp": "Gatu-/V\u00e4gkorsning", "Olyckstyp": "U (upphinnande-motorfordon)", "Svarighetsgrad": "Lindrig olycka", "Vaglag": "V\u00e4gbanan torr", "Vaderlek": "Uppeh\u00e5llsv\u00e4der", "Ljusforhallande": "Dagsljus", "XSweref": 6506125, "YSweref": 577775, "Trafikelement1": "Personbil", "Trafikelement2": "Personbil", "Trafikelement3": "", "Trafikelement4": "", "Trafikelement5": "", "Trafikelement6": "", "Trafikelement7": "", "Trafikelement8": "", "Trafikelement9": "", "Trafikelement10": "", "Trafikelement11": "", "Trafikelement12": "", "Trafikelement13": "", "Trafikelement14": "", "Trafikelement15": "", "Trafikelement16": "", "Trafikelement17": "", "Trafikelement18": "", "Trafikelement19": "", "Trafikelement20": "", "Trafikelement21": ""},
  ]

  // With an accident at {x: 6782646, y: 599140}, all these four calls should return true
  // console.log(
  //   this.queryBoomRank(
  //     {x: 6782644, y: 599140}, // x -2
  //     {x: 6782645, y: 599140},  // x -1
  //     15
  //   ),
  //   this.queryBoomRank(
  //     {x: 6782648, y: 599140}, // x +2
  //     {x: 6782647, y: 599140},  // x +1
  //     15
  //   ),
  //   this.queryBoomRank(
  //     {x: 6782646, y: 599138}, // y -2
  //     {x: 6782646, y: 599139},  // y -1
  //     15
  //   ),
  //   this.queryBoomRank(
  //     {x: 6782646, y: 599142}, // y +2
  //     {x: 6782646, y: 599141},  // y +1
  //     15
  //   ),
  // )

  queryBoomRank(gps1: IPoint, gps2: IPoint, elapsed_time: number) {
    let BOOM_CONFIG = {
      radius: 50,     // meters
      foresight: 60,  // seconds
    }

    let direction = {
      x: gps2.x >= gps1.x? 1 : -1,
      y: gps2.y >= gps1.y? 1 : -1,
    }

    let future_point = {
      x: direction.x * Math.abs(gps2.x - gps1.x) * (BOOM_CONFIG.foresight / elapsed_time),
      y: direction.y * Math.abs(gps2.y - gps1.y) * (BOOM_CONFIG.foresight / elapsed_time),
    }

    // Calculate the distance to the line between gps2 and future_point
    // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
    let nearby_accidents = this.data.filter((accident) => {
      let distance = (
        Math.abs(
          (future_point.y - gps2.y) * accident.XSweref -
          (future_point.x - gps2.x) * accident.YSweref +
          future_point.x * gps2.y +
          future_point.y * gps2.x
        ) /
        Math.sqrt(
          Math.pow(future_point.y - gps2.y, 2) +
          Math.pow(future_point.x - gps2.x, 2)
         )
      )

      return distance < BOOM_CONFIG.radius
    })

    return nearby_accidents.length > 0
  }
}
