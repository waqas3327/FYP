///fule geolocation codde...

import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';
import { analyzeFile } from '@angular/compiler';
import { LoaderService } from '../sdk/custom/loader.service';
import { AlertService } from '../sdk/custom/alert.service';
import { Platform } from '@ionic/angular';

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
  autocomplete = { input: '' };
  autocompleteItems = [];
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  geocoder = new google.maps.Geocoder;
  markers = [];
  marker: any;
  lat1;
  lng1;
  lostproductsdata; //getting lost products
  lostpersonsdata; //getting lost persons
  foundproductsdata; //getting found products
  foundpersonsdata; //getting found persons
emailfromlocalstorage:any;


  searchTerm = '';
  results: Observable<any>;
  Searchposition:any;
  myLatLng;
  address: any;
  public isSearchbarOpen=false;

  constructor(private platform: Platform,private router: Router, private geolocation: Geolocation, private alertservice:AlertService,
     private zone: NgZone, private userService: UserService,private loaderservice: LoaderService) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        console.log('Handler was called!');
        this.router.navigate(['geolocation']);
      });
      this.loaderservice.showLoader();
     }
  

  map: google.maps.Map;
  lat = 30.3760;
  lng = 69.3451;

//gets the position where marker is supposed to be placed
  datacollector(data) {
    this.myLatLng = data;
    console.log('this is data in data collector',data);
    //var temp = this.myLatLng.length;
    console.log('this is data in data length',data.length);
    
    for (var i = 0; i < data.length; i++) {
      console.log('inside loopp');
      this.myLatLng[i].lat = data[i].lat;
      this.myLatLng[i].lng = data[i].lng;
      
    }
    console.log('mylatlng',this.myLatLng[0]);
     /// console.log('data:',data[0].lat);
  }


  coordinates = new google.maps.LatLng(this.lat, this.lng);

                                             // page mapoptions
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    disableDefaultUI: true,
    zoom: 7
    //mapTypeId: 'satellite'
  };
                                            //map options for geolocation
  mapOptions1: google.maps.MapOptions = {
    center: this.coordinates,
    disableDefaultUI: true,
    zoom: 18
  };


  ngOnInit() {
    this.emailfromlocalstorage = localStorage.getItem('name');
    //getting data from lost products 
    this.userService.getSingleLostProductEmail(this.emailfromlocalstorage).subscribe(
      alllostproducts => {
        //console.log("1st record  products", alllostproducts);
        this.lostproductsdata = alllostproducts;
        //console.log("all lost products", this.lostproductsdata[0].lat);

      },
      err => {
        console.log("api error in all request retrieval", err);
        this.alertservice.presentAlertConfirm("Cannot Load Data!","Failed!");
      }
    );

                                                 //getting data from lost persons 

    this.userService.getSingleLostPersonEmail(this.emailfromlocalstorage).subscribe(
      alllostpersons => {
        //console.log("1st record  products", alllostpersons);
        this.lostpersonsdata = alllostpersons;
        //console.log("all lost products", this.lostproductsdata[0].lat);
      },
      err => {
        console.log("api error in data retrieval", err);
        this.alertservice.presentAlertConfirm("Cannot Load Data!","Failed!");
      }
    );


                                                    //getting data from found products 

    this.userService.getSingleFoundProductEmail(this.emailfromlocalstorage).subscribe(
      allfoundproducts => {
        this.foundproductsdata = allfoundproducts;
        // console.log("all found products", this.foundproductsdata[0].lat);

      },
      err => {
        console.log("api error in all request retrieval", err);
        this.alertservice.presentAlertConfirm("Cannot Load Data!","Failed!");
      }
    );

    //getting data from found persons 
    this.userService.getSingleFoundPersonEmail(this.emailfromlocalstorage).subscribe(
      allfoundpersons => {
        this.foundpersonsdata = allfoundpersons;
        //console.log("all lost products", this.lostproductsdata[0].lat);
        this.loaderservice.hideLoader();
      },
      err => {
        console.log("api error in data retrieval", err);
        this.alertservice.presentAlertConfirm("Cannot Load Data!","Failed!");
        this.loaderservice.hideLoader();
      }
    );
    
    //this.displayallmarkers();
  }
  

  ngAfterViewInit() {
   
    this.mapInitializer();
    //this.displayallmarkers();
    setTimeout (() => {
      this.displayallmarkers();
   }, 1000);

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

    //lost product markers
    this.datacollector(this.lostproductsdata);
    const icon = {
      url: '../../assets/icon/LOST PROD.png',
      //url: 'https://img.icons8.com/ios-glyphs/24/000000/place-marker.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
    console.log('lat long:',this.myLatLng[0]);
    for (var i = 0; i < this.myLatLng.length; i++) {
      console.log('lat long:',this.myLatLng[i]);
      this.marker = new google.maps.Marker({
        position: this.myLatLng[i],
        map: this.map,
        icon: icon,
        store_id: this.lostproductsdata[i]._id,
        markerType: 'lostproduct',
        markerContent: this.lostproductsdata[i].title
      });
      console.log('this is markers id:', this.marker.get('store_id'));
      //console.log(this.lostproductsdata[i]._id);
      let content: string;

      this.addInfoWindow(this.marker, content);
      var infoWindow = new google.maps.InfoWindow({
        content:this.marker.markerContent
      });
      infoWindow.open(this.map,this.marker);
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
        markerContent: this.lostpersonsdata[i].title
      });
      console.log('this is markers id:', this.marker.get('store_id'));
      console.log('this is markers type:', this.marker.get('markerType'));
      let content: string;
      
      this.addInfoWindow(this.marker, content);
      var infoWindow = new google.maps.InfoWindow({
        content:this.marker.markerContent
      });
      infoWindow.open(this.map,this.marker);
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
        markerType: 'foundproduct',
        markerContent: this.foundproductsdata[i].title
      });
      console.log('this is markers id:', this.marker.get('store_id'));
      //console.log(this.lostproductsdata[i]._id);
      let content: string;

      this.addInfoWindow(this.marker, content);
      var infoWindow = new google.maps.InfoWindow({
        content:this.marker.markerContent
      });
      infoWindow.open(this.map,this.marker);
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
        markerType: 'foundperson',
        markerContent: this.foundpersonsdata[i].title
      });
      console.log(this.marker.position);
      let content: string;

      this.addInfoWindow(this.marker, content);
      var infoWindow = new google.maps.InfoWindow({
        content:this.marker.markerContent
      });
      infoWindow.open(this.map,this.marker);
    }
  }

  addMaarker(coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map
    });
  }
  clearSearchResults(){
    this.autocompleteItems=[];
  }

  // ngDoCheck(){
  //   //this.displayallmarkers();
  // }
  

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }


  // mapOptions1: google.maps.MapOptions = {
  //   center: this.coordinates,
  //   disableDefaultUI: true,
  //   zoom: 18
  // };
  getLocation() {

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
        url: '../../assets/icon/YOU ARE HERE.png',
        //url: 'https://img.icons8.com/ios-glyphs/24/000000/place-marker.png', // image url
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
    this.displayallmarkers();
  }
  mapOptions2: google.maps.MapOptions = {
    center: this.Searchposition,
    disableDefaultUI: true,
     zoom: 14
   };
  selectSearchResult(item) {

    
       this.map = new google.maps.Map(this.gmap.nativeElement,
        this.mapOptions2);
     this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      console.log('hello adil bacha');
      if (status === 'OK' && results[0]) {
        this.Searchposition = {
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
