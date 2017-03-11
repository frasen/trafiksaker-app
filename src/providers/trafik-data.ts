import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import {File} from 'ionic-native';
import 'rxjs/add/operator/map';
declare var cordova: any;

interface IPoint {
   x: number;
   y: number;
}

@Injectable()
export class TrafikData {

  public data;
  public dataLoaded;

  constructor(public http: Http) {
    console.log('Hello TrafikData Provider');
    this.dataLoaded = false;
  }

  public load() {
      var that = this;
      return new Promise(resolve => {
        var path: string = cordova.file.applicationDirectory + "www/"
        File.readAsText(path, 'data.json')
          .then(function(result) {
            let data = JSON.stringify(result)
            that.data = data;
            that.dataLoaded = true;
            resolve(data);
          })
          .catch(err => console.log('boooh'));
        return this.data;
      });
  }

  public search(gps1: IPoint, gps2: IPoint, elapsed_time: number) {
    if(this.dataLoaded) {
      return this.queryBoomRank(gps1, gps2, elapsed_time)
    }
  }

  // With an accident at {x: 6782646, y: 599140}, all these four calls should return true
  //
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
  //
  // More tests needed...

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
