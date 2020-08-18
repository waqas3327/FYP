import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';
import { analyzeFile } from '@angular/compiler';

declare var google: any;


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.page.html',
  styleUrls: ['./myposts.page.scss'],
})
export class MypostsPage implements AfterViewInit, OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  latitude: number;
  longitude: number;
  geoMarker: any;
   geocoder = new google.maps.Geocoder;
  markers = [];
  marker: any;
  lat1;
  lng1;
  
  lostproductsdata; //getting lost products
  lostpersonsdata; //getting lost persons
  foundproductsdata; //getting found products
  foundpersonsdata; //getting found persons

  results: Observable<any>;
  myLatLng;
  constructor(private router: Router, private zone: NgZone, private userService: UserService) { }
  map: google.maps.Map;
  lat = 30.3760;
  lng = 69.3451;
emailfromlocalstorage:any;
//gets the position where marker is supposed to be placed
  datacollector(data) {
    console.log('data from datacollector:',data)
    this.myLatLng = data;
    for (var i = 0; i < data.length; i++) {
      this.myLatLng[i].lat = data[i].lat;
      this.myLatLng[i].lng = data[i].lng;
    }
  }


  coordinates = new google.maps.LatLng(this.lat, this.lng);

                                             // page mapoptions
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    disableDefaultUI: true,
    zoom: 7
    //mapTypeId: 'satellite'
  };
  //                                           //map options for geolocation
  // mapOptions1: google.maps.MapOptions = {
  //   center: this.coordinates,
  //   disableDefaultUI: true,
  //   zoom: 18
  // };


  ngOnInit() {

this.emailfromlocalstorage = localStorage.getItem('name');
    this.userService.getSingleLostProductEmail(this.emailfromlocalstorage).subscribe(
      alllostproducts => {
        console.log("1st record  products", alllostproducts);
        this.lostproductsdata = alllostproducts;
        //console.log("all lost products", this.lostproductsdata[0].lat);

      },
      err => {
        console.log("api error in all request retrieval", err);
      }
    );

                                                 //getting data from lost persons 

    this.userService.getSingleLostPersonEmail(this.emailfromlocalstorage).subscribe(
      alllostpersons => {
        console.log("1st record  products", alllostpersons);
        this.lostpersonsdata = alllostpersons;
        //console.log("all lost products", this.lostproductsdata[0].lat);
      },
      err => {
        console.log("api error in data retrieval", err);
      }
    );


                                                    //getting data from found products 

    this.userService.getSingleFoundProductEmail(this.emailfromlocalstorage).subscribe(
      allfoundproducts => {
        this.foundproductsdata = allfoundproducts;
         //console.log("all found products", this.foundproductsdata[0].lat);

      },
      err => {
        console.log("api error in all request retrieval", err);
      }
    );

    //getting data from found persons 
    this.userService.getSingleFoundPersonEmail(this.emailfromlocalstorage).subscribe(
      allfoundpersons => {
        this.foundpersonsdata = allfoundpersons;
        //console.log("all lost products", this.lostproductsdata[0].lat);
      },
      err => {
        console.log("api error in data retrieval", err);
      }
    );
    
  }
  

  ngAfterViewInit() {
    this.mapInitializer();
    // this.displayallmarkers();
  }
babloo(){
  this.displayallmarkers();
}
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
  }



  addInfoWindow(marker, content: string) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      console.log('clicked marker, markerType value:', marker.get('markerType'));
      //this.router.navigate(['/description-page']);
      if ((marker.get('markerType') == 'lostperson') || (marker.get('markerType') == 'lostproduct')) {
        this.router.navigate(['/lost'], { queryParams: { markerID: marker.get('store_id'), markertype: marker.get('markerType') } });
        console.log('inside lost url: markertype value', marker.get('markerType'));
      }
      else if ((marker.get('markerType') == 'foundperson') || (marker.get('markerType') == 'foundproduct')) {
        this.router.navigate(['/found'], { queryParams: { markerID: marker.get('store_id'), markertype: marker.get('markerType') } });
        console.log('inside found url: markertype value', marker.get('markerType'));
      }
    })
  }


  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }


  displayallmarkers() {
    console.log('Display funtion is called');

    console.log('data in lostprod:',this.lostproductsdata);
    //lost product markers
    this.datacollector(this.lostproductsdata);
    const icon = {
      url: '../../assets/icon/LOST PROD.png',
      //url: 'https://img.icons8.com/ios-glyphs/24/000000/place-marker.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
    for (var i = 0; i < this.myLatLng.length; i++) {
      this.marker = new google.maps.Marker({
        position: this.myLatLng[i],
        map: this.map,
        icon: icon,
        store_id: this.lostproductsdata[i]._id,
        markerType: 'lostproduct'
      });
      console.log('this is markers id:', this.marker.get('store_id'));
      //console.log(this.lostproductsdata[i]._id);
      let content: string = 'Lost Product';
      this.addInfoWindow(this.marker, content);
    }
    //lost person markers
    this.datacollector(this.lostpersonsdata);
    const icon1 = {
      url: '../../assets/icon/LOST PEOP.png',
      //url: 'https://img.icons8.com/ios-glyphs/24/000000/place-marker.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
    for (var i = 0; i < this.myLatLng.length; i++) {
      this.marker = new google.maps.Marker({
        position: this.myLatLng[i],
        map: this.map,
        icon: icon1,
        store_id: this.lostpersonsdata[i]._id,
        markerType: 'lostperson',
      });
      console.log('this is markers id:', this.marker.get('store_id'));
      console.log('this is markers type:', this.marker.get('markerType'));
      let content: string = 'Lost Person';
      this.addInfoWindow(this.marker, content);
      //this.marker.setMap(this.map);
      //this.markers.push(marker);
    }

    //found product markers
    this.datacollector(this.foundproductsdata);
    const icon2 = {
      url: '../../assets/icon/FOUND PROD.png',
      //url: 'https://img.icons8.com/ios-glyphs/24/000000/place-marker.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
    for (var i = 0; i < this.myLatLng.length; i++) {
      this.marker = new google.maps.Marker({
        position: this.myLatLng[i],
        map: this.map,
        icon: icon2,
        store_id: this.foundproductsdata[i]._id,
        markerType: 'foundproduct'
      });
      console.log('this is markers id:', this.marker.get('store_id'));
      //console.log(this.lostproductsdata[i]._id);
      let content: string = 'Found Product';
      this.addInfoWindow(this.marker, content);
      //this.marker.setMap(this.map);
      //this.markers.push(marker);
    }
    //lost person markers
    this.datacollector(this.foundpersonsdata);
    const icon3 = {
      url: '../../assets/icon/FOUND PEOP.png',
      //url: 'https://img.icons8.com/ios-glyphs/24/000000/place-marker.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
    for (var i = 0; i < this.myLatLng.length; i++) {
      this.marker = new google.maps.Marker({
        position: this.myLatLng[i],
        map: this.map,
        icon: icon3,
        store_id: this.foundpersonsdata[i]._id,
        markerType: 'foundperson'
      });
      console.log('this is markers id:', this.marker.get('store_id'));
      console.log('this is markers type:', this.marker.get('markerType'));
      console.log(this.marker.position);
      let content: string = 'Found Person';
      this.addInfoWindow(this.marker, content);
      //this.marker.setMap(this.map);
      //this.markers.push(marker);
    }
  }

  
}
