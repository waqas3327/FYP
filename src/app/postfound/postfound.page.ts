
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationStrategy } from '@angular/common';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../sdk/custom/user.service';
import { analyzeAndValidateNgModules, identifierModuleUrl } from '@angular/compiler';
import { async } from '@angular/core/testing';

declare var google:any;
@Component({
  selector: 'app-postfound',
  templateUrl: './postfound.page.html',
  styleUrls: ['./postfound.page.scss'],
})
export class PostfoundPage {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  //Variables declared
  latitude: number;
  longitude: number;
  ID: String;
  IDperson: String;
  marker: any;
  getfoundData: FormGroup;
  userInfo;
  filePresent;
  map: google.maps.Map;
  lat = 30.3753;
  lng = 69.3451;
  lat1;
  lng1;
  private markers =[];
  coordinates = new google.maps.LatLng(this.lat, this.lng);

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
    private actionSheetCtrl:ActionSheetController
    ){}

    emaildisplay = localStorage.getItem('name');
    

    
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

    addMarker(location) {
       this.clearMarkers();
      if (!location) {
        location = this.map.getCenter();
      }
      
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: location,
        draggable:true,
  
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
          url: '<img src="https://img.icons8.com/android/24/000000/place-marker.png"/>', // image url
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
    value1 = this.getfoundData.controls['lostType'].value;
    console.log(value1);
      
      console.log('random number:',this.getRandomInt(500000));
      this.randomNumber = this.getRandomInt(500000);
      if (this.filePresent) {
        this.isLoadingImgUpload = true;
        //const id = this.getfoundData.controls._id;
        this.service
          .uploadAvatarfound(this.userInfo, this.userInfo.file,value1,this.randomNumber)
          .subscribe(
            async response => {
              console.log('respoe->', response);
              this.isLoadingImgUpload = false;
              // this.toasterService.pop('success', 'Image uploaded successfully!');
              // // this.appInfoForm.patchValue(response.data);
              // this.slimScroll.complete();
              this.ID = response._id;
              console.log('iddd= ',this.ID);
            },
            error => {
              console.log('error', error);
              this.isLoadingImgUpload = false;
              // this.toasterService.pop(
              //   'error',
              //   'There are some error while uploading Image'
              // );
  
              // this.slimScroll.complete();
            }
          );
      }
    }



    SaveProduct(){
      try {       
        const getfoundData = this.getfoundData.value;
        getfoundData['lat']=this.lat1;
        getfoundData['lng']=this.lng1;
        getfoundData['youremail']=this.emaildisplay;
        console.log('lost data', getfoundData);
        this.service.PostfoundProduct(getfoundData,this.ID).subscribe(
          data => {
            alert('successfully posted!')
            console.log('got response from server', data);
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
        
        const getfoundData = this.getfoundData.value;
        getfoundData['lat']=this.lat1;
        getfoundData['lng']=this.lng1;
        getfoundData['youremail']=this.emaildisplay;
        console.log('lostdata', getfoundData);
        this.service.PostfoundPerson(getfoundData, this.ID).subscribe(
           async data => {
            //alert('successfully posted!')
            console.log('got response from server', data);
            // this.router.navigate(['geolocation']);
          
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
    value = this.getfoundData.controls['lostType'].value;
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
      //this.getfoundData.patchValue({youremail: this.emaildisplay});
    }
  
    
  formInitializer() {
    this.getfoundData = this.formBuilder.group({
      // youremail: [ ],
       title: [null, [Validators.required]],
       description: [null, [Validators.required]],
       reward: [null, [Validators.required]],
       lostType: [null, [Validators.required]]
    });
  }

}

