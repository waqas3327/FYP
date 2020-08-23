
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../sdk/custom/user.service';
import { analyzeAndValidateNgModules, identifierModuleUrl } from '@angular/compiler';
import { async } from '@angular/core/testing';
import { ToastService } from '../sdk/custom/toast.service';

declare var google:any;

@Component({
  selector: 'app-postlost',
  templateUrl: './postlost.page.html',
  styleUrls: ['./postlost.page.scss'],
})

export class PostlostPage implements OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  //Variables declared
  latitude: number;
  longitude: number;
  public ID: String;
  geoMarker: any;
  IDperson: String;
  marker: any;
  getLostData: FormGroup;
  userInfo;
  filePresent;
  map: google.maps.Map;
  lat = 33.626057;
  lng = 73.071442;
  lat1;
  lng1;
  private markers =[];
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  lostproductsdata; //getting lost products
  lostpersonsdata; //getting lost persons
  foundproductsdata; //getting found products
  foundpersonsdata; //getting found persons
  myLatLng;
  autocomplete = { input: '' };
  autocompleteItems = [];
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  geocoder = new google.maps.Geocoder;
  Searchposition:any;


   //Constructor
  isLoadingImgUpload = false;
  isLoading = false;
  randomNumber: any;
  
  constructor(
    private geolocation: Geolocation, 
    private mediaCapture: MediaCapture,
    private alertController: AlertController, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private service: UserService,
    private toastservice: ToastService,
    private zone: NgZone,
    private actionSheetCtrl:ActionSheetController
    ){this.backbutton()}
    backbutton() {
      console.log('backbutton');
      document.addEventListener('backbutton', () => {
        console.log('backbutton1');
    });
    }
    datacollector(data) {
      this.myLatLng = data;
      for (var i = 0; i < data.length; i++) {
        this.myLatLng[i].lat = data[i].lat;
        this.myLatLng[i].lng = data[i].lng;
      }
    }

    


    emaildisplay = localStorage.getItem('name');
    
    
    mapOptions: google.maps.MapOptions = {
      center: this.coordinates,
      disableDefaultUI: true,
      zoom: 10
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
      this.map.addListener('click', (event) => {
      this.addMarker(event.latLng);
      });
    }

    addInfoWindow(marker, content: string) {
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(this.map, marker);
      })
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
        console.log(this.autocompleteItems);
    }
    clearSearchResults(){
      this.autocompleteItems=[];
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
   

  //droping marker on the selected location
    addMarker(location) {
      console.log(location);
       this.clearMarkers();
      if (!location) {
        location = this.map.getCenter();
      }
      
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: location
  
      });
      this.markers.push(marker);
      let content: string = 'remove';
      this.addInfoWindow(marker, content);
      this.lat1 = marker.getPosition().lat();
      this.lng1 = marker.getPosition().lng();
      console.log(this.lat1);
      console.log(this.lng1);
    }
    setMapOnAll(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    }
    clearMarkers() {
      this.setMapOnAll(null);
    }
///****************************************



    //image upload logic
    onFileChange(e) {
      console.log('e', e);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.userInfo = {};
        this.userInfo.touched = true;
        this.userInfo.avatar = (<FileReader>event.target).result;
        this.userInfo.file = file;
        this.userInfo.extension = file.name.split('.').pop();
      };
      this.filePresent = true;
    }
    
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    
    uploadImage(){
    var value1;
    value1 = this.getLostData.controls['lostType'].value;
    console.log(value1);
      
      console.log('random number:',this.getRandomInt(500000));
      this.randomNumber = this.getRandomInt(500000);
      if (this.filePresent) {
        this.isLoadingImgUpload = true;
        //const id = this.getLostData.controls._id;
        this.service
          .uploadAvatar(this.userInfo, this.userInfo.file,value1,this.randomNumber)
          .subscribe(
            async response => {
              console.log('respoe->', response);
              this.isLoadingImgUpload = false;
              this.ID = response._id;
              console.log('iddd= ',this.ID);
              const msg = "Success! Image Uploaded Successfully.";
              this.toastservice.presentToast(msg);
            },
            error => {
              console.log('error', error);
              this.isLoadingImgUpload = false;
            }
          );
      }
    }



    SaveProduct(){
      try {       
        const getLostData = this.getLostData.value;
        getLostData['lat']=this.lat1;
        getLostData['lng']=this.lng1;
        getLostData['youremail']=this.emaildisplay;
        console.log('lost data', getLostData);
        this.service.PostLostProduct(getLostData,this.ID).subscribe(
          data => {
            const msgg = "Success! Data Posted Successfully.";
            this.toastservice.presentToast(msgg);
            console.log('got response from server', data);
            this.router.navigate(['geolocation']);
            //this.router.navigate(['geolocation'], { queryParams: { uniqueid: this.ID, laatitude: this.lat1,loongitude:this.lng1 } });
          },
          error => {
            console.log('error', error);
            alert('Problem posting data!');
          }
        );
        } catch (ex) {
            console.log('ex', ex);
          }
    }

    //start
     savePerson(){
      try {
        
        const getLostData = this.getLostData.value;
        getLostData['lat']=this.lat1;
        getLostData['lng']=this.lng1;
        getLostData['youremail']=this.emaildisplay;
        console.log('lostdata', getLostData);
        this.service.PostLostPerson(getLostData, this.ID).subscribe(
           async data => {
            //alert('successfully posted!')
            const msgg = "Success! Data Posted Successfully.";
            this.toastservice.presentToast(msgg);
            console.log('got response from server', data);
            this.router.navigate(['geolocation']);
          
          },
          error => {
            console.log('error', error);
            alert('Wrong email or password!');
          }
        );
        } catch (ex) {
            console.log('ex', ex);
          }
    }

   
    SaveToDB() {
     
    var value;
    value = this.getLostData.controls['lostType'].value;
    console.log(value);
    if(value == 'item'){
      this.SaveProduct();
    }
    if(value == 'person'){
      this.savePerson();
    }
    //end
  }

    ngOnInit(){
      this.formInitializer();
      this.getCurrentLocation();
      //this.getLostData.patchValue({youremail: this.emaildisplay});
    }
  
    
  formInitializer() {
    this.getLostData = this.formBuilder.group({
      // youremail: [ ],
       title: [null, [Validators.required]],
       description: [null, [Validators.required]],
       reward: [null, [Validators.required]],
       lostType: [null, [Validators.required]]
    });
  }

  getCurrentLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    });
    console.log('currentloc',this.lat);
    console.log('currentloc',this.lng);
  }
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
        icon: icon,
        draggable:true
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
  displayallmarkers() {

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
