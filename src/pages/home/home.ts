import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation} from 'ionic-native';

declare var google : any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
	map : any;
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() : void{

    Geolocation.getCurrentPosition().then((position)=>{
      let mapEle = document.getElementById('map');
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center : latLng,
        zoom : 15,
        mapTypeId : google.maps.MapTypeId.RoadMap,
        disableDefaultUI: true
      }

      this.map = new google.maps.Map(mapEle,mapOptions);

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
      });
    },
    (err)=>{
      console.error('Error',err);
    });
  }

}
