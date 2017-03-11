import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import {File} from 'ionic-native';
import 'rxjs/add/operator/map';
declare var cordova: any;
/*
  Generated class for the TrafikData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrafikData {

  public data;

  constructor(public http: Http) {
    console.log('Hello TrafikData Provider');
  }

  public load() {
      var that = this;
      return new Promise(resolve => {
        var path: string = cordova.file.applicationDirectory + "www/"
        File.readAsText(path, 'data.json')
          .then(function(result) {
            let data = JSON.stringify(result)
            that.data = data;
            resolve(data);
          })
          .catch(err => console.log('boooh'));
        return this.data;
      });
  }

  public search(needle: string) {
    let n = this.data.indexOf(needle);
    if(n > -1) {
      return true;
    } else {
      return false;
    }
  }
}
