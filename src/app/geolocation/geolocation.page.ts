
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,NgZone, Input, OnDestroy} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';
import { UserService } from '../sdk/custom/user.service';
import { analyzeFile } from '@angular/compiler';
declare var google:any;
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements AfterViewInit, OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  latitude: number;
  longitude: number;
  geoMarker: any;
  autocomplete={input:''};
  autocompleteItems = [];
  completeService = new google.maps.places.AutocompleteService();
  geocoder = new google.maps.Geocoder;
  markers = [];
  marker: any;
  lat1;
  lng1;
  lostproductsdata;
  lostpersonsdata;
  myLatLng; 
  
  constructor(private geolocation: Geolocation,private zone:NgZone, private userService: UserService) { }
    map: google.maps.Map;
    lat = 30.3760;
    lng = 69.3451;


    datacollector(data){
      this.myLatLng = data;
      for(var i = 0; i<data.length; i++){
        this.myLatLng[i].lat=data[i].lat;
        this.myLatLng[i].lng=data[i].lng;
      }
    }
 

    coordinates = new google.maps.LatLng(this.lat, this.lng);
    
// page mapoptions
    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     disableDefaultUI: true,
     zoom: 7
    };
//map options for geolocation
    mapOptions1: google.maps.MapOptions = {
      center: this.coordinates,
      disableDefaultUI: true,
      zoom: 18
     };


ngOnInit(){
  // this.sub = this.route
  // .queryParams
  // .subscribe(params => {
  //   // Defaults to 0 if no query param provided.
  //   this.queryParameters = +params['page'] || 0;
  //   this.uniqueID=params.uniqueid;
  //   this.latt = params.laatitude;
  //   this.lngg = params.loongitude;
  //   console.log('ID:',this.uniqueID);
  //   console.log('latt:',this.latt);
  //   console.log('lngg:',this.lngg);
  // }); 

  //getting data from lost products 
  this.userService.getAllLostProducts().subscribe(
    alllostproducts => {
      console.log("1st record  products", alllostproducts);
      this.lostproductsdata = alllostproducts;
      console.log("all lost products", this.lostproductsdata[0].lat);
      
    },
    err => {
      console.log("api error in all request retrieval", err);
    }
  ); 

  //getting data from lost persons 
  this.userService.getAllLostPersons().subscribe(
    alllostpersons => {
      console.log("1st record  products", alllostpersons);
      this.lostpersonsdata = alllostpersons;
      //console.log("all lost products", this.lostproductsdata[0].lat);
    },
    err => {
      console.log("api error in data retrieval", err);
    }
  ); 

}





    ngAfterViewInit() {
      this.mapInitializer();
      
  }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);

     //Runtime add marker
      // this.map.addListener('click', (event) => {
      //   this.addMarker(event.latLng);
      //   });
        
    }
    

    addInfoWindow(marker, content: string) {
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(this.map, marker);
      })
    }

    //onclick add marker
  //   addMarker(location) {
  //    // this.clearMarkers();
  //    if (!location) {
  //      location = this.map.getCenter();
  //    }
     
  //    this.marker = new google.maps.Marker({
  //      map: this.map,
  //      animation: google.maps.Animation.DROP,
  //      position: location,
  //      title:'hello world',
  //      lable:'Adil ',
  //      store_id: '123456',
  //      //position:{lat:42.2222,lng:-70,9495},
  //      draggable:true,
 
  //    });
  //    this.markers.push(this.marker);
  //    console.log(this.marker.get('store_id'));
  //    let content: string = 'remove';
  //    this.addInfoWindow(this.marker, content);
  //    this.lat1 = this.marker.getPosition().lat();
  //    this.lng1 = this.marker.getPosition().lng();
  //    console.log(this.lat1);
  //   console.log(this.lng1);
  // }


  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }


  displayallmarkers() {
    //lost product markers
    this.datacollector(this.lostproductsdata);
    for (var i = 0; i < this.myLatLng.length; i++) {
       this.marker = new google.maps.Marker({
        position: this.myLatLng[i],
        map: this.map,
        store_id: this.lostproductsdata[i]._id,
      });
      console.log('this is markers id:',this.marker.get('store_id'));
      //console.log(this.lostproductsdata[i]._id);
      let content: string = 'Lost Product';
      this.addInfoWindow(this.marker, content);
      //this.marker.setMap(this.map);
     //this.markers.push(marker);
    }
    //lost person markers
    this.datacollector(this.lostpersonsdata);
    for (var i = 0; i < this.myLatLng.length; i++) {
       this.marker = new google.maps.Marker({
        position: this.myLatLng[i],
        map: this.map,
        store_id: this.lostpersonsdata[i]._id,
      });
      console.log('this is markers id:',this.marker.get('store_id'));
      console.log(this.marker.position);
      let content: string = 'Lost Person';
      this.addInfoWindow(this.marker, content);      
      //this.marker.setMap(this.map);
     //this.markers.push(marker);
    }
  }

  addMaarker(coords){
    var marker =new google.maps.Marker({
      position:coords,
      map:this.map
    });
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
      console.log(this.myLatLng[3]);
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
        this.geoMarker.setMap(this.map);
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
