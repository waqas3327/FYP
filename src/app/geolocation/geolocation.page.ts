
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, NgZone, Input, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';
import { UserService } from '../sdk/custom/user.service';
import { analyzeFile } from '@angular/compiler';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from '../sdk/custom/loader.service';
import { AlertService } from '../sdk/custom/alert.service';
import { IonRouterOutlet, AlertController } from '@ionic/angular';
declare var google: any;


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


  searchTerm = '';
  results: Observable<any>;
  Searchposition:any;
  myLatLng;
  address: any;
  public isSearchbarOpen=false;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChild(IonRouterOutlet, { static: false }) routerOutlets: IonRouterOutlet;
  constructor(private alertController: AlertController,
    private router: Router,
    private geolocation: Geolocation, 
    private zone: NgZone, 
    private userService: UserService
    ,private loaderservice: LoaderService, 
    private alertservice: AlertService) 
    {
       this.loaderservice.showHideAutoLoader(); 
       this.backbutton();
    }


  map: google.maps.Map;
  lat = 30.3760;
  lng = 69.3451;
  //back button
  backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
      if (this.routerOutlets && this.routerOutlets.canGoBack()) {
        this.routerOutlets.pop();
      } else if (this.router.url === '/home') {
        if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
          this.lastTimeBackPress = new Date().getTime();
          this.presentAlertConfirm();
        } else {
          // tslint:disable-next-line: no-string-literal
          navigator['app'].exitApp();
        }
      }
    });
      }
     async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          // tslint:disable-next-line: no-string-literal
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
      }


//gets the position where marker is supposed to be placed
  datacollector(data) {
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
                                            //map options for geolocation
  mapOptions1: google.maps.MapOptions = {
    center: this.coordinates,
    disableDefaultUI: true,
    zoom: 18
  };


  ngOnInit() {

    //getting data from lost products 
    this.userService.getAllLostProducts().subscribe(
      alllostproducts => {
        this.lostproductsdata = alllostproducts;
      },
      err => {
        this.alertservice.presentAlertConfirm("Cannot Load Data! Server Down","Failed!");
      }
    );

   //getting data from lost persons 
    this.userService.getAllLostPersons().subscribe(
      alllostpersons => {
        this.lostpersonsdata = alllostpersons;
      },
      err => {
        this.alertservice.presentAlertConfirm("Cannot Load Data! Server Down","Failed!");
      }
    );


    //getting data from found products 
    this.userService.getAllFoundProducts().subscribe(
      allfoundproducts => {
        this.foundproductsdata = allfoundproducts;
      },
      err => {
        this.alertservice.presentAlertConfirm("Cannot Load Data! Server Down","Failed!");
      }
    );

    //getting data from found persons 
    this.userService.getAllFoundPersons().subscribe(
      allfoundpersons => {
        this.foundpersonsdata = allfoundpersons;
      },
      err => {
        this.alertservice.presentAlertConfirm("Cannot Load Data! Server Down","Failed!");
      }
    );
  }
  

  ngAfterViewInit() {
   
    this.mapInitializer();
  
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
      if ((marker.get('markerType') == 'lostperson') || (marker.get('markerType') == 'lostproduct')) {
        this.router.navigate(['/lost'], { queryParams: { markerID: marker.get('store_id'), markertype: marker.get('markerType') } });
      }
      else if ((marker.get('markerType') == 'foundperson') || (marker.get('markerType') == 'foundproduct')) {
        this.router.navigate(['/found'], { queryParams: { markerID: marker.get('store_id'), markertype: marker.get('markerType') } });
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

 IonViewWillEnter(){
   this.clearMarkers();
 }

  displayalllostmarkers() {
    this.clearMarkers();
    this.markers = [];
    
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
        markerType: 'lostproduct',
        markerContent: this.lostproductsdata[i].title
      });

      var infoWindow = new google.maps.InfoWindow({
        content:this.marker.markerContent
      });
      infoWindow.open(this.map,this.marker);
      this.markers.push(this.marker);

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
      
      var infoWindow = new google.maps.InfoWindow({
        content:this.marker.markerContent
      });
      infoWindow.open(this.map,this.marker);
      this.markers.push(this.marker);
       this.markers.push(this.marker);
    }
    console.log("this.markers",this.markers);
    if(this.markers.length === 0){
      this.alertservice.presentAlertConfirm("There are no Lost markers in this area", "Not Found!")
    }

  }


  displayallfoundmarkers(){
    this.clearMarkers();
    this.markers = [];
    
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
      
      var infoWindow = new google.maps.InfoWindow({
        content:this.marker.markerContent
      });
      infoWindow.open(this.map,this.marker);
      this.markers.push(this.marker);
       this.markers.push(this.marker);
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
      
      var infoWindow = new google.maps.InfoWindow({
        content:this.marker.markerContent
      });
      infoWindow.open(this.map,this.marker);
      this.markers.push(this.marker);
       this.markers.push(this.marker);
    }

    console.log("this.markers",this.markers);
    if(this.markers.length === 0){
      this.alertservice.presentAlertConfirm("There are no found markers in this area", "Not Found!")
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


  getLocation() {
      this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions1);
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
      this.map.setCenter(pos);
      this.geoMarker.setMap(this.map);
    }).catch((error) => {
      console.log("error in locating");
      //this.alertservice.presentAlertConfirm("There is probably problem with your GPS!","Failed!");
    });
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
