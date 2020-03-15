
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,NgZone} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';

declare var google:any;
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  latitude: number;
  longitude: number;
  marker: any;
  autocomplete={input:''};
  autocompleteItems = [];
  completeService = new google.maps.places.AutocompleteService();
  geocoder = new google.maps.Geocoder;
  markers = [];

  constructor(private geolocation: Geolocation,private zone:NgZone) { }
    map: google.maps.Map;
    lat = 30.3753;
    lng = 69.3451;
 

    coordinates = new google.maps.LatLng(this.lat, this.lng);
    

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     disableDefaultUI: true,
     zoom: 7
    };

    mapOptions1: google.maps.MapOptions = {
      center: this.coordinates,
      disableDefaultUI: true,
      zoom: 18
     };

    ngAfterViewInit() {
      this.mapInitializer();
  }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
    }

    updateSearchResults(){
      if (this.autocomplete.input == '') {
        this.autocompleteItems = [];
        return;
      }
      this.completeService.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(function(){
          predictions=predictions || [];
          predictions.forEach(function(prediction){
            console.log(prediction);
            this.autocompleteItems.push(prediction);
          });
        });
        // this.zone.run(()=>{
        //   predictions.forEach((prediction)=>{
        //     this.autocompleteItems.push(prediction);
        //   });
        // });
        console.log(this.autocompleteItems);
      });
    }


    getLocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.map = new google.maps.Map(this.gmap.nativeElement, 
          this.mapOptions1);
        const infoWindow = new google.maps.InfoWindow;
        const pos = {
          lat: this.latitude,
          lng: this.longitude
        };
        const icon = {
          url: 'https://img.icons8.com/ios-glyphs/24/000000/place-marker.png', // image url
          scaledSize: new google.maps.Size(50, 50), // scaled size
        };
        const marker = new google.maps.Marker({
             position: pos,
             map: this.map,
             icon: icon
          });
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(this.map);
        this.map.setCenter(pos);
        this.marker.setMap(this.map);
      }).catch((error) => {
        console.log('Error in getting the locations', error);
      });
    }

    selectSearchResult(item){
     // this.clearMarkers();
      this.autocompleteItems = [];
    
      this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
        if(status === 'OK' && results[0]){
          let position = {
              lat: results[0].geometry.location.lat,
              lng: results[0].geometry.location.lng
          };
          let marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map,
          });
          this.markers.push(marker);
          this.map.setCenter(results[0].geometry.location);
        }
      })
    }

}
